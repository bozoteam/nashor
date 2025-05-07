import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import UserSection from "./UserSection";
import { Link } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" component="nav" aria-label="Main navigation">
      <Toolbar
        disableGutters
        sx={{
          padding: {
            xs: "0 12px !important",
            sm: "0 32px !important",
          },
        }}
      >
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <Link
            to="/"
            style={{ fontWeight: "500", textDecoration: "none" }}
            id="nav-logo"
            aria-label="NerdBoard home"
          >
            NerdBoard
          </Link>
        </Typography>
        <LanguageSelector />
        <UserSection />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
