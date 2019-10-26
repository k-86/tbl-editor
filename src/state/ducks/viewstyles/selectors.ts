import { GridSize, ViewStyleState } from "./types";

export const numberToGridSize = (from: number): GridSize => {
  if (from < 0) {
    return 1;
  }

  if (from === 0 || from > 12) {
    return 12;
  }

  return from as GridSize;
};

export const getGridSize = (
  state: ViewStyleState
): { gridL: GridSize; gridR: GridSize } => ({
  gridL: numberToGridSize(state.appGridRow),
  gridR: numberToGridSize(12 - state.appGridRow)
});

export default {
  getGridSize
};
