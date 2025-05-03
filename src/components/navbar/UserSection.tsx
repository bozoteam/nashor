import { Button, Typography, Box } from "@mui/material";
import { useAuth } from "../../service/useAuth";
import { useAuthDialogStore } from "../../store/useAuthDialogStore";
import { useTranslation } from "react-i18next";

function UserSection() {
  const { authUser, signOut } = useAuth();
  const { openSignIn, openSignUp } = useAuthDialogStore();
  const { t } = useTranslation();

  return (
    <Box>
      {authUser ? (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography data-testid="display-name">
            {authUser?.name ?? authUser?.email}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={signOut}
            data-testid="logout-button"
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
            }}
          >
            {t("userSection.login")}
          </Typography>
          <Button
            data-testid="signup-button"
            variant="contained"
            color="primary"
            onClick={openSignUp}
          >
            {t("userSection.signup")}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default UserSection;
