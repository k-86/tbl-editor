import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../state/store";
import { operations } from "../../state/ducks/viewstyles";
import Component, {
  StateProps,
  DispatchProps
} from "../components/AppGridStyle";

const mapStateToProps = ({ viewstyles }: State): StateProps => ({
  appGridRow: viewstyles.appGridRow
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setAppGridRow: operations.setAppGridRow(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
