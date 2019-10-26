import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../state/store";
import { operations, selectors } from "../../state/ducks/repositories";
import utils from "./containerUtils";
import Component, {
  StateProps,
  DispatchProps,
  OwnProps
} from "../components/RenameDialog";

type StateToProps = { state: State } & StateProps;
const mapStateToProps = (state: State): StateToProps => {
  const { repositories } = state;

  return {
    state: utils.getState(state),
    isCreateFileNameEmpty: selectors.isCreateFileNameEmpty(repositories),
    isAlreadyToUseCreateFile: selectors.isAlreadyToUseCreateFile(repositories)
  };
};

type DispatchToProps = { dispatch: Dispatch };
const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
  dispatch
});

const mergeProps = (
  stateProps: StateToProps,
  dispatchProps: DispatchToProps,
  ownProps: OwnProps
): StateProps & DispatchProps & OwnProps => {
  const { state, ...otherState } = stateProps;
  const { dispatch } = dispatchProps;
  const { name } = ownProps;

  return {
    ...otherState,
    ...ownProps,
    updateCheckFileName: operations.updateCheckFileName(dispatch),
    rename: operations.rename(dispatch, state)(name)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);
