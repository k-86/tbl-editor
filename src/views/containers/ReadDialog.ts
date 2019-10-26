import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../state/store";
import { operations } from "../../state/ducks/repositories";
import { selectors as eSelectors } from "../../state/ducks/editors";
import utils from "./containerUtils";
import Component, {
  StateProps,
  DispatchProps,
  OwnProps
} from "../components/ReadDialog";

type StateToProps = { state: State } & StateProps;
const mapStateToProps = (state: State): StateToProps => {
  const { editors } = state;

  return {
    state: utils.getState(state),
    saveName: editors.selectedTBL.name,
    isEditDataChanged: eSelectors.isCurrentDataChanged(editors)
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
  const { editors } = state;
  const { dispatch } = dispatchProps;
  const { readId } = ownProps;

  return {
    ...otherState,
    ...ownProps,
    save: (): void => {
      operations.save(dispatch, state)(otherState.saveName, editors.editData);
    },
    read: (): void => {
      operations.read(dispatch, state)(readId);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);
