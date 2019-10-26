import React, { ReactElement } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import { types } from "../../state/ducks/timetables";
import { getColorCode } from "./componentUtils";

export type StateProps = {
  descriptionDict: types.DescriptionDictionary;
};

const TimeTableDescriptions: React.FC<StateProps> = ({
  descriptionDict
}): ReactElement => (
  <Table size="small">
    <TableHead>
      <TableRow>
        <TableCell component="th" scope="row">
          Key
        </TableCell>
        <TableCell>Data</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {Object.entries(descriptionDict).map(
        ([key, descriptions]): ReactElement => (
          <React.Fragment key={key}>
            <TableRow>
              <TableCell>
                <Typography noWrap variant="body2">
                  {key}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  noWrap
                  variant="body2"
                  style={{ color: getColorCode(descriptions) }}
                >
                  {`[${descriptions.reduce(
                    (res, str): string => `${res}] [${str}`
                  )}]`}
                </Typography>
              </TableCell>
            </TableRow>
          </React.Fragment>
        )
      )}
    </TableBody>
  </Table>
);

export default TimeTableDescriptions;
