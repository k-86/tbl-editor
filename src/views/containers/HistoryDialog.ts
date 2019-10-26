import { connect } from "react-redux";
import { State } from "../../state/store";
import { selectors, types } from "../../state/ducks/repositories";
import Component, { StateProps, OwnProps } from "../components/HistoryDialog";

type StateToProps = { editId: string; tbls: types.TBL[] };
const mapStateToProps = ({ editors, repositories }: State): StateToProps => {
  return {
    editId: editors.selectedTBL.id,
    tbls: selectors.getTBLs(repositories)
  };
};

type DispatchToProps = void;

const mergeProps = (
  stateProps: StateToProps,
  _: DispatchToProps,
  ownProps: OwnProps
): StateProps & OwnProps => {
  const { editId, tbls } = stateProps;
  const { name } = ownProps;

  const filteredByName = selectors.filterByName(tbls, name);
  const sortedInDescCreated = selectors.sortByCreated(filteredByName, false);

  return {
    ...ownProps,
    editId,
    tbls: sortedInDescCreated
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(Component);
