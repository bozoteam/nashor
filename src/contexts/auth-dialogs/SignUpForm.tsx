import React from "react";
import { TextField, Box } from "@mui/material";
import CustomDialog from "./Dialog";
import { useAuth } from "../authContext";

type SignUpFormProps = {
  open: boolean;
  onClose: () => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ open, onClose }) => {
  const { signUpEmailPwd } = useAuth();
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  function handleSubmit() {
    signUpEmailPwd(formState.email, formState.password, formState.displayName);
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
        formState.email !== "" &&
        formState.password !== "" &&
        formState.confirmPassword !== "" &&
        formState.displayName !== "" &&
        formState.password === formState.confirmPassword
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
          type="email"
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
        <TextField
          required
          id="display-name"
          label="Display Name"
          variant="outlined"
          autoComplete="display-name"
          value={formState.displayName}
          onChange={(e) =>
            setFormState({
              ...formState,
              displayName: e.target.value,
            })
          }
        />
      </Box>
    </CustomDialog>
  );
};

export default SignUpForm;
