import React, { ReactElement } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import { types } from "../../state/ducks/timetables";
import { convertDescriptions, getColorCode } from "./componentUtils";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useStyles = makeStyles(() =>
  createStyles({
    oddCell: {
      backgroundColor: "#ffffff"
    },
    evenCell: {
      backgroundColor: "#fafafa"
    }
  })
);

const createDescriptionMessage = (
  ttm: types.TTMinute,
  descriptionDict: types.DescriptionDictionary
): ReactElement => (
  <>
    {convertDescriptions(ttm.descriptions, descriptionDict).map(
      (descs): ReactElement => (
        // eslint-disable-next-line react/jsx-key
        <span style={{ color: getColorCode(descs) }}>{` ${descs[0]}`}</span>
      )
    )}
  </>
);

export type StateProps = {
  title: string;
  dayOfWeek: string;
  hours: types.TTHour[];
  descriptionDict: types.DescriptionDictionary;
};

const TimeTableView: React.FC<StateProps> = ({
  title,
  dayOfWeek,
  hours,
  descriptionDict
}): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <Typography
        component="h3"
        variant="subtitle1"
        color="primary"
        align="center"
      >
        {title}
      </Typography>

      <Typography
        component="h3"
        variant="subtitle1"
        color="secondary"
        align="center"
      >
        {dayOfWeek}
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>時</TableCell>
            <TableCell>分</TableCell>
            <TableCell>備考</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hours.map(
            (row, index): ReactElement => (
              <React.Fragment key={row.hour}>
                {row.minutes.map(
                  (ttm, idx): ReactElement => (
                    <TableRow
                      key={`${row.hour}:${ttm.minute}`}
                      className={index % 2 ? classes.evenCell : classes.oddCell}
                    >
                      {idx === 0 && (
                        <TableCell
                          rowSpan={row.minutes.length}
                          component="th"
                          scope="row"
                        >
                          {row.hour}
                        </TableCell>
                      )}
                      <TableCell>
                        <Typography noWrap variant="body2">
                          {ttm.minute}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography noWrap variant="body2">
                          {createDescriptionMessage(ttm, descriptionDict)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </React.Fragment>
            )
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TimeTableView;
