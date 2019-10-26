import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../state/store";
import { operations } from "../../state/ducks/viewstyles";
import Component, {
  StateProps,
  DispatchProps
} from "../components/ViewerStyle";

const mapStateToProps = ({ viewstyles }: State): StateProps => ({
  viewerHeight: viewstyles.viewerHeight
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setViewerHeight: operations.setViewerHeight(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
