import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NerdboardContainer from "../../components/NerdboardContainer";
import NerdboardHeader from "../../components/NerdboardHeader";

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
    <Paper
      component={Link}
      to={redirect_uri}
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        ":hover": {
          backgroundColor: "#F0F3F0",
          boxShadow: 2,
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
        sx={{
          fontWeight: 600,
          fontSize: "24px",
          marginTop: "16px",
          textAlign: "center",
        }}
        data-testid="feature-title"
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 400,
          fontSize: "16px",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        {subtitle}
      </Typography>
      <Button variant="contained">{buttonText}</Button>
    </Paper>
  );
}

const Home: React.FC = () => {
  return (
    <NerdboardContainer>
      <NerdboardHeader
        title="Jogue com amigos online"
        subtitle="Aproveite uma variedade de jogos clássicos com amigos e jogadores do mundo todo"
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(195px, 1fr))",
          gap: 2,
        }}
      >
        <FeatureBox
          data-testid="chat-box"
          image="/icons/chat-icon.png"
          title="Chat"
          subtitle="Chat with friends"
          redirect_uri="/chat"
          buttonText="Entrar no chat"
        />
        <FeatureBox
          data-testid="tic-tac-toe-box"
          image="/icons/tic-tac-toe-icon.png"
          title="Jogo da velha"
          subtitle="Jogue com amigos"
          redirect_uri="/tic-tac-toe"
        />
        <FeatureBox
          data-testid="poker-box"
          image="/icons/poker-icon.png"
          title="Poker"
          subtitle="Jogue com amigos"
          redirect_uri="/poker"
        />
        <FeatureBox
          data-testid="domino-box"
          image="/icons/domino-icon.png"
          title="Dominó"
          subtitle="Jogue com amigos"
          redirect_uri="/domino"
        />
        <FeatureBox
          data-testid="6nimmt-box"
          image="/icons/boi-icon.png"
          title="Jogo do boi"
          subtitle="Jogue com amigos"
          redirect_uri="/6nimmt"
        />
        <FeatureBox
          data-testid="coup-box"
          image="/icons/coup-icon.png"
          title="Coup"
          subtitle="Jogue com amigos"
          redirect_uri="/coup"
        />
      </Box>
    </NerdboardContainer>
  );
};

export default Home;
