import { Box, Divider, IconButton, Paper } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ChatMemberList from "./ChatMemberList";
import ChatMessages from "./ChatMessages";
import { useEffect } from "react";
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";
import { useAuth } from "../../../service/useAuth";
import { useChatStore } from "./store/useChatStore";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "../../../service/endpoints/chat";

export type ChatUser = {
  userId: string;
  username: string;
};

function ChatRoom() {
  const { roomId } = useParams();
  const { authUser, unauthenticated } = useAuth();
  const navigate = useNavigate();
  const { connect, disconnect, messages, users, isConnected, connectionError } =
    useChatStore();

  useEffect(() => {
    if (!roomId) {
      navigate("/chat");
      return;
    }
    if (!authUser || isConnected) {
      return;
    }
    connect(roomId);
    // setInterval(sendPing, 10000);
    return () => {
      disconnect();
    };
  }, [roomId, authUser]);

  const sendMessageMutation = useMutation({
    mutationFn: (message: string) => sendMessage(roomId!, message),
    onSuccess: (message) => {
      console.log("Message sent:", message);
    },
    onError: (error) => {
      console.error("Error sending message:", error);
    },
  });

  if (unauthenticated || connectionError) return <Navigate to="/chat" />;

  return (
    <div className="p-4 pt-8 md:p-8 md:pt-4 z-1 flex justify-center">
      <Box
        sx={{
          maxWidth: "1000px",
          width: "100%",
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        <div className="m-2 w-full">
          <IconButton
            data-testid="leave-room-button"
            onClick={() => navigate("/chat")}
          >
            <ArrowBack />
          </IconButton>
        </div>
        <Paper className="flex flex-col md:flex-row">
          <Box className="w-full md:w-1/4">
            <ChatMemberList users={users} />
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            sx={{
              height: "unset",
              marginTop: "16px",
              marginBottom: 0,
              display: { xs: "none", md: "block" },
            }}
          />
          <Box className="w-full md:w-3/4">
            <ChatMessages
              messages={messages}
              sendMessage={sendMessageMutation.mutate}
            />
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default ChatRoom;
