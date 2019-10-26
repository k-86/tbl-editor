// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from "redux-mock-store";
import actions from "./actions";
import operations from "./operations";
import { initEditData, initSelectedTBL } from "./reducers";

const mockStore = configureStore([]);

describe("editors operations", (): void => {
  it("setEditTBL", () => {
    const store = mockStore({});

    const tbl = {
      id: "id",
      name: "name",
      data: "data",
      created: 10
    };

    operations.setEditTBL(store.dispatch)(tbl);

    expect(store.getActions()).toStrictEqual([
      actions.setEditTBL({ tbl }),
      actions.updateEditData({ data: tbl.data })
    ]);
  });

  it("clearEditTBL", () => {
    const store = mockStore({});

    operations.clearEditTBL(store.dispatch)();

    expect(store.getActions()).toStrictEqual([
      actions.setEditTBL({ tbl: initSelectedTBL }),
      actions.updateEditData({ data: initEditData })
    ]);
  });

  it("updateEditData", () => {
    const store = mockStore({});

    operations.updateEditData(store.dispatch)("data");

    expect(store.getActions()).toStrictEqual([
      actions.updateEditData({ data: "data" })
    ]);
  });
});
