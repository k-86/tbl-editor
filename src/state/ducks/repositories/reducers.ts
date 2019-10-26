import { reducerWithInitialState } from "typescript-fsa-reducers";
import produce from "immer";
import { RepositoryState as State } from "./types";
import actions from "./actions";
import { generateId, generateTBLData, generateTimestamp } from "./utils";

const initialState: State = {
  searchFileName: "",
  checkFileName: "",
  tbls: [
    {
      id: generateId(),
      name: "新宿-大崎",
      data: generateTBLData("新宿-大崎"),
      created: generateTimestamp()
    }
  ],
  historySize: 10
};

/* eslint-disable no-param-reassign */
const reducer = reducerWithInitialState<State>(initialState)
  .case(actions.create, (state, payload) =>
    produce(state, draft => {
      draft.checkFileName = "";
      draft.tbls.push({ ...payload.tbl });
    })
  )
  .case(actions.remove, (state, payload) =>
    produce(state, draft => {
      const newTbls = draft.tbls.filter(e => e.id !== payload.id);
      draft.tbls = newTbls;
    })
  )
  .case(actions.updateSearchFileName, (state, payload) =>
    produce(state, draft => {
      draft.searchFileName = payload.fileName;
    })
  )
  .case(actions.updateCheckFileName, (state, payload) =>
    produce(state, draft => {
      draft.checkFileName = payload.fileName;
    })
  )
  .case(actions.setHistorySize, (state, payload) =>
    produce(state, draft => {
      draft.historySize = payload.historySize;
    })
  )
  .build();

export default reducer;
