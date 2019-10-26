import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../state/store";
import { operations, selectors } from "../../state/ducks/timetables";
import Component, {
  StateProps,
  DispatchProps
} from "../components/TimeTableSelector";

const mapStateToProps = ({ editors, timetables }: State): StateProps => {
  const dayOfWeeks = selectors.getDayOfWeeks(editors.editData);

  return {
    dayOfWeeks,
    selectDayOfWeek: timetables.selectDayOfWeek
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  selectTimeTable: operations.selectTimeTable(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
