import type { FC } from "react";
import { Input } from "../components/atoms/Input";
import { displayDate, nextDay } from "../utils/date";
import dayjs from "dayjs";
import { useQueryState } from "../hooks/useQueryState";

const today = displayDate();

export const Departure: FC<Props> = () => {
  const [date, setDate] = useQueryState("departure", today);

  return (
    <Input
      type="date"
      label="Departure"
      value={date}
      min={today}
      onChange={(e) => setDate(e.target.value)}
    />
  );
};

export const Return: FC<Props> = () => {
  const [way] = useQueryState("way", "one-way");
  const [departure] = useQueryState<string>("departure", "");
  const [date, setDate] = useQueryState(
    "return",
    displayDate(dayjs().add(7, "day"))
  );

  return (
    <Input
      type="date"
      label="Return"
      value={date}
      disabled={way === "one-way"}
      min={nextDay(departure || today)}
      onChange={(e) => setDate(e.target.value)}
    />
  );
};
