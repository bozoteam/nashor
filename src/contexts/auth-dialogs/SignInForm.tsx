import React from "react";
import { TextField, Box } from "@mui/material";
import CustomDialog from "./Dialog";
import { useAuth } from "../authContext";

type SignInFormProps = {
  open: boolean;
  onClose: () => void;
};

const SignInForm: React.FC<SignInFormProps> = ({ open, onClose }) => {
  const { signInEmailPwd } = useAuth();
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });

  function handleSubmit() {
    signInEmailPwd(formState.email, formState.password);
    onClose();
  }

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
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
      </Box>
    </CustomDialog>
  );
};

export default SignInForm;
