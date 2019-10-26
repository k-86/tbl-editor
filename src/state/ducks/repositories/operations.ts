import { Dispatch } from "redux";
import actions from "./actions";
import selectors from "./selectors";
import { TBL } from "./types";
import { generateId, generateTBLData, generateTimestamp, byId } from "./utils";
import { operations as editorOperations } from "../editors";
import { operations as ttOperations } from "../timetables";
import { State } from "../../store";

export const resize = (dispatch: Dispatch, state: State) => {
  return (name: string): void => {
    const tbls = selectors.getTBLs(state.repositories);
    const filteredByName = selectors.filterByName(tbls, name);

    const deleteSize = filteredByName.length - state.repositories.historySize;
    if (deleteSize > 0) {
      selectors
        .sortByCreated(filteredByName, true)
        .slice(0, deleteSize)
        .forEach(tbl => dispatch(actions.remove({ id: tbl.id })));
    }
  };
};

const create = (dispatch: Dispatch) => {
  return (name: string): void => {
    const newTBL: TBL = {
      id: generateId(),
      name,
      data: generateTBLData(name),
      created: generateTimestamp()
    };

    dispatch(actions.create({ tbl: newTBL }));

    editorOperations.setEditTBL(dispatch)(newTBL);
    ttOperations.selectTimeTable(dispatch)("");
  };
};

const read = (dispatch: Dispatch, state: State) => {
  return (id: string): void => {
    const tbls = selectors.getTBLs(state.repositories);
    const tbl = selectors.findById(tbls, id);
    if (!tbl) return;

    editorOperations.setEditTBL(dispatch)(tbl);
    ttOperations.selectTimeTable(dispatch)("");
  };
};

const save = (dispatch: Dispatch, state: State) => {
  return (name: string, data: string): void => {
    const newTBL: TBL = {
      id: generateId(),
      name,
      data,
      created: generateTimestamp()
    };

    dispatch(actions.create({ tbl: newTBL }));

    editorOperations.setEditTBL(dispatch)(newTBL);

    resize(dispatch, state)(name);
  };
};

const rename = (dispatch: Dispatch, state: State) => (oldName: string) => (
  newName: string,
  deleteOrigin: boolean
): void => {
  if (oldName === newName) return;

  const tbls = selectors.getTBLs(state.repositories);
  const filteredByName = selectors.filterByName(tbls, oldName);
  const sortedByCreated = selectors.sortByCreated(filteredByName, true);

  if (sortedByCreated.length === 0) return;

  const initCreated = generateTimestamp();
  const newTBLs = sortedByCreated.map(
    (tbl, i): TBL => ({
      ...tbl,
      id: generateId(),
      name: newName,
      created: deleteOrigin ? tbl.created : initCreated + i
    })
  );

  newTBLs.forEach(e => {
    dispatch(actions.create({ tbl: e }));
  });

  if (deleteOrigin) {
    sortedByCreated.forEach(tbl => dispatch(actions.remove({ id: tbl.id })));
  }

  const index = sortedByCreated.findIndex(byId(state.editors.selectedTBL.id));
  if (index !== -1) {
    editorOperations.setEditTBL(dispatch)(newTBLs[index]);
  }
};

const removeById = (dispatch: Dispatch, state: State) => {
  return (id: string): void => {
    dispatch(actions.remove({ id }));

    if (state.editors.selectedTBL.id === id) {
      editorOperations.clearEditTBL(dispatch)();
      ttOperations.selectTimeTable(dispatch)("");
    }
  };
};

const removeByName = (dispatch: Dispatch, state: State) => {
  return (name: string): void => {
    const tbls = selectors.getTBLs(state.repositories);
    const deleteTBLs = selectors.filterByName(tbls, name);

    deleteTBLs.forEach(tbl => {
      const { id } = tbl;

      dispatch(actions.remove({ id }));

      if (state.editors.selectedTBL.id === id) {
        editorOperations.clearEditTBL(dispatch)();
        ttOperations.selectTimeTable(dispatch)("");
      }
    });
  };
};

const updateSearchFileName = (dispatch: Dispatch) => {
  return (fileName: string): void => {
    dispatch(actions.updateSearchFileName({ fileName }));
  };
};

const updateCheckFileName = (dispatch: Dispatch) => {
  return (fileName: string): void => {
    dispatch(actions.updateCheckFileName({ fileName }));
  };
};

const setHistorySize = (dispatch: Dispatch) => {
  return (historySize: number): void => {
    dispatch(actions.setHistorySize({ historySize }));
  };
};

export default {
  create,
  read,
  save,
  rename,
  removeById,
  removeByName,
  updateSearchFileName,
  updateCheckFileName,
  setHistorySize
};
