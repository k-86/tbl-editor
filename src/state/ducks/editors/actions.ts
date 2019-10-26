import actionCreatorFactory from "typescript-fsa";
import { types as RepoTypes } from "../repositories";

const actionCreator = actionCreatorFactory("TBL_EDITOR");

export const setEditTBL = actionCreator<{ tbl: RepoTypes.TBL }>("SET_EDIT_TBL");

export const updateEditData = actionCreator<{
  data: string;
}>("UPDATE_EDIT_DATA");

export default {
  setEditTBL,
  updateEditData
};
