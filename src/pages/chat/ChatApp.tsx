import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import ChatRoomsTable from "./ChatRoomsTable";
import CreateRoomDialog from "./CreateRoomDialog";
import { useNavigate } from "react-router-dom";
import useChatStore from "../../store/useChatStore";
import NerdboardBox from "../../components/NerdboardBox";

function ChatApp() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { authUser } = useAuth();
  const { fetchChatRooms, createChatRoom } = useChatStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) fetchChatRooms();
  }, [authUser]);

  async function onCreateRoom(roomName: string) {
    console.log("Creating room", roomName);
    const result = await createChatRoom(roomName);
    if (result) {
      navigate(`/chat/${result.id}`);
    }
  }

  return (
    <>
      <NerdboardBox>
        <Box className="flex justify-between items-center m-4">
          <Typography variant="h5" gutterBottom>
            Chat Rooms
          </Typography>
          <Button variant="contained" onClick={() => setCreateDialogOpen(true)}>
            Create
          </Button>
        </Box>
        <ChatRoomsTable />
      </NerdboardBox>
      <CreateRoomDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={onCreateRoom}
      />
    </>
  );
}

export default ChatApp;
