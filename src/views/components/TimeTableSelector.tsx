import React, { ReactElement } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      minWidth: 150
    }
  })
);

export type StateProps = {
  dayOfWeeks: string[];
  selectDayOfWeek: string;
};

export type DispatchProps = {
  selectTimeTable: (dayOfWeek: string) => void;
};

const TimeTableSelector: React.FC<StateProps & DispatchProps> = ({
  dayOfWeeks,
  selectDayOfWeek,
  selectTimeTable
}): ReactElement => {
  const classes = useStyles();

  const handleSelectTimeTable = React.useCallback(
    (e: React.ChangeEvent<{ name?: string; value: unknown }>): void => {
      selectTimeTable(e.target.value as string);
    },
    [selectTimeTable]
  );

  return (
    <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-day-of-week">Select Time Table</InputLabel>
        <Select
          value={selectDayOfWeek}
          onChange={handleSelectTimeTable}
          inputProps={{
            name: "day-of-week",
            id: "select-day-of-week"
          }}
        >
          {dayOfWeeks.map(
            (dayOfWeek): ReactElement => (
              <MenuItem
                key={dayOfWeek}
                value={dayOfWeek}
                selected={dayOfWeek === selectDayOfWeek}
              >
                {dayOfWeek}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </form>
  );
};

export default TimeTableSelector;
