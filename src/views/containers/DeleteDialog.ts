import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../state/store";
import { operations } from "../../state/ducks/repositories";
import utils from "./containerUtils";
import Component, { OwnProps, DispatchProps } from "../components/DeleteDialog";

type StateToProps = { state: State };
const mapStateToProps = (state: State): StateToProps => {
  return {
    state: utils.getState(state)
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
): OwnProps & DispatchProps => {
  const { state } = stateProps;
  const { dispatch } = dispatchProps;
  const { name } = ownProps;

  return {
    ...ownProps,
    remove: (): void => operations.removeByName(dispatch, state)(name)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);
