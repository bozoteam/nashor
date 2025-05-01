import React from "react";
import { TextField, Box, Alert } from "@mui/material";
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
  const [errorMessage, setErrorMessage] = React.useState("");

  async function handleSubmit() {
    try {
      await signIn.mutateAsync({
        email: formState.email,
        password: formState.password,
      });
      closeDialogs();
      setFormState({
        email: "",
        password: "",
      });
      setErrorMessage("");
    } catch (error) {
      const serverError =
        (error as any)?.response?.data?.message ||
        "Falha ao entrar. Por favor, verifique suas credenciais e tente novamente.";
      setErrorMessage(serverError);
    }
  }

  return (
    <CustomDialog
      open={isSignInOpen}
      onClose={closeDialogs}
      title="Login"
      onConfirm={handleSubmit}
      confirmText="Login"
      confirmEnabled={formState.email !== "" && formState.password !== ""}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          "& > *": { width: "300px" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        data-testid="login-form"
      >
        {errorMessage && (
          <Alert severity="error" data-testid="error-message">
            {errorMessage}
          </Alert>
        )}
        <TextField
          required
          id="email"
          label="Email"
          type="text"
          variant="outlined"
          autoComplete="email"
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          slotProps={{
            htmlInput: {
              "data-testid": "email-field",
            },
          }}
        />
        <TextField
          required
          id="password"
          label="Senha"
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
          slotProps={{
            htmlInput: {
              "data-testid": "password-field",
            },
          }}
        />
        <button type="submit" style={{ display: "none" }} />
      </Box>
    </CustomDialog>
  );
};

export default SignInForm;
