import { connect } from "react-redux";
import { State } from "../../state/store";
import { selectors } from "../../state/ducks/viewstyles";
import Component, { StateProps } from "../components/App";

const mapStateToProps = ({ viewstyles }: State): StateProps =>
  selectors.getGridSize(viewstyles);

export default connect(mapStateToProps)(Component);
