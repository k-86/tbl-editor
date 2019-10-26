// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from "redux-mock-store";
import actions from "./actions";
import operations from "./operations";

const mockStore = configureStore([]);

describe("viewstyles operations", (): void => {
  it("setViewerHeight", () => {
    const store = mockStore({});

    operations.setViewerHeight(store.dispatch)(100);

    expect(store.getActions()).toStrictEqual([
      actions.setViewerHeight({ height: 100 })
    ]);
  });

  it("setTextEditorRow", () => {
    const store = mockStore({});

    operations.setTextEditorRow(store.dispatch)(1);

    expect(store.getActions()).toStrictEqual([
      actions.setTextEditorRow({ row: 1 })
    ]);
  });

  it("setAppGridRow", () => {
    const store = mockStore({});

    operations.setAppGridRow(store.dispatch)(5);

    expect(store.getActions()).toStrictEqual([
      actions.setAppGridRow({ size: 5 })
    ]);
  });
});
