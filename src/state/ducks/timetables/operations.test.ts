// eslint-disable-next-line import/no-extraneous-dependencies
import configureStore from "redux-mock-store";
import actions from "./actions";
import operations from "./operations";

const mockStore = configureStore([]);

describe("timetables operations", (): void => {
  it("setShowTimeTable", () => {
    const store = mockStore({});

    operations.selectTimeTable(store.dispatch)("[SAT][SUN][HOL]");

    expect(store.getActions()).toStrictEqual([
      actions.selectTimeTable({ dayOfWeek: "[SAT][SUN][HOL]" })
    ]);
  });
});
