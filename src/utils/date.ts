import dayjs, { type Dayjs } from "dayjs";

export const displayDate = (date?: Dayjs | string) =>
  dayjs(date).format("YYYY-MM-DD");
