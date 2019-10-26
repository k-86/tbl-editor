import { connect } from "react-redux";
import { State } from "../../state/store";
import { selectors, types as RepoTypes } from "../../state/ducks/repositories";
import Component, { StateProps } from "../components/Repositories";

type StateToProps = {
  editId: string;
  tbls: RepoTypes.TBL[];
  searchName: string;
};

const mapStateToProps = (state: State): StateToProps => {
  const { editors, repositories } = state;

  return {
    editId: editors.selectedTBL.id,
    tbls: selectors.getTBLs(repositories),
    searchName: repositories.searchFileName
  };
};

const mergeProps = (stateProps: StateToProps): StateProps => {
  const { editId, tbls, searchName } = stateProps;

  const sortedInDescCreated = selectors.sortByCreated(tbls, false);
  const removedDuplicateName = selectors.removeDuplicateName(
    sortedInDescCreated
  );
  const filteredBySearchName = searchName
    ? selectors.filterByIncludeName(removedDuplicateName, searchName)
    : removedDuplicateName;

  return {
    editId,
    tbls: filteredBySearchName
  };
};

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(Component);
