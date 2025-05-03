import NerdboardBox from "../../components/NerdboardBox";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../service/useAuth";
import CreateRoomDialog from "./CreateRoomDialog";
import ChatRoomsTable from "./ChatRoomsTable";
import { useTranslation } from "react-i18next";

function ChatHub() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { authUser } = useAuth();
  const { t } = useTranslation();

  return (
    <>
      <NerdboardBox>
        <Box className="flex justify-between items-center m-4">
          <Typography variant="h5" gutterBottom id="tableTitle">
            {t("chatHub.title")}
          </Typography>
          <Button
            variant="contained"
            onClick={() => setCreateDialogOpen(true)}
            disabled={!authUser}
            data-testid="create-room-button"
          >
            {t("chatHub.createButton")}
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
