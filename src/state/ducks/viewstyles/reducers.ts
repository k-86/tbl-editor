import { reducerWithInitialState } from "typescript-fsa-reducers";
import produce from "immer";
import actions from "./actions";
import { ViewStyleState as State } from "./types";

const initialState: State = {
  viewerHeight: 300,
  textEditorRow: 15,
  appGridRow: 5
};

/* eslint-disable no-param-reassign */
const reducer = reducerWithInitialState<State>(initialState)
  .case(actions.setViewerHeight, (state, payload) =>
    produce(state, draft => {
      draft.viewerHeight = payload.height;
    })
  )
  .case(actions.setTextEditorRow, (state, payload) =>
    produce(state, draft => {
      draft.textEditorRow = payload.row;
    })
  )
  .case(actions.setAppGridRow, (state, payload) =>
    produce(state, draft => {
      draft.appGridRow = payload.size;
    })
  )
  .build();

export default reducer;
