import React from "react";
import NerdboardBox from "../../components/NerdboardBox";
import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function FeatureBox({
  image,
  title,
  redirect_uri,
}: {
  image: string;
  title: string;
  redirect_uri: string;
}) {
  return (
    <Paper
      component={Link}
      to={redirect_uri}
      sx={{
        padding: "12px",
        width: "180px",
        height: "180px",
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: "8px",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "end",
        justifyContent: "center",
        cursor: "pointer",
        ":hover": {
          boxShadow: "3px 3px 5px rgba(0,0,0,0.3)",
          transform: "scale(1.003)",
        },
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "1.3rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        {title}
      </Typography>
    </Paper>
  );
}

const Home: React.FC = () => {
  return (
    <NerdboardBox>
      <Box
        sx={{
          maxHeight: "50%",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundImage: "url(./src/assets/banner.webp)",
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "24px",
        }}
      >
        <Typography
          component="h3"
          sx={{
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          NerdBoard Arena
        </Typography>
      </Box>
      <Box className="flex items-center mt-4 gap-3">
        <FeatureBox
          image="./src/assets/chat-icon.webp"
          title="Chat"
          redirect_uri="/chat"
        />
        <FeatureBox
          image="./src/assets/tic-tac-toe-icon.webp"
          title="Tic Tac Toe"
          redirect_uri="/chat"
        />
        <FeatureBox
          image="./src/assets/poker-icon.webp"
          title="Poker"
          redirect_uri="/chat"
        />
      </Box>
    </NerdboardBox>
  );
};

export default Home;
