import uuidV4 from "uuid/v4";
import { TBL } from "./types";

const templateTBL = `
;「;」から始まる行はコメント行です
;「駅.Locky」「時刻表.Locky」に対応したTBLファイルの作成方法は
;https://ekilocky.hatenablog.jp/entry/20091001/1254389719
;をご覧ください
;以下、TBLファイルの例

a:新木場;木
b:大崎;崎
c:快速;快
d:通勤快速;通
e:普通;普

[MON][TUE][WED][THU][FRI]
# 新宿 大崎方面(平日)
7: ea10 ea22 da33 da44 ea50 ea57
8: da00 ea08 ea10 da17 ea20 ea26 ea28 da31 ea38 da44 ea53 ea58
9: ea09 da13 ea22 da28 ea42 ea54
10: ea03 da26 ca50
11: ca06 ca26 ca48
12: ca07 ca25 ca50
13: ca07 ca25 ca48
14: ca06 ca25 ca48
15: ca06 ca26 ca50
16: ca05 ca25 ea38 ca48
17: ea03 ca06 ea12 ca25 ea29 ea49 ea56
18: ea06 ea14 ea25 ea38 ea44 ea55
19: ea03 ea13 ea27 ea35 ea48
20: da01 ea10 da22 ea40 ea50 da57
21: ea11 ea23 ea33 ea45 ea56
22: ea05 ea16 ea28 ea40 ea51
23: ea03 da17 eb31

[SAT][SUN][HOL]
# 新宿 大崎方面(土休日)
7: ea09 ea21 ea33 ca45 ea56
8: ca08 ea18 ea33 ca47 ea55
9: ca08 ea21 ca28 ea35 ca48
10: ea03 ca27 ca50
11: ca06 ca27 ca49
12: ca07 ca26 ca50
13: ca06 ca26 ca48
14: ca06 ca26 ca48
15: ca06 ca27 ca50
16: ca06 ca25 ea36 ca48
17: ca05 ea18 ca27 ea44 ea51 ea56
18: ea15 ca26 ca45
19: ea00 ea13 ca27 ca48
20: ea00 ea20 ea38 ea55
21: ea08 ea23 ea41 ea57
22: ea10 ea22 ea46
23: ea01 ea18 eb31
`;

export const generateId = (): string => uuidV4();

export const generateTBLData = (name: string): string =>
  `;ファイル名 : ${name}${templateTBL}`;

export const generateTimestamp = (): number => Date.now();

export const byId = (id: string) => (e: TBL): boolean => e.id === id;
export const byName = (name: string) => (e: TBL): boolean => e.name === name;
export const includeName = (name: string) => (e: TBL): boolean =>
  e.name.includes(name);
