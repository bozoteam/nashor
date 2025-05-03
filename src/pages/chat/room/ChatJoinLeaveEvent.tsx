import { Box, Typography } from "@mui/material";
import { stringToColor } from "../../../service/utils";
import { UserJoinLeaveEvent } from "src/types/chat";
import { useTranslation } from "react-i18next";

const ChatJoinLeaveEvent = ({ event }: { event: UserJoinLeaveEvent }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography
        component={"div"}
        color="text.primary"
        sx={{
          display: "flex",
          padding: "8px 12px",
          gap: "4px",
          alignItems: "center",
          ":hover": {
            backgroundColor: "rgba(0, 0, 0, 0.03)",
          },
        }}
      >
        <Typography fontWeight={700} color={stringToColor(event.user.id)}>
          {event.user.name}
        </Typography>
        {event.type === "user_join"
          ? t("chatJoinLeaveEvent.userJoin")
          : t("chatJoinLeaveEvent.userLeave")}{" "}
        {t("chatJoinLeaveEvent.room")}.
      </Typography>
    </Box>
  );
};

export default ChatJoinLeaveEvent;
