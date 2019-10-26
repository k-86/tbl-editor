import React, { ReactElement } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles(() =>
  createStyles({
    button: {
      textTransform: "none"
    }
  })
);

export type StateProps = {
  saveName: string;
  isEditDataChanged: boolean;
};

export type DispatchProps = {
  save: () => void;
  read: () => void;
};

export type OwnProps = {
  open: boolean;
  readId: string;
  onClose: () => void;
};

const ReadDialog: React.FC<StateProps & DispatchProps & OwnProps> = ({
  open,
  saveName,
  isEditDataChanged,
  onClose,
  save,
  read
}): ReactElement => {
  const classes = useStyles();

  const handleCancel = (): void => {
    onClose();
  };

  const handleDoNotSave = React.useCallback((): void => {
    read();
    onClose();
  }, [onClose, read]);

  const handleSave = (): void => {
    save();
    read();
    onClose();
  };

  React.useEffect((): void => {
    if (open && !isEditDataChanged) {
      handleDoNotSave();
    }
  }, [handleDoNotSave, isEditDataChanged, open]);

  return (
    <Dialog open={open} onClose={handleCancel} aria-labelledby="dialog-rename">
      <DialogTitle id="dialog-rename">変更内容の保存確認</DialogTitle>
      <DialogContent>
        <DialogContentText>
          「{saveName}」への変更内容を保存しますか？
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleCancel}
          variant="outlined"
          color="default"
          className={classes.button}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDoNotSave}
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          No Save
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReadDialog;
