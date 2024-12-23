import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import UserSection from "./UserSection";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          NerdBoard
        </Typography>
        <UserSection />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
