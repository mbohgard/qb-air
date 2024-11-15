import { Toggle } from "../components/molecules/Toggle";
import { useQueryState } from "../hooks/useQueryState";

export const WayToggle = () => {
  const [way, setWay] = useQueryState<"one-way" | "two-way">("way", "one-way");

  return (
    <Toggle
      a="One-way"
      b="Two-way"
      selected={way === "one-way" ? "a" : "b"}
      onToggle={(val) => {
        setWay(val === "a" ? "one-way" : "two-way");
      }}
    />
  );
};
