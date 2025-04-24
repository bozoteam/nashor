import React from "react";
import { TextField, Box } from "@mui/material";
import CustomDialog from "./Dialog";
import { useAuth } from "../../service/useAuth";
import { useAuthDialogStore } from "../../store/useAuthDialogStore";

const SignInForm = () => {
  const { isSignInOpen, closeDialogs } = useAuthDialogStore();
  const { signIn } = useAuth();
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });

  function handleSubmit() {
    signIn.mutate({
      email: formState.email,
      password: formState.password,
    });
    closeDialogs();
    setFormState({
      email: "",
      password: "",
    });
  }

  return (
    <CustomDialog
      open={isSignInOpen}
      onClose={closeDialogs}
      title="Sign In"
      onConfirm={handleSubmit}
      confirmText="Sign In"
      confirmEnabled={formState.email !== "" && formState.password !== ""}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { my: 1, width: "300px" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="username"
          label="Email"
          type="text"
          variant="outlined"
          autoComplete="username"
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
        />
        <TextField
          required
          id="password"
          label="Password"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
        />
      </Box>
    </CustomDialog>
  );
};

export default SignInForm;
