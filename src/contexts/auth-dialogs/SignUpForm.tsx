import React from "react";
import { TextField, Box, Alert } from "@mui/material";
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
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isNameTouched, setIsNameTouched] = React.useState(false);

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const formEnabled =
    formState.email.length > 0 &&
    formState.password.length > 0 &&
    formState.password === formState.confirmPassword &&
    formState.name.length > 0 &&
    usernameRegex.test(formState.name);

  async function handleSubmit() {
    try {
      if (!usernameRegex.test(formState.name)) {
        setErrorMessage("O nome de usuário só pode conter letras e números.");
        return;
      }
      await signUp.mutateAsync({
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
      setErrorMessage("");
      setIsNameTouched(false);
    } catch (error) {
      const serverError =
        (error as any)?.response?.data?.message ||
        "Failed to sign up. Please try again.";
      setErrorMessage(serverError);
    }
  }

  return (
    <CustomDialog
      open={isSignUpOpen}
      onClose={closeDialogs}
      title="Registro"
      onConfirm={handleSubmit}
      confirmText="Registrar"
      confirmEnabled={formEnabled}
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
      >
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
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
          label="Nome de usuário"
          variant="outlined"
          autoComplete="name"
          value={formState.name}
          onChange={(e) => {
            setFormState({
              ...formState,
              name: e.target.value,
            });
            setIsNameTouched(true);
          }}
          error={isNameTouched && !usernameRegex.test(formState.name)}
          helperText={
            isNameTouched && !usernameRegex.test(formState.name)
              ? "Apenas letras e números são permitidos."
              : ""
          }
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
        />
        <TextField
          required
          id="confirm-password"
          label="Confirme a senha"
          type="password"
          variant="outlined"
          autoComplete="confirm-password"
          value={formState.confirmPassword}
          onKeyDown={(e) => {
            if (formEnabled && e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
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
