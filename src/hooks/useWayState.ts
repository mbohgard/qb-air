import { useQueryState } from "./useQueryState";

export const useWayState = (key: string, initialValue = "one-way") => {
  const [way, setWay] = useQueryState(key, initialValue, {
    pattern: "^one-way|two-way$",
  });

  return [way, setWay] as const;
};
