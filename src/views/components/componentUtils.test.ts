import { convertDescriptions, getColorCode } from "./componentUtils";

describe("views-util", (): void => {
  it("convertDescriptions", (): void => {
    const dict = { a: ["a1"], b: ["b1", "b2"], A: ["A1", "A2", "A3"] };

    const nc = ["Not found:c"];
    const nB = ["Not found:B"];

    expect(convertDescriptions("", dict)).toStrictEqual([]);
    expect(convertDescriptions("a", dict)).toStrictEqual([dict.a]);
    expect(convertDescriptions("ab", dict)).toStrictEqual([dict.a, dict.b]);
    expect(convertDescriptions("abA", dict)).toStrictEqual([
      dict.a,
      dict.b,
      dict.A
    ]);
    expect(convertDescriptions("aa", dict)).toStrictEqual([dict.a, dict.a]);
    expect(convertDescriptions("aba", dict)).toStrictEqual([
      dict.a,
      dict.b,
      dict.a
    ]);
    expect(convertDescriptions("ababAabA", dict)).toStrictEqual([
      dict.a,
      dict.b,
      dict.a,
      dict.b,
      dict.A,
      dict.a,
      dict.b,
      dict.A
    ]);

    expect(convertDescriptions("c", dict)).toStrictEqual([nc]);
    expect(convertDescriptions("ac", dict)).toStrictEqual([dict.a, nc]);
    expect(convertDescriptions("abc", dict)).toStrictEqual([
      dict.a,
      dict.b,
      nc
    ]);
    expect(convertDescriptions("abAc", dict)).toStrictEqual([
      dict.a,
      dict.b,
      dict.A,
      nc
    ]);
    expect(convertDescriptions("ca", dict)).toStrictEqual([nc, dict.a]);
    expect(convertDescriptions("cab", dict)).toStrictEqual([
      nc,
      dict.a,
      dict.b
    ]);

    expect(convertDescriptions("B", dict)).toStrictEqual([nB]);
    expect(convertDescriptions("aB", dict)).toStrictEqual([dict.a, nB]);
    expect(convertDescriptions("abB", dict)).toStrictEqual([
      dict.a,
      dict.b,
      nB
    ]);
    expect(convertDescriptions("abAB", dict)).toStrictEqual([
      dict.a,
      dict.b,
      dict.A,
      nB
    ]);
    expect(convertDescriptions("Ba", dict)).toStrictEqual([nB, dict.a]);
    expect(convertDescriptions("Bab", dict)).toStrictEqual([
      nB,
      dict.a,
      dict.b
    ]);

    expect(convertDescriptions("cB", dict)).toStrictEqual([nc, nB]);
    expect(convertDescriptions("acB", dict)).toStrictEqual([dict.a, nc, nB]);
    expect(convertDescriptions("acbB", dict)).toStrictEqual([
      dict.a,
      nc,
      dict.b,
      nB
    ]);
    expect(convertDescriptions("aBbcA", dict)).toStrictEqual([
      dict.a,
      nB,
      dict.b,
      nc,
      dict.A
    ]);
    expect(convertDescriptions("BcBc", dict)).toStrictEqual([nB, nc, nB, nc]);
    expect(convertDescriptions("aBbcABac", dict)).toStrictEqual([
      dict.a,
      nB,
      dict.b,
      nc,
      dict.A,
      nB,
      dict.a,
      nc
    ]);
  });

  it("getColorCode", (): void => {
    const correctData = ["#0a1c9f", "#Abc3Fc", "#F9012b", "#afdcbf", "#987345"];

    correctData.forEach((data): void => {
      expect(getColorCode([data])).toBe(data);
      expect(getColorCode(["test", data])).toBe(data);
      expect(getColorCode(["test", "tt", data])).toBe(data);
      expect(getColorCode(["test", "#ffffff", data])).toBe(data);
      expect(getColorCode(["test", data, "#ffffff"])).toBe("#ffffff");

      expect(getColorCode([data, "test"])).toBe(undefined);
      expect(getColorCode(["test", data, "tt"])).toBe(undefined);
    });

    const errorData = [
      "#339",
      "#251",
      "#aaa",
      "#fff",
      "#AAA",
      "#cdf",
      "#9af#f6f",
      "339",
      "621345",
      "af89f8",
      "#ggg",
      "#fgf",
      "#delcmi",
      "#3r9",
      "#-12345",
      "#jjjjjj",
      "#aaaaaaa",
      "jkhfng",
      "ff8iju"
    ];

    errorData.forEach((data): void => {
      expect(getColorCode([data])).toBe(undefined);
      expect(getColorCode(["test", data])).toBe(undefined);
      expect(getColorCode(["test", "tt", data])).toBe(undefined);
      expect(getColorCode(["test", "#ffffff", data])).toBe(undefined);
      expect(getColorCode(["test", data, "#ffffff"])).toBe("#ffffff");

      expect(getColorCode([data, "test"])).toBe(undefined);
      expect(getColorCode(["test", data, "tt"])).toBe(undefined);
    });
  });
});
