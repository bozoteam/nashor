import React from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <NerdboardContainer>
      <NerdboardHeader
        title={t("home.header.title")}
        subtitle={t("home.header.subtitle")}
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
          title={t("home.features.chat.title")}
          subtitle={t("home.features.chat.subtitle")}
          redirect_uri="/chat"
          buttonText={t("home.features.chat.button")}
        />
        <FeatureBox
          data-testid="tic-tac-toe-box"
          image="/icons/tic-tac-toe-icon.png"
          title={t("home.features.ticTacToe.title")}
          subtitle={t("home.features.ticTacToe.subtitle")}
          redirect_uri="/tic-tac-toe"
        />
        <FeatureBox
          data-testid="poker-box"
          image="/icons/poker-icon.png"
          title={t("home.features.poker.title")}
          subtitle={t("home.features.poker.subtitle")}
          redirect_uri="/poker"
        />
        <FeatureBox
          data-testid="domino-box"
          image="/icons/domino-icon.png"
          title={t("home.features.domino.title")}
          subtitle={t("home.features.domino.subtitle")}
          redirect_uri="/domino"
        />
        <FeatureBox
          data-testid="6nimmt-box"
          image="/icons/boi-icon.png"
          title={t("home.features.sixNimmt.title")}
          subtitle={t("home.features.sixNimmt.subtitle")}
          redirect_uri="/6nimmt"
        />
        <FeatureBox
          data-testid="coup-box"
          image="/icons/coup-icon.png"
          title={t("home.features.coup.title")}
          subtitle={t("home.features.coup.subtitle")}
          redirect_uri="/coup"
        />
      </Box>
    </NerdboardContainer>
  );
};

export default Home;
