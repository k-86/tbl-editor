import { numberToGridSize, getGridSize } from "./selectors";
import { ViewStyleState } from "./types";

describe("timetables/selectors", (): void => {
  it("numberToGridSize", (): void => {
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((e): void => {
      expect(numberToGridSize(e)).toBe(e);
    });

    expect(numberToGridSize(0)).toBe(12);

    expect(numberToGridSize(-1)).toBe(1);
    expect(numberToGridSize(-100)).toBe(1);

    expect(numberToGridSize(13)).toBe(12);
    expect(numberToGridSize(100)).toBe(12);
  });

  it("getGridSize", (): void => {
    const template: ViewStyleState = {
      viewerHeight: 500,
      textEditorRow: 15,
      appGridRow: 1
    };

    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((e): void => {
      expect(getGridSize({ ...template, appGridRow: e })).toStrictEqual({
        gridL: e,
        gridR: 12 - e
      });
    });

    expect(getGridSize({ ...template, appGridRow: 12 })).toStrictEqual({
      gridL: 12,
      gridR: 12
    });
  });
});
