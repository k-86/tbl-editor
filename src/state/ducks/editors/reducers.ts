import { reducerWithInitialState } from "typescript-fsa-reducers";
import produce from "immer";
import { EditorState as State } from "./types";
import actions from "./actions";

export const initSelectedTBL = { id: "", name: "", data: "", created: -1 };
export const initEditData = "";

const initialState: State = {
  selectedTBL: initSelectedTBL,
  editData: initEditData
};

/* eslint-disable no-param-reassign */
const reducer = reducerWithInitialState<State>(initialState)
  .case(actions.setEditTBL, (state, payload) =>
    produce(state, draft => {
      draft.selectedTBL = payload.tbl;
    })
  )
  .case(actions.updateEditData, (state, payload) =>
    produce(state, draft => {
      draft.editData = payload.data;
    })
  )
  .build();

export default reducer;
