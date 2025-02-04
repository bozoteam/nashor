import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchChatRooms } from "./store";
import { Paper } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import ChatRoomsTable from "./ChatRoomsTable";

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
  const { authUser } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authUser) dispatch(fetchChatRooms());
  }, [authUser]);

  return (
    <div className="p-4 pt-8 md:p-8 z-1 flex justify-center flex-grow">
      <Paper
        className="flex flex-col md:flex-row"
        sx={{
          display: "flex",
          flexGrow: 1,
          maxWidth: "1000px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <ChatRoomsTable />
      </Paper>
    </div>
  );
}

export default ChatApp;
