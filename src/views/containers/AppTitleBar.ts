import { connect } from "react-redux";
import { State } from "../../state/store";
import Component, { StateProps } from "../components/AppTitleBar";

const mapStateToProps = ({ editors }: State): StateProps => ({
  editFileName: editors.selectedTBL.name
});

export default connect(mapStateToProps)(Component);
