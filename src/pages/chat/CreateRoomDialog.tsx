import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChatRoom } from "../../service/endpoints/chat";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export type CreateRoomDialogProps = {
  open: boolean;
  onClose: () => void;
};

function CreateRoomDialog({ open, onClose }: CreateRoomDialogProps) {
  const queryClient = useQueryClient();
  const [roomName, setRoomName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mutation = useMutation({
    mutationFn: async (roomName: string) => createChatRoom(roomName),
    onSuccess: (data) => {
      if (data?.room) {
        navigate(`/chat/${data.room.id}`);
      }
      queryClient.invalidateQueries({ queryKey: ["chatRooms"] });
    },
  });

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      await mutation.mutateAsync(roomName);
      onClose();
    } catch (error) {
      console.error("Failed to create room", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("createRoomDialog.title")}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={t("createRoomDialog.roomNameLabel")}
          type="text"
          fullWidth
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          slotProps={{
            htmlInput: {
              "data-testid": "room-name-input",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("createRoomDialog.cancelButton")}
        </Button>
        <Button
          onClick={handleCreate}
          color="primary"
          disabled={isCreating}
          data-testid="confirm-create-room"
        >
          {isCreating
            ? t("createRoomDialog.creatingButton")
            : t("createRoomDialog.createButton")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateRoomDialog;
