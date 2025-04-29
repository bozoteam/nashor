import { Avatar, Box, Divider, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { stringToColor } from "../../../service/utils";
import { User } from "@proto/user/user";

interface ChatMemberListProps {
  users: User[];
}

const ChatMemberList: FunctionComponent<ChatMemberListProps> = ({ users }) => {
  console.log(users);
  return (
    <Box
      sx={{
        padding: "16px 12px",
        display: "flex",
        flexDirection: "column",
        // gap: "8px",
      }}
    >
      <Typography
        variant={"h6"}
        color={"primary"}
        sx={{
          marginLeft: "8px",
          fontSize: "1rem",
        }}
      >
        {users ? users.length : 0} Online
      </Typography>
      <Divider
        sx={{
          margin: "8px",
        }}
      />
      <Box
        sx={{
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {users &&
          users.map((user) => (
            <Box
              key={user.id}
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                padding: "4px 6px",
                borderRadius: "6px",
                ":hover": {
                  backgroundColor: "rgba(0,0,0,0.05)",
                },
              }}
            >
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: stringToColor(user.id),
                }}
                alt={user.name}
              >
                {user.name[0].toUpperCase()}
              </Avatar>
              <Typography
                color={stringToColor(user.id)}
                fontWeight={700}
                sx={{
                  fontSize: "1rem",
                }}
                data-testid={`user-${user.name}`}
              >
                {user.name}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default ChatMemberList;
