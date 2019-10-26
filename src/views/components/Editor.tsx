import React, { ReactElement } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Box, Paper } from "@material-ui/core";
import TextEditor from "../containers/TextEditor";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(1)
    }
  })
);

const Editor: React.FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper square className={classes.paper}>
        <TextEditor />
      </Paper>
    </Box>
  );
};

export default Editor;
