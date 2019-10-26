import { reducerWithInitialState } from "typescript-fsa-reducers";
import produce from "immer";
import actions from "./actions";
import { TimeTableState as State } from "./types";

/* eslint-disable no-param-reassign */
const reducer = reducerWithInitialState<State>({ selectDayOfWeek: "" })
  .case(actions.selectTimeTable, (state, payload) =>
    produce(state, draft => {
      draft.selectDayOfWeek = payload.dayOfWeek;
    })
  )
  .build();

export default reducer;
