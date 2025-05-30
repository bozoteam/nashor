import React from "react";
import { TextField, Box, Alert } from "@mui/material";
import CustomDialog from "./Dialog";
import { useAuth } from "../../service/useAuth";
import { useAuthDialogStore } from "../../store/useAuthDialogStore";
import { useTranslation } from "react-i18next";

const SignInForm = () => {
  const { isSignInOpen, closeDialogs, openSignUp } = useAuthDialogStore();
  const { signIn } = useAuth();
  const { t } = useTranslation();
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (error as any)?.response?.data?.message || t("signInForm.errorMessage");
      setErrorMessage(serverError);
    }
  }

  return (
    <CustomDialog
      open={isSignInOpen}
      onClose={closeDialogs}
      title={t("signInForm.title")}
      onConfirm={handleSubmit}
      confirmText={t("signInForm.confirmText")}
      confirmEnabled={formState.email !== "" && formState.password !== ""}
      cancelText={t("genericDialog.cancelButton")}
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
        aria-label={t("signInForm.title")}
      >
        {errorMessage && (
          <Alert
            severity="error"
            data-testid="error-message"
            aria-live="assertive"
          >
            {errorMessage}
          </Alert>
        )}
        <TextField
          required
          id="email"
          label={t("signInForm.emailLabel")}
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
              "aria-required": "true",
            },
          }}
          fullWidth
          aria-describedby="email-helper-text"
          InputProps={{
            "aria-label": t("signInForm.emailLabel"),
          }}
        />
        <TextField
          required
          id="password"
          label={t("signInForm.passwordLabel")}
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
              "aria-required": "true",
            },
          }}
          fullWidth
          aria-describedby="password-helper-text"
          InputProps={{
            "aria-label": t("signInForm.passwordLabel"),
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              formState.email !== "" &&
              formState.password !== ""
            ) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button type="submit" style={{ display: "none" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <button
            type="button"
            onClick={() => {
              openSignUp();
            }}
            style={{
              background: "none",
              border: "none",
              color: "#1976d2",
              cursor: "pointer",
            }}
            data-testid="register-button"
          >
            {t("signInForm.registerText")}
          </button>
        </Box>
      </Box>
    </CustomDialog>
  );
};

export default SignInForm;
