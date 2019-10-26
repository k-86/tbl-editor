import selectors from "./selectors";
import { createInitialState, shuffle } from "../testUtils";
import { TBL } from "./types";

const createTBL = (name: string, created: number): TBL => ({
  id: `id_${name}`,
  name,
  data: `data_${name}`,
  created
});

describe("repositories selectors", (): void => {
  it("getTBLs", () => {
    const { repositories: state } = createInitialState();
    const tbls = shuffle([
      createTBL("a", 1),
      createTBL("b", 2),
      createTBL("c", 3),
      createTBL("a", 4),
      createTBL("a", 5),
      createTBL("b", 6),
      createTBL("c", 7)
    ]);

    state.tbls = tbls;

    expect(selectors.getTBLs(state)).toStrictEqual(tbls);
  });

  it("sortByCreated ASC", () => {
    const tbls = [
      createTBL("a", 1),
      createTBL("b", 2),
      createTBL("c", 3),
      createTBL("a", 4),
      createTBL("a", 5),
      createTBL("b", 6),
      createTBL("c", 7)
    ];

    expect(selectors.sortByCreated(shuffle(tbls), true)).toStrictEqual(tbls);
  });

  it("sortByCreated DESC", () => {
    const tbls = [
      createTBL("a", 1),
      createTBL("b", 2),
      createTBL("c", 3),
      createTBL("a", 4),
      createTBL("a", 5),
      createTBL("b", 6),
      createTBL("c", 7)
    ].reverse();

    expect(selectors.sortByCreated(shuffle(tbls), false)).toStrictEqual(tbls);
  });

  it("removeDuplicateName", () => {
    const tbls = [
      createTBL("a", 1),
      createTBL("b", 2),
      createTBL("c", 3),
      createTBL("a", 4),
      createTBL("a", 5),
      createTBL("b", 6),
      createTBL("c", 7)
    ];

    expect(selectors.removeDuplicateName(tbls)).toStrictEqual(tbls.slice(0, 3));
  });

  it("filterByIncludeName", () => {
    const tbls = [
      createTBL("aaa", 1),
      createTBL("bbb", 2),
      createTBL("ccc", 3),
      createTBL("abc", 4),
      createTBL("bcd", 5)
    ];

    expect(selectors.filterByIncludeName(tbls, "")).toStrictEqual(tbls);
    expect(selectors.filterByIncludeName(tbls, "a")).toStrictEqual([
      createTBL("aaa", 1),
      createTBL("abc", 4)
    ]);
    expect(selectors.filterByIncludeName(tbls, "aa")).toStrictEqual([
      createTBL("aaa", 1)
    ]);
    expect(selectors.filterByIncludeName(tbls, "b")).toStrictEqual([
      createTBL("bbb", 2),
      createTBL("abc", 4),
      createTBL("bcd", 5)
    ]);
    expect(selectors.filterByIncludeName(tbls, "bb")).toStrictEqual([
      createTBL("bbb", 2)
    ]);
    expect(selectors.filterByIncludeName(tbls, "bc")).toStrictEqual([
      createTBL("abc", 4),
      createTBL("bcd", 5)
    ]);
    expect(selectors.filterByIncludeName(tbls, "c")).toStrictEqual([
      createTBL("ccc", 3),
      createTBL("abc", 4),
      createTBL("bcd", 5)
    ]);
  });

  it("filterByIncludeName", () => {
    const tbls = [
      createTBL("a", 1),
      createTBL("aa", 2),
      createTBL("aaa", 3),
      createTBL("a", 4),
      createTBL("aa", 5)
    ];

    expect(selectors.filterByName(tbls, "")).toStrictEqual([]);
    expect(selectors.filterByName(tbls, "b")).toStrictEqual([]);

    expect(selectors.filterByName(tbls, "a")).toStrictEqual([
      createTBL("a", 1),
      createTBL("a", 4)
    ]);
    expect(selectors.filterByName(tbls, "aa")).toStrictEqual([
      createTBL("aa", 2),
      createTBL("aa", 5)
    ]);
    expect(selectors.filterByName(tbls, "aaa")).toStrictEqual([
      createTBL("aaa", 3)
    ]);
    expect(selectors.filterByName(tbls, "aaaa")).toStrictEqual([]);
  });

  it("findById", (): void => {
    const tbls = shuffle([
      ...[1, 2, 3, 4, 5].map(e => createTBL(e.toString(), e))
    ]);

    expect(selectors.findById(tbls, "")).toBe(undefined);
    expect(selectors.findById(tbls, "id_")).toBe(undefined);

    [1, 2, 3, 4, 5].forEach(e => {
      expect(selectors.findById(tbls, `id_${e}`)).toStrictEqual(
        createTBL(e.toString(), e)
      );
    });
  });

  it("isCreateFileNameEmpty", () => {
    const { repositories: state } = createInitialState();

    state.checkFileName = "";
    expect(selectors.isCreateFileNameEmpty(state)).toBe(true);

    state.checkFileName = "a";
    expect(selectors.isCreateFileNameEmpty(state)).toBe(false);
  });

  it("isAlreadyToUseCreateFile", () => {
    const { repositories: state } = createInitialState();
    state.tbls.push({
      id: "id_test",
      name: "test",
      data: "data",
      created: 0
    });

    state.checkFileName = "test";
    expect(selectors.isAlreadyToUseCreateFile(state)).toBe(true);

    state.checkFileName = "a";
    expect(selectors.isAlreadyToUseCreateFile(state)).toBe(false);

    state.checkFileName = "";
    expect(selectors.isAlreadyToUseCreateFile(state)).toBe(false);
  });
});
