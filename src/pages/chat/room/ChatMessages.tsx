import { FunctionComponent, useEffect, useRef } from "react";
import { Box, TextField } from "@mui/material";
import { GroupedMessages, UserJoinLeaveEvent } from "../../../types/chat";
import ChatMessage from "./ChatMessage";
import ChatJoinLeaveEvent from "./ChatJoinLeaveEvent";
import { useChatStore } from "./store/useChatStore";

interface ChatMessagesProps {
  messages: (GroupedMessages | UserJoinLeaveEvent)[];
  sendMessage: (message: string) => void;
}

const ChatMessages: FunctionComponent<ChatMessagesProps> = ({
  messages,
  sendMessage,
}) => {
  const { numberOfMessages } = useChatStore();
  const messagesBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesBoxRef.current?.scrollTo({
      top: messagesBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [numberOfMessages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
      role="region"
      aria-label="Chat messages"
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
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((message) => {
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
        multiline
        maxRows={6}
        minRows={1}
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            padding: "0px",
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
        InputProps={{
          "aria-label": "Type your message here",
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          // check if shift enter is pressed to add a new line
          if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            target.value += "\n";
          }
          // check if enter is pressed to send the message
          else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const target = e.target as HTMLInputElement;
            if (target.value === "") return;
            sendMessage(target.value);
            target.value = "";
          }
        }}
        aria-describedby="message-input-hint"
      />
      <span
        id="message-input-hint"
        className="sr-only"
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: "0",
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        Press Enter to send your message, or Shift+Enter to add a new line
      </span>
    </Box>
  );
};

export default ChatMessages;
