import selectors from "./selectors";
import { createInitialState } from "../testUtils";

describe("editors selectors", (): void => {
  it("isCurrentDataChanged if changed", () => {
    const initialState = createInitialState();

    initialState.editors.selectedTBL = {
      id: "id_changed",
      name: "changed",
      data: "old data",
      created: 10
    };
    initialState.editors.editData = "new data";

    const { editors } = initialState;

    expect(selectors.isCurrentDataChanged(editors)).toBe(true);
  });

  it("isCurrentDataChanged if not changed", () => {
    const initialState = createInitialState();

    initialState.editors.selectedTBL = {
      id: "id_not_changed",
      name: "not_changed",
      data: "data",
      created: 20
    };
    initialState.editors.editData = "data";

    const { editors } = initialState;

    expect(selectors.isCurrentDataChanged(editors)).toBe(false);
  });

  it("isCurrentDataChanged if selectedTBL is not selected", () => {
    const initialState = createInitialState();

    initialState.editors.selectedTBL = {
      id: "",
      name: "",
      data: "",
      created: -1
    };
    initialState.editors.editData = "data";

    const { editors } = initialState;

    expect(selectors.isCurrentDataChanged(editors)).toBe(false);
  });
});
