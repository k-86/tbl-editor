import Encoding from "encoding-japanese";
import FileSaver from "file-saver";
import { types } from "../../state/ducks/timetables";

export const convertDescriptions = (
  input: string,
  descriptionDict: types.DescriptionDictionary
): string[][] =>
  Array.from(input).map(
    (e): string[] => descriptionDict[e] || [`Not found:${e}`]
  );

export const getColorCode = (description: string[]): string | undefined => {
  const res = description.slice(-1)[0].trim();

  if (res.match(/^#[\da-fA-F]{6}$/)) {
    return res;
  }

  return undefined;
};

const formatDigit = (input: number): string => `0${input}`.slice(-2);

export const convertTimeStamp = (utc: number): string => {
  const d = new Date(utc);

  const year = d.getFullYear();
  const month = formatDigit(d.getMonth() + 1);
  const day = formatDigit(d.getDate());
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];

  const hour = formatDigit(d.getHours());
  const minute = formatDigit(d.getMinutes());
  const second = formatDigit(d.getSeconds());

  const date = `${year}年${month}月${day}日(${dayOfWeek})`;
  const time = `${hour}:${minute}:${second}`;
  return `${date}${time}`;
};

export const handleExportTBL = (name: string, data: string): void => {
  const unicodeArray = Encoding.stringToCode(data);
  const sjisArray = Encoding.convert(unicodeArray, "SJIS", "UNICODE");
  const uint8Array = new Uint8Array(sjisArray);
  const blob = new Blob([uint8Array], {
    type: "text/plain;charset=shift_jis"
  });
  FileSaver.saveAs(blob, `${name}.TBL`);
};
