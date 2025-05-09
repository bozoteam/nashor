import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  confirmEnabled?: boolean;
  confirmText?: string;
  cancelText?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  title,
  children,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmEnabled = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent
        id="dialog-description"
        sx={{
          overflowY: "visible",
        }}
      >
        {children}
      </DialogContent>
      <DialogActions
        sx={{
          padding: "0 24px 16px 24px",
        }}
      >
        <Button onClick={onClose} aria-label={cancelText}>
          {cancelText}
        </Button>
        {onConfirm && (
          <Button
            onClick={onConfirm}
            disabled={!confirmEnabled}
            variant="contained"
            data-testid="confirm-button"
            aria-label={confirmText}
          >
            {confirmText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
