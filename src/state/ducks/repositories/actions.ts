import actionCreatorFactory from "typescript-fsa";
import { TBL } from "./types";

const actionCreator = actionCreatorFactory("REPOSITORIES");

export const create = actionCreator<{
  tbl: TBL;
}>("CREATE");

export const remove = actionCreator<{
  id: string;
}>("REMOVE");

export const updateSearchFileName = actionCreator<{
  fileName: string;
}>("UPDATE_SEARCH_FILE_NAME");

export const updateCheckFileName = actionCreator<{
  fileName: string;
}>("UPDATE_CHECK_FILE_NAME");

export const setHistorySize = actionCreator<{
  historySize: number;
}>("SET_HISTORY_SIZE");

export default {
  create,
  remove,
  updateSearchFileName,
  updateCheckFileName,
  setHistorySize
};
