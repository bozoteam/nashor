import { Button } from "@mui/material";
import React from "react";
import axiosInstance from "../../utils/axios";

// fetch to localhost:3001/api/test using axios
function test() {
  axiosInstance.get("/api/test").then((res) => {
    console.log(res.data);
  });
}

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
          test();
        }}
      >
        test
      </Button>
    </div>
  );
};

export default Home;
