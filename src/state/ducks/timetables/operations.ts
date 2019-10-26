import { Dispatch } from "redux";
import actions from "./actions";

const selectTimeTable = (dispatch: Dispatch) => {
  return (dayOfWeek: string): void => {
    dispatch(actions.selectTimeTable({ dayOfWeek }));
  };
};

export default {
  selectTimeTable
};
