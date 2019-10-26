import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../state/store";
import { operations, selectors } from "../../state/ducks/editors";
import { operations as repoOperations } from "../../state/ducks/repositories";
import utils from "./containerUtils";
import Component, { StateProps, DispatchProps } from "../components/TextEditor";

type StateToProps = { state: State } & StateProps;
const mapStateToProps = (state: State): StateToProps => {
  const { editors, viewstyles } = state;
  const { selectedTBL, editData } = editors;

  return {
    state: utils.getState(state),
    editFileName: selectedTBL.name,
    editData,
    disableEdit: !selectedTBL.id,
    isEditDataChanged: selectors.isCurrentDataChanged(editors),
    inputRow: viewstyles.textEditorRow
  };
};

type DispatchToProps = { dispatch: Dispatch };
const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
  dispatch
});

const mergeProps = (
  stateProps: StateToProps,
  dispatchProps: DispatchToProps
): StateProps & DispatchProps => {
  const { state, ...otherState } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...otherState,
    save: repoOperations.save(dispatch, state),
    changeInput: operations.updateEditData(dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Component);
