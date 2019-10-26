import { connect } from "react-redux";
import { State } from "../../state/store";
import Component, { StateProps } from "../components/Viewer";

const mapStateToProps = ({ viewstyles }: State): StateProps => ({
  viewerHeight: viewstyles.viewerHeight
});

export default connect(mapStateToProps)(Component);
