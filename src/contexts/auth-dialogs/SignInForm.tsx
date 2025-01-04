import React from "react";
import { TextField, Box } from "@mui/material";
import CustomDialog from "./Dialog";
import { useAuth } from "../authContext";

type SignInFormProps = {
  open: boolean;
  onClose: () => void;
};

const SignInForm: React.FC<SignInFormProps> = ({ open, onClose }) => {
  const { signInUsernamePwd } = useAuth();
  const [formState, setFormState] = React.useState({
    username: "",
    password: "",
  });

  function handleSubmit() {
    signInUsernamePwd(formState.username, formState.password);
    onClose();
  }
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Sign In"
      onConfirm={handleSubmit}
      confirmText="Sign In"
      confirmEnabled={formState.username !== "" && formState.password !== ""}
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
          type="text"
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
