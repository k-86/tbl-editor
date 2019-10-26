import React, { ReactChild, ReactElement } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { AppBar, Box, Paper, Tabs, Tab } from "@material-ui/core";
import TimeTableDescriptions from "../containers/TimeTableDescriptions";
import TimeTableView from "../containers/TimeTableView";
import Repositories from "../containers/Repositories";

type StyleProps = {
  height: number;
};

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const useStyles = makeStyles<Theme, StyleProps>(theme =>
  createStyles({
    tabContent: {
      maxHeight: props => props.height,
      overflow: "auto",
      padding: theme.spacing(1)
    }
  })
);
/* eslint-enable @typescript-eslint/explicit-function-return-type */

const createTabLabel = (index: number, label: string): ReactChild => (
  <Tab label={label} id={`tab-${index}`} aria-controls={`tabpanel-${index}`} />
);

const createTabContent = (
  index: number,
  value: number,
  children: React.ReactChild
): ReactChild => (
  <Box
    component="div"
    role="tabpanel"
    hidden={value !== index}
    id={`tab-${index}`}
    aria-labelledby={`tabpanel-${index}`}
  >
    {children}
  </Box>
);

export type StateProps = {
  viewerHeight: number;
};

const Viewer: React.FC<StateProps> = ({ viewerHeight }): ReactElement => {
  const classes = useStyles({ height: viewerHeight });
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="time table"
        >
          {createTabLabel(0, "時刻表リスト")}
          {createTabLabel(1, "時刻表")}
          {createTabLabel(2, "備考データ")}
        </Tabs>
      </AppBar>
      <Paper square className={classes.tabContent}>
        {createTabContent(0, value, <Repositories />)}
        {createTabContent(1, value, <TimeTableView />)}
        {createTabContent(2, value, <TimeTableDescriptions />)}
      </Paper>
    </>
  );
};

export default Viewer;
