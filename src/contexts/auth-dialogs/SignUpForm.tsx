import React from "react";
import { TextField, Box } from "@mui/material";
import CustomDialog from "./Dialog";
import { useAuth } from "../authContext";

type SignUpFormProps = {
  open: boolean;
  onClose: () => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ open, onClose }) => {
  const { signUpUsernamePwd } = useAuth();
  const [formState, setFormState] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  function handleSubmit() {
    signUpUsernamePwd(formState.username, formState.password, formState.name);
    onClose();
  }

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Sign Up"
      onConfirm={handleSubmit}
      confirmText="Sign Up"
      confirmEnabled={
        formState.username.length > 0 &&
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
          id="username"
          label="Username"
          variant="outlined"
          autoComplete="username"
          value={formState.username}
          onChange={(e) =>
            setFormState({
              ...formState,
              username: e.target.value,
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
