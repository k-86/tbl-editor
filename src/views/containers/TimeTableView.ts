import { connect } from "react-redux";
import { State } from "../../state/store";
import { selectors } from "../../state/ducks/timetables";
import Component, { StateProps } from "../components/TimeTableView";

type StateToProps = {
  descriptionStr: string;
  timeTableStr: string;
};

const mapStateToProps = ({ editors, timetables }: State): StateToProps => {
  const { descriptionStr, timeTableStrList } = selectors.splitTBL(
    editors.editData
  );

  if (!timetables.selectDayOfWeek) {
    return {
      descriptionStr,
      timeTableStr: ""
    };
  }

  const timeTableStr = timeTableStrList.find((e): boolean =>
    e.includes(timetables.selectDayOfWeek)
  );

  return {
    descriptionStr,
    timeTableStr: timeTableStr || ""
  };
};

const mergeProps = (stateProps: StateToProps): StateProps => {
  const { descriptionStr, timeTableStr } = stateProps;

  const timeTable = selectors.getTimeTable(timeTableStr);
  const descriptionDict = selectors.getDescriptionDict(descriptionStr);

  return {
    ...timeTable,
    descriptionDict
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(Component);
