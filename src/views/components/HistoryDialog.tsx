import React, { ReactElement } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { OpenInNew } from "@material-ui/icons";
import { types } from "../../state/ducks/repositories";
import { convertTimeStamp } from "./componentUtils";
import ReadDialog from "../containers/ReadDialog";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles(() =>
  createStyles({
    list: {
      overflow: "auto"
    }
  })
);

export type StateProps = {
  editId: string;
  tbls: types.TBL[];
};

export type OwnProps = {
  open: boolean;
  name: string;
  onClose: () => void;
};

const HistoryDialog: React.FC<StateProps & OwnProps> = ({
  open,
  name,
  editId,
  tbls,
  onClose
}): ReactElement => {
  const classes = useStyles();

  const handleClose = (): void => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-history">
      <DialogTitle id="dialog-history">{name}の編集履歴</DialogTitle>

      <List dense className={classes.list}>
        {tbls.map(tbl => {
          return (
            <TBL
              key={tbl.id}
              tbl={tbl}
              selected={tbl.id === editId}
              onClose={handleClose}
            />
          );
        })}
      </List>

      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const TBL: React.FC<{
  tbl: types.TBL;
  selected: boolean;
  onClose: () => void;
}> = ({ tbl, selected, onClose }) => {
  const handleClose = (): void => {
    onClose();
  };

  // Read Dialog
  const [openReadDialog, setOpenReadDialog] = React.useState(false);

  const handleOpenReadDialog = (): void => {
    setOpenReadDialog(true);
  };

  const handleCloseReadDialog = (): void => {
    setOpenReadDialog(false);
    handleClose();
  };

  return (
    <>
      <ListItem selected={selected} button onClick={handleOpenReadDialog}>
        <ListItemIcon>
          <OpenInNew />
        </ListItemIcon>
        <ListItemText
          primary={tbl.name}
          secondary={convertTimeStamp(tbl.created)}
        />
      </ListItem>

      <ReadDialog
        open={openReadDialog}
        readId={tbl.id}
        onClose={handleCloseReadDialog}
      />
    </>
  );
};

export default HistoryDialog;
