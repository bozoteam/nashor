import { Button } from "@mui/material";
import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to NerdBoard</h1>
      <p>This is the home page of NerdBoard.</p>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          console.log("test");
        }}
      >
        test
      </Button>
    </div>
  );
};

export default Home;
