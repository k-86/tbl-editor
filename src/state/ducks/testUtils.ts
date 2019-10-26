import { State } from "../store";
import { initEditData, initSelectedTBL } from "./editors/reducers";

// eslint-disable-next-line no-underscore-dangle
const _persist = {
  version: -1,
  rehydrated: true
};

export const createInitialState = (): State => ({
  editors: {
    selectedTBL: initSelectedTBL,
    editData: initEditData,
    _persist
  },
  repositories: {
    tbls: [],
    checkFileName: "",
    searchFileName: "",
    historySize: 0,
    _persist
  },
  timetables: {
    selectDayOfWeek: ""
  },
  viewstyles: {
    appGridRow: 0,
    textEditorRow: 0,
    viewerHeight: 0,
    _persist
  }
});

export const shuffle = <T>(array: T[]): T[] => {
  const res = [...array];
  for (let i = res.length - 1; i >= 0; i -= 1) {
    const rand = Math.floor(Math.random() * (i + 1));
    [res[i], res[rand]] = [res[rand], res[i]];
  }
  return res;
};
