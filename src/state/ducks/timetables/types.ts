export interface DescriptionDictionary {
  [key: string]: string[];
}

export interface TTMinute {
  minute: string;
  descriptions: string;
}

export interface TTHour {
  hour: string;
  minutes: TTMinute[];
}

export interface TimeTable {
  title: string;
  dayOfWeek: string;
  hours: TTHour[];
}

export interface TimeTableState {
  selectDayOfWeek: string;
}
