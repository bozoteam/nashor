import { Avatar, Box, Divider, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { User } from "../../../types/user";

interface ChatMemberListProps {
  users: User[];
}

const ChatMemberList: FunctionComponent<ChatMemberListProps> = ({ users }) => {
  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Typography
        variant={"h6"}
        color={"primary"}
        sx={{
          fontSize: "1rem",
        }}
      >
        {/* {roomLoading ? "Carregando..." : `${users ? users.length : 0} Online`} */}
        {users ? users.length : 0} Online
      </Typography>
      <Divider />
      <Box
        sx={{
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {/* {roomLoading && (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
          >
            <CircularProgress size="30px" />
          </div>
        )} */}
        {users &&
          users.map((user) => (
            <Box
              key={user.id}
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: 32, height: 32 }} alt={user.name} />
              <Typography
                color={"primary"}
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
