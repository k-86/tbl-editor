import { RepositoryState, TBL } from "./types";
import { byName, includeName, byId } from "./utils";

const getTBLs = (state: RepositoryState): TBL[] => {
  return [...state.tbls];
};

const sortByCreated = (tbls: TBL[], asc: boolean): TBL[] => {
  const newTBLs = [...tbls];

  return asc
    ? newTBLs.sort((a, b) => a.created - b.created)
    : newTBLs.sort((a, b) => b.created - a.created);
};

const removeDuplicateName = (tbls: TBL[]): TBL[] => {
  return tbls.reduce(
    (unique, tbl) =>
      unique.find(e => e.name === tbl.name) ? unique : [...unique, tbl],
    [] as TBL[]
  );
};

const filterByIncludeName = (tbls: TBL[], name: string): TBL[] => {
  return tbls.filter(includeName(name));
};

const filterByName = (tbls: TBL[], name: string): TBL[] => {
  return tbls.filter(byName(name));
};

const findById = (tbls: TBL[], id: string): TBL | undefined => {
  return tbls.find(byId(id));
};

const isCreateFileNameEmpty = (state: RepositoryState): boolean =>
  state.checkFileName === "";

const isAlreadyToUseCreateFile = (state: RepositoryState): boolean => {
  const { checkFileName, tbls } = state;

  return tbls.find(byName(checkFileName)) !== undefined;
};

export default {
  getTBLs,
  sortByCreated,
  removeDuplicateName,
  filterByIncludeName,
  filterByName,
  findById,
  isCreateFileNameEmpty,
  isAlreadyToUseCreateFile
};
