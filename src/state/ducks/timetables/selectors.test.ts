import {
  convertDayOfWeek,
  getDescriptionDict,
  getTitles,
  getDayOfWeeks,
  getTTMinutes,
  getTimeTable,
  removeComment,
  splitTBL
} from "./selectors";

describe("timetables/selectors", (): void => {
  const timetableDef = `a:新木場;木
b:大崎;崎
c:快速;快
d:通勤快速;通
e:普通;普

`;

  const timetableA = `[MON][TUE][WED][THU][FRI]
# 新宿 大崎方面(平日)
7: ea10 ea22 da33 da44 ea50 ea57
8: da00 ea08 ea10 da17 ea20 ea26 ea28 da31 ea38 da44 ea53 ea58
9: ea09 da13 ea22 da28 ea42 ea54

`;

  const timetableB = `[SAT]
# 新宿 大崎方面(土)
7: ea09 ea21 ea33 ca45 ea56
8: ca08 ea18 ea33 ca47 ea55
9: ca08 ea21 ca28 ea35 ca48

`;

  const timetableC = `[SUN][HOL]
# 新宿 大崎方面(休日)
7: ea09 ea21 ea33 ca45 ea56
8: ca08 ea18 ea33 ca47 ea55
9: ca08 ea21 ca28 ea35 ca48

`;

  it("getDescriptionDict", (): void => {
    expect(getDescriptionDict("")).toStrictEqual({});

    const input = `a:新木場;木
b:大崎;崎
c:快速;快
d:通勤快速;通
e:普通;普

A:a;aa;aaa
B:b;bb;bbb;bbbb
C:
D:d
`;
    const result = getDescriptionDict(input);

    expect(result.a).toStrictEqual(["新木場", "木"]);
    expect(result.b).toStrictEqual(["大崎", "崎"]);
    expect(result.c).toStrictEqual(["快速", "快"]);
    expect(result.d).toStrictEqual(["通勤快速", "通"]);
    expect(result.e).toStrictEqual(["普通", "普"]);
    expect(result.f).toBe(undefined);
    expect(result.A).toStrictEqual(["a", "aa", "aaa"]);
    expect(result.B).toStrictEqual(["b", "bb", "bbb", "bbbb"]);
    expect(result.C).toStrictEqual([""]);
    expect(result.D).toStrictEqual(["d"]);
    expect(result.E).toBe(undefined);
    expect(result["Illegal Description"]).toBe(undefined);
  });

  it("duplicateDescription", (): void => {
    const input = `
a:A0
b:B0
c:C0
`;

    const duplicate = `
a:A1
b:B1
c:C1

a:A2
b:B2
c:C2
`;

    const result = getDescriptionDict(removeComment(input + duplicate));

    expect(result.a).toStrictEqual(["A0"]);
    expect(result.b).toStrictEqual(["B0"]);
    expect(result.c).toStrictEqual(["C0"]);

    expect(result["Illegal Description"]).toStrictEqual(
      duplicate.split(/\r\n|\n/).filter((e): boolean => e.length !== 0)
    );
  });

  it("IllegalDescription", (): void => {
    const input = `-:e-
!:e!

a:b:c
c:dd:e:ff

aa:eaa
ab:eab
bbb:ebbb
Aa:eAa
bC:ebC

 a:e_a
  a:e__a
B a:eB_a
cc :ecc_`;

    const result = getDescriptionDict(removeComment(input));

    removeComment(input)
      .split(/\r\n|\n/)
      .map((str): string => str.split(":")[0])
      .forEach((e): void => {
        expect(result[e]).toBe(undefined);
      });

    expect(result["Illegal Description"]).toStrictEqual(
      input.split(/\r\n|\n/).filter((e): boolean => e.length !== 0)
    );
  });

  it("getTitles", (): void => {
    expect(getTitles(timetableA)).toStrictEqual(["新宿 大崎方面(平日)"]);
    expect(getTitles(timetableB)).toStrictEqual(["新宿 大崎方面(土)"]);
    expect(getTitles(timetableC)).toStrictEqual(["新宿 大崎方面(休日)"]);

    const input = timetableDef + timetableA + timetableB + timetableC;
    const res = [
      "新宿 大崎方面(平日)",
      "新宿 大崎方面(土)",
      "新宿 大崎方面(休日)"
    ];

    expect(getTitles(input)).toStrictEqual(res);
    expect(getTitles(removeComment(input))).toStrictEqual(res);
  });

  it("duplicateTitle", (): void => {
    expect(getTitles(timetableA + timetableA)).toStrictEqual([
      "新宿 大崎方面(平日)",
      "Duplicate:新宿 大崎方面(平日)"
    ]);

    expect(getTitles(timetableA + timetableB + timetableA)).toStrictEqual([
      "新宿 大崎方面(平日)",
      "新宿 大崎方面(土)",
      "Duplicate:新宿 大崎方面(平日)"
    ]);
  });

  it("emptyTitle", (): void => {
    const res = ["Not found title"];

    expect(getTitles(timetableDef)).toStrictEqual(res);

    expect(getTitles(timetableDef + timetableDef)).toStrictEqual(res);
    expect(getTitles(";# test\n".repeat(5))).toStrictEqual(res);
  });

  it("getDayOfWeeks", (): void => {
    expect(getDayOfWeeks(timetableA).map(convertDayOfWeek)).toStrictEqual([
      "[月] [火] [水] [木] [金]"
    ]);
    expect(getDayOfWeeks(timetableB).map(convertDayOfWeek)).toStrictEqual([
      "[土]"
    ]);
    expect(getDayOfWeeks(timetableC).map(convertDayOfWeek)).toStrictEqual([
      "[日] [祝]"
    ]);

    expect(
      getDayOfWeeks(timetableDef + timetableA + timetableB + timetableC).map(
        convertDayOfWeek
      )
    ).toStrictEqual(["[月] [火] [水] [木] [金]", "[土]", "[日] [祝]"]);
  });

  it("emptyDayOfWeeks", (): void => {
    const res = ["[Not found day of week]"];

    expect(getDayOfWeeks("").map(convertDayOfWeek)).toStrictEqual(res);
    expect(getDayOfWeeks(timetableDef).map(convertDayOfWeek)).toStrictEqual(
      res
    );
    expect(
      getDayOfWeeks(";[SAT][SUN][HOL]\n".repeat(5)).map(convertDayOfWeek)
    ).toStrictEqual(res);
  });

  it("illegalDayOfWeeks", (): void => {
    const input = `[MOn][TuE][Wed][tHU][fRi][saT][sun][HOLIDAY]
# 新宿 大崎方面(平日)
7: ea10 ea22 da33 da44 ea50 ea57
8: da00 ea08 ea10 da17 ea20 ea26 ea28 da31 ea38 da44 ea53 ea58
9: ea09 da13 ea22 da28 ea42 ea54
`;

    expect(getDayOfWeeks(input).map(convertDayOfWeek)).toStrictEqual([
      "[MOn?] [TuE?] [Wed?] [tHU?] [fRi?] [saT?] [sun?] [HOLIDAY?]"
    ]);
  });

  it("getTTMinutes", (): void => {
    expect(getTTMinutes(" ca00 da05 ea19 cb30 db45 eb59")).toStrictEqual([
      { descriptions: "ca", minute: "00" },
      { descriptions: "da", minute: "05" },
      { descriptions: "ea", minute: "19" },
      { descriptions: "cb", minute: "30" },
      { descriptions: "db", minute: "45" },
      { descriptions: "eb", minute: "59" }
    ]);
  });

  it("getTTMinuteInputEmptyString", (): void => {
    const res = [
      {
        minute: "Undefined",
        descriptions: ""
      }
    ];

    expect(getTTMinutes("")).toStrictEqual(res);
    expect(getTTMinutes(" ")).toStrictEqual(res);
    expect(getTTMinutes("  ")).toStrictEqual(res);
  });

  it("duplicateMinute", (): void => {
    expect(getTTMinutes(" ca00 da05 ea00 cb30 db05 eb00")).toStrictEqual([
      { descriptions: "ca", minute: "00" },
      { descriptions: "da", minute: "05" },
      { descriptions: "ea", minute: "Duplicate:00" },
      { descriptions: "cb", minute: "30" },
      { descriptions: "db", minute: "Duplicate:05" },
      { descriptions: "eb", minute: "Duplicate:00" }
    ]);
  });

  it("notNumberMinute", (): void => {
    const i = "Illegal minute:";

    expect(
      getTTMinutes("60 99 ab ab0c abc0 abcde 59abc 1234567")
    ).toStrictEqual([
      { descriptions: "", minute: `${i}60` },
      { descriptions: "", minute: `${i}99` },
      { descriptions: "", minute: `${i}ab` },
      { descriptions: "ab", minute: `${i}0c` },
      { descriptions: "ab", minute: `${i}c0` },
      { descriptions: "abc", minute: `${i}de` },
      { descriptions: "59a", minute: `${i}bc` },
      { descriptions: "12345", minute: `${i}67` }
    ]);
  });

  it("createTimeTable", (): void => {
    const result = getTimeTable(timetableA);

    expect(result.title).toBe("新宿 大崎方面(平日)");
    expect(result.dayOfWeek).toStrictEqual("[月] [火] [水] [木] [金]");

    expect(result.hours.length).toBe(3);
    expect(result.hours[0].hour).toBe("7");
    expect(result.hours[1].hour).toBe("8");
    expect(result.hours[2].hour).toBe("9");

    expect(result.hours[0].minutes).toStrictEqual(
      getTTMinutes(" ea10 ea22 da33 da44 ea50 ea57")
    );
    expect(result.hours[1].minutes).toStrictEqual(
      getTTMinutes(
        " da00 ea08 ea10 da17 ea20 ea26 ea28 da31 ea38 da44 ea53 ea58"
      )
    );
    expect(result.hours[2].minutes).toStrictEqual(
      getTTMinutes(" ea09 da13 ea22 da28 ea42 ea54")
    );
  });

  it("duplicateHourTimeTable", (): void => {
    const duplicateHour = `[MON][TUE][WED][THU][FRI]
# 新宿 大崎方面(平日)
7: ea10 ea22 da33 da44 ea50 ea57
8: da00 ea08 ea10 da17 ea20 ea26 ea28 da31 ea38 da44 ea53 ea58
7: ea09 da13 ea22 da28 ea42 ea54

`;
    const result = getTimeTable(duplicateHour);

    expect(result.title).toBe("新宿 大崎方面(平日)");
    expect(result.dayOfWeek).toStrictEqual("[月] [火] [水] [木] [金]");

    expect(result.hours.length).toBe(3);
    expect(result.hours[0].hour).toBe("7");
    expect(result.hours[1].hour).toBe("8");
    expect(result.hours[2].hour).toBe("Duplicate:7");
  });

  it("getTimeTable if input is empty", (): void => {
    expect(getTimeTable("")).toStrictEqual({
      title: "タイトル",
      dayOfWeek: "曜日",
      hours: []
    });
  });

  it("getTimeTable if title is empty", (): void => {
    const input = timetableA.replace(/^#.+/m, "");
    const res = { ...getTimeTable(timetableA), title: "Not found title" };

    expect(getTimeTable(input)).toStrictEqual(res);
  });

  it("getTimeTable if title has many", (): void => {
    const input = timetableA.replace(/^#.+/m, "# title1\n# title2\n# title3\n");
    const res = {
      ...getTimeTable(timetableA),
      title: "title1, title2, title3"
    };

    expect(getTimeTable(input)).toStrictEqual(res);
  });

  it("getTimeTable if dayOfWeek is empty", (): void => {
    const input = timetableA.replace(/^\[.+\]$/gm, "");
    const res = {
      ...getTimeTable(timetableA),
      dayOfWeek: "[Not found day of week]"
    };

    expect(getTimeTable(input)).toStrictEqual(res);
  });

  it("getTimeTable if time data is empty", (): void => {
    const input = "[SAT][SUN][HOL]\n# test title\n";
    const res = {
      title: "test title",
      dayOfWeek: "[土] [日] [祝]",
      hours: []
    };

    expect(getTimeTable(input)).toStrictEqual(res);
  });

  it("convertTBL", (): void => {
    const input = timetableDef + timetableA + timetableB + timetableC;
    const { descriptionStr, timeTableStrList } = splitTBL(input);

    const descriptionDict = getDescriptionDict(descriptionStr);
    const timeTables = timeTableStrList.map(getTimeTable);

    expect(Object.keys(descriptionDict).length).toBe(5);
    expect(descriptionDict).toStrictEqual(getDescriptionDict(timetableDef));

    expect(timeTables.length).toBe(3);
    expect(timeTables[0]).toStrictEqual(getTimeTable(timetableA));
    expect(timeTables[1]).toStrictEqual(getTimeTable(timetableB));
    expect(timeTables[2]).toStrictEqual(getTimeTable(timetableC));
  });

  it("convertTBLWithoutDescriptions", (): void => {
    const input = timetableA + timetableB + timetableC;
    const { descriptionStr, timeTableStrList } = splitTBL(input);

    const descriptionDict = getDescriptionDict(descriptionStr);
    const timeTables = timeTableStrList.map(getTimeTable);

    expect(Object.keys(descriptionDict).length).toBe(0);

    expect(timeTables.length).toBe(3);
    expect(timeTables[0]).toStrictEqual(getTimeTable(timetableA));
    expect(timeTables[1]).toStrictEqual(getTimeTable(timetableB));
    expect(timeTables[2]).toStrictEqual(getTimeTable(timetableC));
  });

  it("removeComment", (): void => {
    const input = `;
;comment
\u3000
a:test
\u3000 
 b:illegal def


[MON][SAT]
\u3000 \u3000

# title
\u3000\u3000
10:ea11
 4:ea12
 \u3000 \u3000 
\u3000zenkaku
 hankaku
`;

    const result = `a:test
 b:illegal def
[MON][SAT]
# title
10:ea11
 4:ea12
\u3000zenkaku
 hankaku
`;

    expect(removeComment(input)).toBe(result);
  });
});
