import { useQuery } from "@tanstack/react-query";
import {
  fetchVersionNashor,
  fetchVersionRoshan,
} from "../../service/endpoints/version";

function Version() {
  const { data: versionNashor } = useQuery({
    queryKey: ["version-nashor"],
    queryFn: fetchVersionNashor,
  });

  const { data: versionRoshan } = useQuery({
    queryKey: ["version-roshan"],
    queryFn: fetchVersionRoshan,
  });

  console.log({
    versionNashor,
    versionRoshan,
  });
  return (
    <div>
      <div>
        <p>Nashor:</p>
        <pre>{JSON.stringify(versionNashor, null, 2)}</pre>
      </div>
      <div>
        <p>Roshan:</p>
        <pre>{JSON.stringify(versionRoshan, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Version;
