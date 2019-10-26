import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../state/store";
import { operations } from "../../state/ducks/viewstyles";
import Component, {
  StateProps,
  DispatchProps
} from "../components/EditorStyle";

const mapStateToProps = ({ viewstyles }: State): StateProps => ({
  textEditorRow: viewstyles.textEditorRow
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setTextEditorRow: operations.setTextEditorRow(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
