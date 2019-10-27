import React, { ReactElement } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import debounce from "lodash/debounce";
import {
  Button,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Tooltip
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import ProgressButton from "./ProgressButton";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1)
    }
  })
);

export type StateProps = {
  isCreateFileNameEmpty: boolean;
  isAlreadyToUseCreateFile: boolean;
};

export type DispatchProps = {
  updateCheckFileName: (fileName: string) => void;
  create: (fileName: string) => void;
};

const CreateFileButton: React.FC<StateProps & DispatchProps> = ({
  isCreateFileNameEmpty,
  isAlreadyToUseCreateFile,
  updateCheckFileName,
  create
}): ReactElement => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [changing, setChanging] = React.useState(false);
  const [inputData, setInputData] = React.useState("");

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

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    updateCheckFileName("");
    setOpen(false);
  };

  const handleCreate = (): void => {
    create(inputData.trim());
    handleClose();
  };

  React.useEffect((): void => {
    if (open) {
      setInputData("");
    }
  }, [open]);

  return (
    <>
      <Tooltip title="新規作成">
        <Fab
          onClick={handleOpen}
          aria-label="add"
          color="primary"
          size="small"
          className={classes.fab}
        >
          <Add />
        </Fab>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-rename">
        <DialogTitle id="dialog-rename">ファイルの作成</DialogTitle>
        <form
          onSubmit={(e): void => {
            e.preventDefault();
            handleCreate();
          }}
        >
          <DialogContent>
            <DialogContentText>ファイル名を入力してください</DialogContentText>
            <TextField
              id="fileName"
              label="ファイル名"
              placeholder="例:駅名-方面名"
              fullWidth
              autoFocus
              margin="dense"
              error={isAlreadyToUseCreateFile}
              helperText={
                isAlreadyToUseCreateFile
                  ? "ファイル名が既に使用されています"
                  : ""
              }
              value={inputData}
              onChange={handleChangeInput}
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
              Create
            </ProgressButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateFileButton;
