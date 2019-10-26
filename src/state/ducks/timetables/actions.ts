import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory("TIME_TABLE");

export const selectTimeTable = actionCreator<{
  dayOfWeek: string;
}>("SELECT_TIME_TABLE");

export default {
  selectTimeTable
};
