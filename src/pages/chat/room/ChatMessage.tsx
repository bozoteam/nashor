import { Avatar, Box, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { GroupedMessages } from "src/types/chat";

function ConciseMessage({
  content,
  timestamp,
}: {
  content: string;
  timestamp: number;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Typography
      component={"div"}
      key={timestamp}
      sx={{
        width: "100%",
        paddingLeft: "56px",
        paddingY: "1px",
        textWrap: "wrap",
        position: "relative",
        ":hover": {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        },
        overflowWrap: "break-word",
        overflow: "hidden",
        whiteSpace: "pre-wrap",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
      <Tooltip
        enterDelay={500}
        sx={{
          visibility: hovered ? "visible" : "hidden",
          position: "absolute",
          top: "6px",
          transform: "translateX(-100%)",
          paddingRight: "5px",
        }}
        placement="top"
        title={new Date(timestamp / 1000000).toLocaleTimeString(undefined, {
          day: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      >
        <Typography fontSize={10} color="textSecondary">
          {new Date(timestamp / 1000000).toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </Typography>
      </Tooltip>
    </Typography>
  );
}

const ChatMessage = ({ message: messages }: { message: GroupedMessages }) => {
  const user = messages.user;
  const firstMessage = messages.messages[0];
  const otherMessages = messages.messages.slice(1);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          padding: "8px 10px",
          paddingBottom: otherMessages.length > 0 ? "1px" : "8px",
          gap: "10px",
          alignItems: "center",
          ":hover": {
            backgroundColor: "rgba(0, 0, 0, 0.03)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Avatar
            sx={{
              width: "36px",
              height: "36px",
            }}
            alt={user.name}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Typography fontWeight={700}>{user.name}</Typography>
            <Tooltip
              placement="top"
              title={new Date(
                firstMessage.timestamp / 1000000
              ).toLocaleTimeString(undefined, {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            >
              <Typography fontSize={11}>
                {new Date(firstMessage.timestamp / 1000000).toLocaleTimeString(
                  undefined,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  }
                )}
              </Typography>
            </Tooltip>
          </Box>
          <Typography
            sx={{
              textWrap: "wrap",
              overflowWrap: "break-word",
              overflow: "hidden",
              whiteSpace: "pre-wrap",
            }}
          >
            {firstMessage.content}
          </Typography>
        </Box>
      </Box>
      {/* Render other messages if they exist */}
      {otherMessages.length > 0 && (
        <Box
          sx={{
            padding: "0px 10px 8px 0px",
          }}
        >
          {otherMessages.map((m) => (
            <ConciseMessage
              key={m.timestamp}
              content={m.content}
              timestamp={m.timestamp}
            />
          ))}
        </Box>
      )}
    </>
  );
};

export default ChatMessage;
