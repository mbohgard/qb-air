import { Input } from "../components/atoms/Input";
import { useDateState } from "../hooks/useDateState";
import { useQueryState } from "../hooks/useQueryState";
import { useEffect } from "react";

export const Departure = () => {
  const [departureDate, setDepartureDate, today] = useDateState("departure");

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
  const [departureDate] = useDateState("departure");
  const [returnDate, setReturnDate, today] = useDateState(
    "return",
    departureDate
  );

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
