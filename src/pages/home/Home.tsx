import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function FeatureBox({
  image,
  title,
  subtitle,
  redirect_uri,
  buttonText = "Jogar",
  ...rest
}: {
  image: string;
  title: string;
  subtitle: string;
  redirect_uri: string;
  buttonText?: string;
}) {
  return (
    <Link to={redirect_uri}>
      <Paper
        sx={{
          width: "200px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          height: "100%",
          ":hover": {
            // backgroundColor: "#F5FBF8",
            boxShadow: 3,
          },
        }}
        elevation={1}
        {...rest}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={image} alt={title} width="150px" height="auto" />
        </Box>
        <Typography
          variant="h3"
          sx={{ fontWeight: 600, fontSize: "24px", marginTop: "16px" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: 400, fontSize: "16px", marginBottom: "8px" }}
        >
          {subtitle}
        </Typography>
        <Button variant="contained">{buttonText}</Button>
      </Paper>
    </Link>
  );
}

const Home: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "32px",
          gap: "16px",
          maxWidth: "1280px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: 4,
          }}
          data-testid="home-title"
        >
          <Typography variant="h1" sx={{ fontWeight: 600, fontSize: "48px" }}>
            Jogue com amigos online
          </Typography>
          <Typography variant="h2">
            Aproveite uma variedade de jogos clássicos com amigos e jogadores do
            mundo todo
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <FeatureBox
            data-testid="chat-box"
            image="src/assets/icons/chat-icon.png"
            title="Chat"
            subtitle="Chat with friends"
            redirect_uri="/chat"
            buttonText="Entrar no chat"
          />
          <FeatureBox
            data-testid="tic-tac-toe-box"
            image="src/assets/icons/tic-tac-toe-icon.png"
            title="Jogo da velha"
            subtitle="Jogue com amigos"
            redirect_uri="/tic-tac-toe"
          />
          <FeatureBox
            data-testid="poker-box"
            // image="src/assets/icons/poker-icon.png"
            image="src/assets/icons/tic-tac-toe-icon.png"
            title="Poker"
            subtitle="Jogue com amigos"
            redirect_uri="/poker"
          />
          <FeatureBox
            data-testid="domino-box"
            // image="src/assets/icons/domino-icon.png"
            image="src/assets/icons/tic-tac-toe-icon.png"
            title="Dominó"
            subtitle="Jogue com amigos"
            redirect_uri="/domino"
          />
          <FeatureBox
            data-testid="6nimmt-box"
            // image="src/assets/icons/6nimmt-icon.png"
            image="src/assets/icons/tic-tac-toe-icon.png"
            title="Jogo do boi"
            subtitle="Jogue com amigos"
            redirect_uri="/6nimmt"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
