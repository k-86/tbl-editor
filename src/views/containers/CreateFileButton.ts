import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../state/store";
import { operations, selectors } from "../../state/ducks/repositories";
import Component, {
  StateProps,
  DispatchProps
} from "../components/CreateFileButton";

const mapStateToProps = ({ repositories }: State): StateProps => ({
  isCreateFileNameEmpty: selectors.isCreateFileNameEmpty(repositories),
  isAlreadyToUseCreateFile: selectors.isAlreadyToUseCreateFile(repositories)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  create: operations.create(dispatch),
  updateCheckFileName: operations.updateCheckFileName(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
