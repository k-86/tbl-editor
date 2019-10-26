import { Dispatch } from "redux";
import actions from "./actions";

const setViewerHeight = (dispatch: Dispatch) => {
  return (height: number): void => {
    dispatch(actions.setViewerHeight({ height }));
  };
};

const setTextEditorRow = (dispatch: Dispatch) => {
  return (row: number): void => {
    dispatch(actions.setTextEditorRow({ row }));
  };
};

const setAppGridRow = (dispatch: Dispatch) => {
  return (size: number): void => {
    dispatch(actions.setAppGridRow({ size }));
  };
};

export default {
  setViewerHeight,
  setTextEditorRow,
  setAppGridRow
};
