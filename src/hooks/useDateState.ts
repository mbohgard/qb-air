import dayjs from "dayjs";
import { useQueryState } from "./useQueryState";

const today = dayjs().format("YYYY-MM-DD");

export const useDateState = (key: string, initialValue = today) => {
  const [date, setDate] = useQueryState(key, initialValue, {
    pattern: "^\\d{4}-\\d{2}-\\d{2}$",
  });

  return [date, setDate, today] as const;
};
