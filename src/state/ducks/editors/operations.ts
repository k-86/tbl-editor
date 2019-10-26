import { Dispatch } from "redux";
import actions from "./actions";
import { initEditData, initSelectedTBL } from "./reducers";
import { types as RepoTypes } from "../repositories";

const setEditTBL = (dispatch: Dispatch) => (tbl: RepoTypes.TBL): void => {
  dispatch(actions.setEditTBL({ tbl }));
  dispatch(actions.updateEditData({ data: tbl.data }));
};

const clearEditTBL = (dispatch: Dispatch) => (): void => {
  dispatch(actions.setEditTBL({ tbl: initSelectedTBL }));
  dispatch(actions.updateEditData({ data: initEditData }));
};

const updateEditData = (dispatch: Dispatch) => (data: string): void => {
  dispatch(actions.updateEditData({ data }));
};

export default {
  setEditTBL,
  clearEditTBL,
  updateEditData
};
