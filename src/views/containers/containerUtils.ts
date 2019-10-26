import { State } from "../../state/store";

// Avoid warnings: react-redux/mapStateToProps-no-store
const getState = (state: State): State => state;

export default {
  getState
};
