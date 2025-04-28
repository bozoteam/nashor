import { FunctionComponent, useEffect, useRef } from "react";
import { Box, TextField } from "@mui/material";
import { GroupedMessages, UserJoinLeaveEvent } from "../../../types/chat";
import ChatMessage from "./ChatMessage";
import ChatJoinLeaveEvent from "./ChatJoinLeaveEvent";

interface ChatMessagesProps {
  messages: (GroupedMessages | UserJoinLeaveEvent)[];
  sendMessage: (message: string) => void;
}

const ChatMessages: FunctionComponent<ChatMessagesProps> = ({
  messages,
  sendMessage,
}) => {
  const messagesBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesBoxRef.current?.scrollTo({
      top: messagesBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          flexGrow: 1,
          height: "550px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
          ref={messagesBoxRef}
          data-testid="messages-box"
        >
          {messages.map((message) => {
            console.log(message);
            if ("timestamp" in message) {
              // Check if message is a regular message
              return (
                <ChatMessage
                  key={`${message.user.id}-${message.timestamp}`}
                  message={message}
                />
              );
            }
            return (
              <ChatJoinLeaveEvent
                key={`${message.user.id}-${message.type}`}
                event={message as UserJoinLeaveEvent}
              />
            );
          })}
        </Box>
      </Box>
      <TextField
        id="message"
        variant="filled"
        placeholder="Mensagem"
        autoComplete="off"
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "0px",
            backgroundColor: "#F2F9F6",
          },
        }}
        slotProps={{
          htmlInput: {
            "data-testid": "chat-input",
            sx: {
              padding: "16px",
            },
          },
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            const target = e.target as HTMLInputElement;
            if (target.value === "") return;
            sendMessage(target.value);
            target.value = "";
          }
        }}
      />
    </Box>
  );
};

export default ChatMessages;
