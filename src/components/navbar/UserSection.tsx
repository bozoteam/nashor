import React from "react";
import SignInForm from "../../contexts/auth-dialogs/SignInForm";
import SignUpForm from "../../contexts/auth-dialogs/SignUpForm";
import { useAuth } from "../../contexts/authContext";
import { Button, Typography, Box } from "@mui/material";

function UserSection() {
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const { authUser, signOutFromWebsite } = useAuth();
  console.log(authUser);

  return (
    <Box>
      {authUser ? (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography>{authUser.displayName ?? authUser.email}</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={signOutFromWebsite}
          >
            Sign Out
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            color="info"
            onClick={() => setOpenSignIn(true)}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenSignUp(true)}
          >
            Sign Up
          </Button>
        </Box>
      )}
      <SignUpForm open={openSignUp} onClose={() => setOpenSignUp(false)} />
      <SignInForm open={openSignIn} onClose={() => setOpenSignIn(false)} />
    </Box>
  );
}

export default UserSection;
