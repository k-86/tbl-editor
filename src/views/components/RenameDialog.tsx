import React, { ReactElement } from "react";
import debounce from "lodash/debounce";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField
} from "@material-ui/core";
import ProgressButton from "./ProgressButton";

export type OwnProps = {
  open: boolean;
  name: string;
  onClose: () => void;
};

export type StateProps = {
  isCreateFileNameEmpty: boolean;
  isAlreadyToUseCreateFile: boolean;
};

export type DispatchProps = {
  updateCheckFileName: (fileName: string) => void;
  rename: (newName: string, deleteOrigin: boolean) => void;
};

const RenameDialog: React.FC<StateProps & DispatchProps & OwnProps> = ({
  open,
  name,
  onClose,
  isCreateFileNameEmpty,
  isAlreadyToUseCreateFile,
  updateCheckFileName,
  rename
}): ReactElement => {
  const [changing, setChanging] = React.useState(false);
  const [inputData, setInputData] = React.useState(name);
  const [leaveOriginalFile, setLeaveOriginalFile] = React.useState(false);

  const debounceChangeInput = React.useCallback(
    debounce((e: string): void => {
      updateCheckFileName(e);
      setChanging(false);
    }, 500),
    []
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const data = e.target.value;
    setInputData(data);
    setChanging(true);
    debounceChangeInput(data);
  };

  const handleToggleCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setLeaveOriginalFile(event.target.checked);
  };

  const handleClose = (): void => {
    updateCheckFileName("");
    onClose();
  };

  const handleOK = (): void => {
    rename(inputData.trim(), !leaveOriginalFile);
    onClose();
  };

  React.useEffect((): void => {
    if (open) {
      setInputData(name);
    }
  }, [name, open]);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-rename">
      <DialogTitle id="dialog-rename">ファイル名の変更</DialogTitle>
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          handleOK();
        }}
      >
        <DialogContent>
          <DialogContentText>
            新しいファイル名を入力してください
          </DialogContentText>
          <TextField
            id="fileName"
            label="ファイル名"
            placeholder="駅名-方面名"
            fullWidth
            autoFocus
            margin="dense"
            error={isAlreadyToUseCreateFile}
            helperText={
              isAlreadyToUseCreateFile ? "ファイル名が既に使用されています" : ""
            }
            value={inputData}
            onChange={handleChangeInput}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={leaveOriginalFile}
                onChange={handleToggleCheckbox}
                value="leaveOriginalFile"
                inputProps={{
                  "aria-label": "leave original file"
                }}
              />
            }
            label="元のファイルを残す"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <ProgressButton
            isChanging={changing}
            disabled={isCreateFileNameEmpty || isAlreadyToUseCreateFile}
            type="submit"
            variant="outlined"
            color="primary"
          >
            Rename
          </ProgressButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RenameDialog;
