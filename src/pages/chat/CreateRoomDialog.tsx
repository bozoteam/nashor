import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

export type CreateRoomDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (roomName: string) => Promise<void>;
};

function CreateRoomDialog({ open, onClose, onCreate }: CreateRoomDialogProps) {
  const [roomName, setRoomName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      await onCreate(roomName);
      onClose();
    } catch (error) {
      console.error("Failed to create room", error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Room</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Room Name"
          type="text"
          fullWidth
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary" disabled={isCreating}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateRoomDialog;
