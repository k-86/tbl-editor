import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("VIEW_STYLE");

export const setViewerHeight = actionCreator<{
  height: number;
}>("SET_VIEWER_HEIGHT");

export const setTextEditorRow = actionCreator<{
  row: number;
}>("SET_TEXT_EDITOR_ROW");

export const setAppGridRow = actionCreator<{
  size: number;
}>("SET_APP_GRID_ROW");

export default {
  setViewerHeight,
  setTextEditorRow,
  setAppGridRow
};
