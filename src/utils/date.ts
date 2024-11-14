import dayjs, { type Dayjs } from "dayjs";

export const displayDate = (date?: Dayjs) =>
  (date ?? dayjs()).format("YYYY-MM-DD");

export const nextDay = (date?: Dayjs | string) =>
  displayDate(dayjs(date ?? dayjs()).add(1, "day"));
