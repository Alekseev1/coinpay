import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  onConfirm?: () => void;
  children: React.ReactNode;
}

const Modal = ({ open, onClose, title, onConfirm, children, ...rest }: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} {...rest}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        {onConfirm && (
          <Button onClick={onConfirm} color="primary" variant="contained">
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal