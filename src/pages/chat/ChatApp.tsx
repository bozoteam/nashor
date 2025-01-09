import { Box, Divider, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import ChatMemberList from "./ChatMemberList";
import ChatMessages from "./ChatMessages";
import { useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { AuthContext } from "../../contexts/authContext";

export type ChatMessage = {
  message: string;
  createdAt: string;
  user: ChatUser;
};

export type ChatUser = {
  userId: string;
  username: string;
};

function ChatApp() {
  const { chatId } = useParams();
  const { authUser } = useContext(AuthContext);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);

  useEffect(() => {
    if (!authUser) return;
    // Connect to the chat room
  }, [authUser]);

  return (
    <div className="p-4 pt-8 md:p-8 z-1 flex justify-center">
      <Paper
        className="flex flex-col md:flex-row"
        sx={{
          maxWidth: "1000px",
          width: "100%",
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        <Box className="w-full md:w-1/4">
          <ChatMemberList users={chatUsers} />
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{
            height: "calc(100% - 16px)",
            marginTop: "16px",
            display: { xs: "none", md: "block" },
          }}
        />
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <ChatMessages
            messages={chatMessages}
            sendMessage={(message) => {
              // Send message to the chat room
              console.log(message);
            }}
          />
        </Box>
      </Paper>
    </div>
  );
}

export default ChatApp;