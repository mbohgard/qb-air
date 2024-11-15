import { Input } from "../components/atoms/Input";
import { displayDate } from "../utils/date";
import dayjs from "dayjs";
import { useQueryState } from "../hooks/useQueryState";
import { useEffect } from "react";

const today = displayDate();

export const Departure = () => {
  const [date, setDate] = useQueryState("departure", today);
  const [returnDate, setReturnDate] = useQueryState("return", today);

  useEffect(() => {
    if (returnDate < date) setReturnDate(date);
  }, [returnDate, date, setReturnDate]);

  return (
    <Input
      type="date"
      label="Departure"
      name="departure"
      value={date}
      min={today}
      onChange={(e) => setDate(e.target.value)}
    />
  );
};

export const Return = () => {
  const [way] = useQueryState("way", "one-way");
  const [departure] = useQueryState("departure", today);
  const [date, setDate] = useQueryState(
    "return",
    displayDate(dayjs(departure || undefined))
  );

  return (
    <Input
      type="date"
      label="Return"
      name="return"
      value={date}
      disabled={way === "one-way"}
      min={departure || today}
      onChange={(e) => setDate(e.target.value)}
    />
  );
};
