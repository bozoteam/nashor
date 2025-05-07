import { Button, Typography, Box } from "@mui/material";
import { useAuth } from "../../service/useAuth";
import { useAuthDialogStore } from "../../store/useAuthDialogStore";
import { useTranslation } from "react-i18next";

function UserSection() {
  const { authUser, signOut } = useAuth();
  const { openSignIn, openSignUp } = useAuthDialogStore();
  const { t } = useTranslation();

  return (
    <Box role="navigation" aria-label="User account navigation">
      {authUser ? (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography data-testid="display-name" aria-live="polite">
            {authUser?.name ?? authUser?.email}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={signOut}
            data-testid="logout-button"
            aria-label={t("userSection.logout")}
          >
            {t("userSection.logout")}
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 3,
          }}
        >
          <Typography
            data-testid="login-button"
            onClick={openSignIn}
            className="flex flex-col justify-center items-center cursor-pointer"
            sx={{
              fontWeight: 500,
              padding: "8px",
              "&:focus-visible": {
                outline: "2px solid #3BA57C",
                borderRadius: "4px",
              },
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                openSignIn();
              }
            }}
            aria-label={t("userSection.login")}
          >
            {t("userSection.login")}
          </Typography>
          <Button
            data-testid="signup-button"
            variant="contained"
            color="primary"
            onClick={openSignUp}
            aria-label={t("userSection.signup")}
          >
            {t("userSection.signup")}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default UserSection;
