import { connect } from "react-redux";
import { Dispatch } from "redux";
import { State } from "../../state/store";
import { operations } from "../../state/ducks/repositories";
import Component, {
  StateProps,
  DispatchProps
} from "../components/HistorySetting";

const mapStateToProps = ({ repositories }: State): StateProps => ({
  historySize: repositories.historySize
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  setHistorySize: operations.setHistorySize(dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
