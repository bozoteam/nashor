import React from "react";
import { TextField, Box } from "@mui/material";
import CustomDialog from "./Dialog";
import { useAuth } from "../../service/useAuth";
import { useAuthDialogStore } from "../../store/useAuthDialogStore";

const SignUpForm = () => {
  const { isSignUpOpen, closeDialogs } = useAuthDialogStore();
  const { signUp } = useAuth();
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  function handleSubmit() {
    signUp.mutate({
      email: formState.email,
      password: formState.password,
      name: formState.name,
    });
    closeDialogs();
    setFormState({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  }

  return (
    <CustomDialog
      open={isSignUpOpen}
      onClose={closeDialogs}
      title="Sign Up"
      onConfirm={handleSubmit}
      confirmText="Sign Up"
      confirmEnabled={
        formState.email.length > 0 &&
        formState.password.length > 0 &&
        formState.password === formState.confirmPassword &&
        formState.name.length > 0
      }
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
          id="email"
          label="Email"
          variant="outlined"
          autoComplete="email"
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
          id="name"
          label="Name"
          variant="outlined"
          autoComplete="name"
          value={formState.name}
          onChange={(e) =>
            setFormState({
              ...formState,
              name: e.target.value,
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
        <TextField
          required
          id="confirm-password"
          label="Confirm Password"
          type="password"
          variant="outlined"
          autoComplete="confirm-password"
          value={formState.confirmPassword}
          onChange={(e) =>
            setFormState({
              ...formState,
              confirmPassword: e.target.value,
            })
          }
          error={formState.password !== formState.confirmPassword}
        />
      </Box>
    </CustomDialog>
  );
};

export default SignUpForm;
