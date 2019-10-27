import React, { ReactElement } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip
} from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import AppGridStyle from "../containers/AppGridStyle";
import EditorStyle from "../containers/EditorStyle";
import ViewerStyle from "../containers/ViewerStyle";
import HistorySetting from "../containers/HistorySetting";

const SettingMenu: React.FC = (): ReactElement => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="設定">
        <IconButton onClick={handleClickOpen}>
          <Settings fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="app-setting-dialog-title"
        aria-describedby="app-setting-dialog-description"
      >
        <DialogTitle id="app-setting-dialog">Setting</DialogTitle>
        <DialogContent>
          <DialogContentText id="app-setting-dialog-description">
            時刻表・入力画面の大きさや、保存履歴の最大記録数を変更できます。
          </DialogContentText>

          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item xs={12}>
              <AppGridStyle />
            </Grid>

            <Grid item xs={12}>
              <ViewerStyle />
            </Grid>

            <Grid item xs={12}>
              <EditorStyle />
            </Grid>

            <Grid item xs={12}>
              <HistorySetting />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SettingMenu;
