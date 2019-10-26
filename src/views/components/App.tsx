import React, { ReactElement } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import { types } from "../../state/ducks/viewstyles";
import AppTitleBar from "../containers/AppTitleBar";
import Editor from "./Editor";
import Viewer from "../containers/Viewer";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3)
    }
  })
);

export type StateProps = {
  gridL: types.GridSize;
  gridR: types.GridSize;
};

const App: React.FC<StateProps> = ({ gridL, gridR }): ReactElement => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <AppTitleBar />
        </Grid>

        <Grid item xs={12} md={gridL}>
          <Viewer />
        </Grid>

        <Grid item xs={12} md={gridR}>
          <Editor />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
