// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from "redux-mock-store";
import actions from "./actions";
import operations, { resize } from "./operations";
import editorActs from "../editors/actions";
import { initEditData, initSelectedTBL } from "../editors/reducers";
import timetableActs from "../timetables/actions";
import { createInitialState, shuffle } from "../testUtils";
import { generateId, generateTBLData, generateTimestamp } from "./utils";

jest.mock("./utils", () => {
  return {
    ...jest.requireActual("./utils"),
    generateId: jest.fn().mockReturnValueOnce(undefined),
    generateTBLData: jest.fn().mockReturnValueOnce(undefined),
    generateTimestamp: jest.fn().mockReturnValueOnce(undefined)
  };
});

const mockStore = configureStore([]);

describe("repositories operations", (): void => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("create", () => {
    const store = mockStore({});
    (generateId as jest.Mock).mockReturnValueOnce("create_id");
    (generateTBLData as jest.Mock).mockImplementationOnce(
      e => `${e}:create_data`
    );
    (generateTimestamp as jest.Mock).mockReturnValueOnce(10);

    operations.create(store.dispatch)("create_name");
    const newTBL = {
      id: "create_id",
      name: "create_name",
      data: "create_name:create_data",
      created: 10
    };

    expect(store.getActions()).toStrictEqual([
      actions.create({ tbl: newTBL }),
      editorActs.setEditTBL({ tbl: newTBL }),
      editorActs.updateEditData({ data: newTBL.data }),
      timetableActs.selectTimeTable({ dayOfWeek: "" })
    ]);
  });

  it("read", () => {
    const initialState = createInitialState();
    const initTBL = {
      id: "read_id",
      name: "read_name",
      data: "read_data",
      created: 20
    };
    initialState.repositories.tbls.push(initTBL);

    const store = mockStore(initialState);

    operations.read(store.dispatch, initialState)("read_id");

    expect(store.getActions()).toStrictEqual([
      editorActs.setEditTBL({ tbl: initTBL }),
      editorActs.updateEditData({ data: "read_data" }),
      timetableActs.selectTimeTable({ dayOfWeek: "" })
    ]);
  });

  it("read if not found", () => {
    const initialState = createInitialState();
    initialState.repositories.tbls.push({
      id: "read_id",
      name: "read_name",
      data: "read_data",
      created: 20
    });

    const store = mockStore(initialState);

    operations.read(store.dispatch, initialState)("id");

    expect(store.getActions()).toStrictEqual([]);
  });

  it("save", () => {
    const initialState = createInitialState();
    initialState.repositories.historySize = 100;

    const store = mockStore(initialState);
    (generateId as jest.Mock).mockReturnValueOnce("save_id");
    (generateTimestamp as jest.Mock).mockReturnValueOnce(30);

    operations.save(store.dispatch, initialState)("save_name", "save_data");

    const savedTBL = {
      id: "save_id",
      name: "save_name",
      data: "save_data",
      created: 30
    };

    expect(store.getActions()).toStrictEqual([
      actions.create({ tbl: savedTBL }),
      editorActs.setEditTBL({ tbl: savedTBL }),
      editorActs.updateEditData({ data: savedTBL.data })
    ]);
  });

  it("rename", () => {
    const initCreated = 40;
    const initialState = createInitialState();

    const sameNameTBLs = [1, 3, 5].map((e, i) => ({
      id: `rename_${e}`,
      name: "old_name",
      data: `data_${i}`,
      created: initCreated + e
    }));

    const notSameNameTBLs = [2, 4].map((e, i) => ({
      id: `rename_id_${e}`,
      name: "another_name",
      data: `another_data_${i}`,
      created: initCreated + e
    }));

    const initTBLs = shuffle([...sameNameTBLs, ...notSameNameTBLs]);
    initialState.repositories.tbls.push(...initTBLs);

    const store = mockStore(initialState);
    [6, 7, 8].forEach(e => {
      (generateId as jest.Mock).mockReturnValueOnce(`rename_id_${e}`);
      (generateTimestamp as jest.Mock).mockReturnValueOnce(initCreated + e);
    });

    operations.rename(store.dispatch, initialState)("old_name")(
      "new_name",
      false
    );

    expect(store.getActions()).toStrictEqual(
      [6, 7, 8].map((e, i) => {
        return actions.create({
          tbl: {
            id: `rename_id_${e}`,
            name: "new_name",
            data: `data_${i}`,
            created: initCreated + e
          }
        });
      })
    );
  });

  it("rename and delete original file", () => {
    const initCreated = 140;
    const initialState = createInitialState();

    const sameNameTBLs = [1, 3, 5].map((e, i) => ({
      id: `rename_${e}`,
      name: "old_name",
      data: `data_${i}`,
      created: initCreated + e
    }));

    const notSameNameTBLs = [2, 4].map((e, i) => ({
      id: `rename_id_${e}`,
      name: "another_name",
      data: `another_data_${i}`,
      created: initCreated + e
    }));

    const initTBLs = shuffle([...sameNameTBLs, ...notSameNameTBLs]);
    initialState.repositories.tbls.push(...initTBLs);

    const store = mockStore(initialState);
    [6, 7, 8].forEach(e => {
      (generateId as jest.Mock).mockReturnValueOnce(`rename_id_${e}`);
    });

    operations.rename(store.dispatch, initialState)("old_name")(
      "new_name",
      true
    );

    expect(store.getActions()).toStrictEqual([
      ...[6, 7, 8].map((e, i) => {
        return actions.create({
          tbl: {
            ...sameNameTBLs[i],
            id: `rename_id_${e}`,
            name: "new_name"
          }
        });
      }),
      ...[1, 3, 5].map(e => actions.remove({ id: `rename_${e}` }))
    ]);
  });

  it.each([0, 1, 2])("rename file being edited:%i", selectedIndex => {
    const initCreated = 50;
    const initialState = createInitialState();

    const sameNameTBLs = [1, 3, 5].map((e, i) => ({
      id: `rename_${e}`,
      name: "old_name",
      data: `data_${i}`,
      created: initCreated + e
    }));

    const notSameNameTBLs = [2, 4].map((e, i) => ({
      id: `rename_id_${e}`,
      name: "another_name",
      data: `another_data_${i}`,
      created: initCreated + e
    }));

    const initTBLs = shuffle([...sameNameTBLs, ...notSameNameTBLs]);
    initialState.repositories.tbls.push(...initTBLs);
    initialState.editors.selectedTBL = sameNameTBLs[selectedIndex];

    const store = mockStore(initialState);
    [6, 7, 8].forEach(e => {
      (generateId as jest.Mock).mockReturnValueOnce(`rename_id_${e}`);
      (generateTimestamp as jest.Mock).mockReturnValueOnce(initCreated + e);
    });

    operations.rename(store.dispatch, initialState)("old_name")(
      "new_name",
      false
    );

    const newTBLs = [6, 7, 8].map((e, i) => ({
      id: `rename_id_${e}`,
      name: "new_name",
      data: `data_${i}`,
      created: initCreated + e
    }));

    expect(store.getActions()).toStrictEqual([
      ...newTBLs.map(e => {
        return actions.create({ tbl: e });
      }),
      editorActs.setEditTBL({ tbl: newTBLs[selectedIndex] }),
      editorActs.updateEditData({ data: newTBLs[selectedIndex].data })
    ]);
  });

  it.each([0, 1, 2])(
    "rename and delete file being edited:%i",
    selectedIndex => {
      const initCreated = 50;
      const initialState = createInitialState();

      const sameNameTBLs = [1, 3, 5].map((e, i) => ({
        id: `rename_${e}`,
        name: "old_name",
        data: `data_${i}`,
        created: initCreated + e
      }));

      const notSameNameTBLs = [2, 4].map((e, i) => ({
        id: `rename_id_${e}`,
        name: "another_name",
        data: `another_data_${i}`,
        created: initCreated + e
      }));

      const initTBLs = shuffle([...sameNameTBLs, ...notSameNameTBLs]);
      initialState.repositories.tbls.push(...initTBLs);
      initialState.editors.selectedTBL = sameNameTBLs[selectedIndex];

      const store = mockStore(initialState);
      [6, 7, 8].forEach(e => {
        (generateId as jest.Mock).mockReturnValueOnce(`rename_id_${e}`);
      });

      operations.rename(store.dispatch, initialState)("old_name")(
        "new_name",
        true
      );

      const newTBLs = [6, 7, 8].map((e, i) => ({
        ...sameNameTBLs[i],
        id: `rename_id_${e}`,
        name: "new_name"
      }));

      expect(store.getActions()).toStrictEqual([
        ...newTBLs.map(e => {
          return actions.create({ tbl: e });
        }),
        ...[1, 3, 5].map(e => actions.remove({ id: `rename_${e}` })),
        editorActs.setEditTBL({ tbl: newTBLs[selectedIndex] }),
        editorActs.updateEditData({ data: newTBLs[selectedIndex].data })
      ]);
    }
  );

  it("rename if oldName equals newName", () => {
    const initialState = createInitialState();

    const store = mockStore(initialState);

    operations.rename(store.dispatch, initialState)("rename_name")(
      "rename_name",
      false
    );

    expect(store.getActions()).toStrictEqual([]);
  });

  it("rename if not found oldName in repositories", () => {
    const initCreated = 60;
    const initialState = createInitialState();
    initialState.repositories.tbls.push(
      ...[1, 2, 3].map(e => ({
        id: `rename_${e}`,
        name: `name_${e}`,
        data: `data_${e}`,
        created: initCreated + e
      }))
    );

    const store = mockStore(initialState);

    operations.rename(store.dispatch, initialState)("old_name")(
      "new_name",
      false
    );

    expect(store.getActions()).toStrictEqual([]);
  });

  it("removeById", () => {
    const initialState = createInitialState();

    const store = mockStore(initialState);

    operations.removeById(store.dispatch, initialState)("removeById_id");

    expect(store.getActions()).toStrictEqual([
      actions.remove({ id: "removeById_id" })
    ]);
  });

  it("removeById file being edited", () => {
    const initialState = createInitialState();
    initialState.editors.selectedTBL = {
      id: "removeById_edit_id",
      name: "removeById_edit_name",
      data: "removeById_edit_data",
      created: 80
    };

    const store = mockStore(initialState);

    operations.removeById(store.dispatch, initialState)("removeById_edit_id");

    expect(store.getActions()).toStrictEqual([
      actions.remove({ id: "removeById_edit_id" }),
      editorActs.setEditTBL({ tbl: initSelectedTBL }),
      editorActs.updateEditData({ data: initEditData }),
      timetableActs.selectTimeTable({ dayOfWeek: "" })
    ]);
  });

  it("removeByName", () => {
    const initCreated = 90;
    const initTBL = {
      name: `removeByName_name`,
      data: `removeByName_data`,
      created: initCreated
    };

    const initialState = createInitialState();
    initialState.repositories.tbls.push(
      ...[1, 2, 3].map(e => ({
        ...initTBL,
        id: `removeByName_${e}`
      })),
      ...[4, 5].map(e => ({
        ...initTBL,
        id: `removeByName_${e}`,
        name: `removeByName_name_another`
      })),
      ...[6, 7].map(e => ({
        ...initTBL,
        id: `removeByName_${e}`
      }))
    );

    const store = mockStore(initialState);

    operations.removeByName(store.dispatch, initialState)("removeByName_name");

    expect(store.getActions()).toStrictEqual(
      [1, 2, 3, 6, 7].map(e => actions.remove({ id: `removeByName_${e}` }))
    );
  });

  it("removeByName  file being edited", () => {
    const initCreated = 100;
    const initTBL = {
      name: `removeByName_name`,
      data: `removeByName_data`,
      created: initCreated
    };

    const initialState = createInitialState();
    initialState.repositories.tbls.push(
      ...[1, 2, 3].map(e => ({
        ...initTBL,
        id: `removeByName_${e}`
      })),
      ...[4, 5].map(e => ({
        ...initTBL,
        id: `removeByName_${e}`,
        name: `removeByName_name_another`
      })),
      ...[6, 7].map(e => ({
        ...initTBL,
        id: `removeByName_${e}`
      }))
    );

    initialState.editors.selectedTBL = {
      id: `removeByName_3`,
      name: `removeByName_name`,
      data: `removeByName_data`,
      created: initCreated
    };

    const store = mockStore(initialState);

    operations.removeByName(store.dispatch, initialState)("removeByName_name");

    expect(store.getActions()).toStrictEqual([
      ...[1, 2, 3].map(e => actions.remove({ id: `removeByName_${e}` })),
      editorActs.setEditTBL({ tbl: initSelectedTBL }),
      editorActs.updateEditData({ data: initEditData }),
      timetableActs.selectTimeTable({ dayOfWeek: "" }),
      ...[6, 7].map(e => actions.remove({ id: `removeByName_${e}` }))
    ]);
  });

  it("resize", (): void => {
    const initCreated = 110;
    const initialState = createInitialState();

    const resizeTBLsA = [1, 2, 3].map((e, i) => ({
      id: `resize_${e}`,
      name: "resize_name_a",
      data: `data_${i}`,
      created: initCreated + e
    }));

    const resizeTBLsB = [4, 5, 6, 7].map((e, i) => ({
      id: `resize_${e}`,
      name: "resize_name_b",
      data: `data_${i}`,
      created: initCreated + e
    }));

    const notResizeTBLs = [10, 11].map((e, i) => ({
      id: `resize_${e}`,
      name: "not_resize_name",
      data: `data_${i}`,
      created: initCreated + e
    }));

    const initTBLs = shuffle([
      ...resizeTBLsA,
      ...resizeTBLsB,
      ...notResizeTBLs
    ]);
    initialState.repositories.tbls.push(...initTBLs);
    initialState.repositories.historySize = 2;

    const store = mockStore(initialState);

    resize(store.dispatch, initialState)("");
    expect(store.getActions()).toStrictEqual([]);

    resize(store.dispatch, initialState)("another_name");
    expect(store.getActions()).toStrictEqual([]);

    resize(store.dispatch, initialState)("not_resize_name");
    expect(store.getActions()).toStrictEqual([]);

    resize(store.dispatch, initialState)("resize_name_a");
    expect(store.getActions()).toStrictEqual([
      actions.remove({ id: `resize_1` })
    ]);

    store.clearActions();
    resize(store.dispatch, initialState)("resize_name_b");
    expect(store.getActions()).toStrictEqual(
      [4, 5].map(e => actions.remove({ id: `resize_${e}` }))
    );
  });

  it("updateSearchFileName", () => {
    const store = mockStore({});

    operations.updateSearchFileName(store.dispatch)("test");

    expect(store.getActions()).toStrictEqual([
      actions.updateSearchFileName({ fileName: "test" })
    ]);
  });

  it("updateCheckFileName", () => {
    const store = mockStore({});

    operations.updateCheckFileName(store.dispatch)("test");

    expect(store.getActions()).toStrictEqual([
      actions.updateCheckFileName({ fileName: "test" })
    ]);
  });

  it("setHistorySize", () => {
    const store = mockStore({});

    operations.setHistorySize(store.dispatch)(10);

    expect(store.getActions()).toStrictEqual([
      actions.setHistorySize({ historySize: 10 })
    ]);
  });
});
