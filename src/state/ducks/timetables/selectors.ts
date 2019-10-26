import { DescriptionDictionary, TimeTable, TTMinute } from "./types";

export const getTitles = (input: string): string[] => {
  const datas = input.match(/^#.+/gm);
  if (!datas) {
    return ["Not found title"];
  }

  const res: string[] = [];

  datas.forEach((e): void => {
    const title = e // "# 新宿 大崎方面(平日)"
      .slice(1) // " 新宿 大崎方面(平日)"
      .trim(); // "新宿 大崎方面(平日)"

    if (res.find((t): boolean => t === title)) {
      res.push(`Duplicate:${title}`);
    } else {
      res.push(title);
    }
  });

  return res;
};

export const getDayOfWeeks = (input: string): string[] =>
  input.match(/^\[.+\]$/gm) || ["[NOT_FOUND]"];

const dayOfWeekDict: { [key: string]: string } = {
  MON: "月",
  TUE: "火",
  WED: "水",
  THU: "木",
  FRI: "金",
  SAT: "土",
  SUN: "日",
  HOL: "祝",
  NOT_FOUND: "Not found day of week"
};

export const convertDayOfWeek = (dayOfWeekStr: string): string => {
  const list = dayOfWeekStr // "[SAT][SUN][HOL]"
    .slice(1, -1) // "SAT][SUN][HOL"
    .split("][") // ["SAT", "SUN", "HOL"]
    .map((e: string): string => dayOfWeekDict[e] || `${e}?`); // ["土", "日", "祝"]

  return `[${list.reduce((sum, str): string => `${sum}] [${str}`)}]`;
};

export const getTTMinutes = (input: string): TTMinute[] => {
  const res: TTMinute[] = [];

  if (input.trim() === "") {
    res.push({
      minute: "Undefined",
      descriptions: ""
    });
    return res;
  }

  input // " ea10 ea22 da33 da44 ea50 ea57"
    .trim() // "ea10 ea22 da33 da44 ea50 ea57"
    .split(" ") // ["ea10", "ea22", "da33", "da44", "ea50", "ea57"]
    .forEach((e): void => {
      // v = "ea10"
      const minuteStr = e.slice(-2); // "10"
      const descsStr = e.slice(0, -2); // "ea"

      if (!/^[0-5]\d$/.test(minuteStr)) {
        res.push({
          minute: `Illegal minute:${minuteStr}`,
          descriptions: descsStr
        });
      } else if (res.find((t): boolean => t.minute === minuteStr)) {
        res.push({
          minute: `Duplicate:${minuteStr}`,
          descriptions: descsStr
        });
      } else {
        res.push({
          minute: minuteStr,
          descriptions: descsStr
        });
      }
    });

  return res;
};

export const getTimeTable = (input: string): TimeTable => {
  const res: TimeTable = {
    title: "タイトル",
    dayOfWeek: "曜日",
    hours: []
  };

  if (!input) {
    return res;
  }

  res.title = getTitles(input).reduce((sum, str): string => `${sum}, ${str}`);

  const [dayOfWeek] = getDayOfWeeks(input).map(convertDayOfWeek);
  res.dayOfWeek = dayOfWeek;

  const datas = input.match(/^\d{1,2}:($|.+)/gm);
  if (!datas) {
    return res;
  }

  datas.forEach((e): void => {
    // e = "7: ea10 ea22 da33 da44 ea50 ea57"
    const kv = e.split(":"); // ["7", " ea10 ea22 da33 da44 ea50 ea57"]

    if (res.hours.find((t): boolean => t.hour === kv[0])) {
      res.hours.push({
        hour: `Duplicate:${kv[0]}`,
        minutes: getTTMinutes(kv[1])
      });
    } else {
      res.hours.push({
        hour: kv[0],
        minutes: getTTMinutes(kv[1])
      });
    }
  });

  return res;
};

export const getDescriptionDict = (
  descriptionStr: string
): DescriptionDictionary => {
  const res: DescriptionDictionary = { "Illegal Description": [] };

  descriptionStr
    .split(/\r\n|\n/)
    .filter((e): boolean => e.length !== 0)
    .forEach((e): void => {
      const kv = e.split(":");
      if (kv.length !== 2) {
        res["Illegal Description"].push(e);
        return;
      }

      const key = kv[0];
      const values = kv[1]
        .split(";")
        .map((v): string => v.replace(/^(\s|\u3000)|(\s|\u3000)$/g, "_"));

      if (!key.match(/^[a-zA-Z]$/) || res[key]) {
        res["Illegal Description"].push(e);
        return;
      }

      res[key] = values;
    });

  if (res["Illegal Description"].length === 0) {
    delete res["Illegal Description"];
  }

  return res;
};

export const removeComment = (str: string): string =>
  str.replace(/^(;.*|(\s|\u3000)*)[\r\n]/gm, "");

export const splitTBL = (
  tbl: string
): { descriptionStr: string; timeTableStrList: string[] } => {
  const [descriptionStr, ...timeTableStrList] = removeComment(tbl)
    .replace(/^(\[.+\])$/gm, "@SPL@$1") // 曜日データの先頭に文字列を追加
    .split("@SPL@"); // 追加した文字列で分割

  return {
    descriptionStr,
    timeTableStrList
  };
};

export default {
  getDayOfWeeks,
  getDescriptionDict,
  getTimeTable,
  splitTBL
};
