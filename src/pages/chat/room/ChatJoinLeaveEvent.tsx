import { Box, Typography } from "@mui/material";
import { UserJoinLeaveEvent } from "src/types/chat";

const ChatJoinLeaveEvent = ({ event }: { event: UserJoinLeaveEvent }) => {
  return (
    <Box>
      <Typography
        color="text.primary"
        sx={{
          display: "flex",
          padding: "8px 12px",
          gap: "6px",
          alignItems: "center",
          ":hover": {
            backgroundColor: "rgba(0, 0, 0, 0.03)",
          },
        }}
      >
        <Typography fontWeight={700}>{event.user.name}</Typography>
        {event.type === "user_join" ? "entrou" : "saiu"} da sala.
      </Typography>
    </Box>
  );
};

export default ChatJoinLeaveEvent;
