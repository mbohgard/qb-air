import { Input } from "../components/atoms/Input";
import { useQueryState } from "../hooks/useQueryState";
import { useEffect } from "react";
import dayjs from "dayjs";

const today = dayjs().format("YYYY-MM-DD");

export const Departure = () => {
  const [departureDate, setDepartureDate] = useQueryState("departure", today);

  return (
    <Input
      type="date"
      label="Departure"
      name="departure"
      value={departureDate}
      min={today}
      onChange={(e) => setDepartureDate(e.target.value)}
    />
  );
};

export const Return = () => {
  const [way] = useQueryState("way", "one-way");
  const [departureDate] = useQueryState("departure", today);
  const [returnDate, setReturnDate] = useQueryState("return", departureDate);

  // keep return date from being past departure date
  useEffect(() => {
    if (returnDate < departureDate) setReturnDate(departureDate);
  }, [returnDate, departureDate, setReturnDate]);

  return (
    <Input
      type="date"
      label="Return"
      name="return"
      value={returnDate}
      disabled={way === "one-way"}
      min={departureDate || today}
      onChange={(e) => setReturnDate(e.target.value)}
    />
  );
};
