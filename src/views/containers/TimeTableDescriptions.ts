import { connect } from "react-redux";
import { State } from "../../state/store";
import { selectors } from "../../state/ducks/timetables";
import Component, { StateProps } from "../components/TimeTableDescriptions";

type StateToProps = { descriptionStr: string };

const mapStateToProps = ({ editors }: State): StateToProps => {
  const { editData } = editors;
  const { descriptionStr } = selectors.splitTBL(editData);

  return {
    descriptionStr
  };
};

const mergeProps = (stateProps: StateToProps): StateProps => {
  const { descriptionStr } = stateProps;

  return {
    descriptionDict: selectors.getDescriptionDict(descriptionStr)
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(Component);
