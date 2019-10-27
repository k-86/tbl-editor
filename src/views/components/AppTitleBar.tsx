import React, { ReactChild, ReactElement } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import { GitHub } from "@material-ui/icons";
import SettingMenu from "./SettingMenu";
import TimeTableSelector from "../containers/TimeTableSelector";
import CreateFileButton from "../containers/CreateFileButton";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    },
    content: {
      flexGrow: 1
    }
  })
);

type ClassType = ReturnType<typeof useStyles>;

const createTitle = (classes: ClassType): ReactChild => (
  <>
    <Typography className={classes.content} component="h2" variant="h6">
      TBL Editor
    </Typography>

    <Typography className={classes.content} component="h2" variant="h6">
      時刻表リストからファイルを選択してください
    </Typography>
  </>
);

const createEditContents = (
  classes: ClassType,
  editFileName: string
): ReactChild => (
  <>
    <Typography
      className={classes.content}
      component="h2"
      variant="h6"
      color="primary"
    >
      {editFileName}
      .TBL
    </Typography>

    <div className={classes.content}>
      <TimeTableSelector />
    </div>
  </>
);

export type StateProps = {
  editFileName: string;
};

const AppTitleBar: React.FC<StateProps> = ({ editFileName }): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          {editFileName
            ? createEditContents(classes, editFileName)
            : createTitle(classes)}

          <CreateFileButton />
          <SettingMenu />
          <GitHubRepoButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const GitHubRepoButton: React.FC = (): ReactElement => {
  return (
    <Tooltip title="GitHub repository">
      <IconButton
        aria-label="github-repo"
        href="https://github.com/k-86/tbl-editor"
        target="_blank"
      >
        <GitHub />
      </IconButton>
    </Tooltip>
  );
};

export default AppTitleBar;
