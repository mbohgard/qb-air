import { Toggle } from "../components/molecules/Toggle";
import { useWayState } from "../hooks/useWayState";

export const WayToggle = () => {
  const [way, setWay] = useWayState("way");

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
