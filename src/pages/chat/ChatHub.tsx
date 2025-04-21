import NerdboardBox from "../../components/NerdboardBox";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../service/useAuth";
import CreateRoomDialog from "./CreateRoomDialog";
import ChatRoomsTable from "./ChatRoomsTable";

function ChatHub() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { authUser } = useAuth();

  return (
    <>
      <NerdboardBox>
        <Box className="flex justify-between items-center m-4">
          <Typography variant="h5" gutterBottom id="tableTitle">
            Salas de Chat
          </Typography>
          <Button
            variant="contained"
            onClick={() => setCreateDialogOpen(true)}
            disabled={!authUser}
            data-testid="create-room-button"
          >
            Criar
          </Button>
        </Box>
        <ChatRoomsTable />
      </NerdboardBox>
      <CreateRoomDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      />
    </>
  );
}

export default ChatHub;
