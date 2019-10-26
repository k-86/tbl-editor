import React, { ReactElement } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

export type OwnProps = {
  open: boolean;
  name: string;
  onClose: () => void;
};

export type DispatchProps = {
  remove: () => void;
};

const DeleteDialog: React.FC<OwnProps & DispatchProps> = ({
  open,
  name,
  onClose,
  remove
}): ReactElement => {
  const handleDelete = (): void => {
    remove();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="dialog-rename">
      <DialogTitle id="dialog-rename">ファイルの削除確認</DialogTitle>
      <DialogContent>
        <DialogContentText>
          「{name}」を削除してもよろしいですか？
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="outlined" color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
