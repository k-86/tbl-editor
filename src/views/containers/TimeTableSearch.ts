import { connect } from "react-redux";
import { Dispatch } from "redux";
import { operations } from "../../state/ducks/repositories";
import Component, { DispatchProps } from "../components/TimeTableSearch";

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  searchFile: operations.updateSearchFileName(dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(Component);
