import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import UserSection from "./UserSection";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link
            to="/"
            style={{ fontWeight: "500", textDecoration: "none" }}
            id="nav-logo"
          >
            NerdBoard
          </Link>
        </Typography>
        <UserSection />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
