import React, { ReactElement } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem
} from "@material-ui/core";
import { Delete, Edit, History, MoreVert, OpenInNew } from "@material-ui/icons";
import { types } from "../../state/ducks/repositories";
import { convertTimeStamp } from "./componentUtils";
import DeleteDialog from "../containers/DeleteDialog";
import HistoryDialog from "../containers/HistoryDialog";
import RenameDialog from "../containers/RenameDialog";
import ReadDialog from "../containers/ReadDialog";
import TimeTableSearch from "../containers/TimeTableSearch";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      marginLeft: theme.spacing(1)
    },
    list: {
      overflow: "auto"
    }
  })
);

export type StateProps = {
  editId: string;
  tbls: types.TBL[];
};

const Repositories: React.FC<StateProps> = ({ editId, tbls }): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.search}>
        <TimeTableSearch />
      </div>

      <List dense className={classes.list}>
        {tbls.map(
          (tbl): ReactElement => (
            <TBL key={tbl.id} tbl={tbl} selected={tbl.id === editId} />
          )
        )}
      </List>
    </>
  );
};

const TBL: React.FC<{
  tbl: types.TBL;
  selected: boolean;
}> = ({ tbl, selected }): ReactElement => {
  // Edit Menu
  const [
    editMenuAnchorEl,
    setEditMenuAnchorEl
  ] = React.useState<null | HTMLElement>(null);

  const handleClickEditMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setEditMenuAnchorEl(event.currentTarget);
  };

  const handleCloseEditMenu = (): void => {
    setEditMenuAnchorEl(null);
  };

  const initDialog = {
    read: false,
    history: false,
    rename: false,
    delete: false
  };

  const [openDialog, setOpenDialog] = React.useState(initDialog);

  const handleCloseDialog = (): void => {
    setOpenDialog(initDialog);
  };

  const handleOpenReadDialog = (): void => {
    setOpenDialog({ ...openDialog, read: true });
  };

  const handleOpenHistoryDialog = (): void => {
    setOpenDialog({ ...openDialog, history: true });
  };

  const handleOpenRenameDialog = (): void => {
    setOpenDialog({ ...openDialog, rename: true });
  };

  const handleOpenDeleteDialog = (): void => {
    setOpenDialog({ ...openDialog, delete: true });
  };

  return (
    <ListItem selected={selected}>
      <ListItemIcon>
        <IconButton onClick={handleOpenReadDialog}>
          <OpenInNew />
        </IconButton>
      </ListItemIcon>
      <ReadDialog
        open={openDialog.read}
        readId={tbl.id}
        onClose={handleCloseDialog}
      />

      <ListItemText
        primary={tbl.name}
        secondary={convertTimeStamp(tbl.created)}
      />

      <ListItemSecondaryAction>
        <IconButton
          aria-label={`more-${tbl.id}`}
          aria-controls={`menu-${tbl.id}`}
          aria-haspopup="true"
          onClick={handleClickEditMenu}
        >
          <MoreVert />
        </IconButton>

        <Menu
          id={`menu-${tbl.id}`}
          anchorEl={editMenuAnchorEl}
          keepMounted
          open={Boolean(editMenuAnchorEl)}
          onClose={handleCloseEditMenu}
        >
          <MenuItem
            key={`history-${tbl.id}`}
            onClick={(): void => {
              handleCloseEditMenu();
              handleOpenHistoryDialog();
            }}
          >
            <ListItemIcon>
              <History />
            </ListItemIcon>
            <ListItemText>History</ListItemText>
          </MenuItem>
          <HistoryDialog
            open={openDialog.history}
            name={tbl.name}
            onClose={handleCloseDialog}
          />

          <MenuItem
            key={`rename-${tbl.id}`}
            onClick={(): void => {
              handleCloseEditMenu();
              handleOpenRenameDialog();
            }}
          >
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText>Rename</ListItemText>
          </MenuItem>
          <RenameDialog
            open={openDialog.rename}
            name={tbl.name}
            onClose={handleCloseDialog}
          />

          <MenuItem
            key={`delete-${tbl.id}`}
            onClick={(): void => {
              handleCloseEditMenu();
              handleOpenDeleteDialog();
            }}
          >
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          <DeleteDialog
            open={openDialog.delete}
            name={tbl.name}
            onClose={handleCloseDialog}
          />
        </Menu>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Repositories;
