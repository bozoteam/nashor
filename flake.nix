{
  description = "Docker image for Go app and Node.js app";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    self.submodules = true;
  };
  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      ...
    }:

    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        ship = pkgs.mkShell {
          packages = [
            pkgs.openssh
            pkgs.coreutils
          ];

          shellHook =
            let
              cat = "${pkgs.coreutils}/bin/cat";
              sshHost = "ec2-user@bozo.mateusbento.com";
              sshCommand = "${pkgs.openssh}/bin/ssh -i ~/.ssh/proxyaccess.pem ${sshHost}";
            in
            ''
              set -ex -o pipefail
              nix build .#packages.x86_64-linux.nashorDocker --out-link result-nashor

              ${sshCommand} 'cd /bozo && docker-compose down nashor'

              ${cat} result-nashor | ${sshCommand} 'docker rmi nashor -f ; docker load'

              ${sshCommand} 'cd /bozo && docker-compose up --build -d'

              echo SUCCESS
              exit 0
            '';
        };

        # Node.js app build
        nashorApp = pkgs.buildNpmPackage {
          pname = "nashor";
          version = "0.1.0";
          src = ./.;
          npmDepsHash = "sha256-hnNUULkWnnIIyLvdL6ytjGmYGmuISGexDl1SPk5p8jo=";
          buildPhase = "npm run build";
          installPhase = ''
            mkdir -p $out
            cp -r dist $out/
          '';
        };

        # Docker image for Node.js app with nginx
        nashorDockerImage =
          let
            nginxPort = "8081";
            nginxConf = pkgs.writeText "nginx.conf" ''
              user nobody nobody;
              daemon off;
              error_log /dev/stdout info;
              pid /dev/null;
              events {}
              http {
                include ${pkgs.nginx}/conf/mime.types;
                etag off;
                server_tokens off;
                default_type application/octect-stream;
                access_log /dev/stdout;
                root ${nashorApp}/dist;
                index index.html;

                server {
                  listen ${nginxPort};
                  location / {
                     try_files $uri /index.html =404;
                  }
                  #location = /index.html {
                    #root ${nashorApp}/dist;
                  #}
                }
              }
            '';
          in
          pkgs.dockerTools.buildLayeredImage {
            name = "nashor";
            tag = "latest";
            contents = [
              pkgs.nginx
              # pkgs.vim
              # pkgs.bash
              # pkgs.coreutils
              nashorApp
            ];
            config = {
              Cmd = [
                "${pkgs.nginx}/bin/nginx"
                "-c"
                nginxConf
              ];
              ExposedPorts = {
                "8081/tcp" = { };
              };
            };
            extraCommands = ''
              mkdir -p etc/nginx
              mkdir -p var/log/nginx
              mkdir -p tmp/nginx_client_body

              echo "nobody:x:65534:65534:nobody:/:/sbin/nologin" > etc/passwd
              echo "nobody:x:65534:" > etc/group
            '';
          };
      in
      {
        devShells = {
          ship = ship;
        };
        packages = {
          nashor = nashorApp;
          nashorDocker = nashorDockerImage;
        };
      }
    );
}
