import type { FC } from "react";
import { Button } from "../atoms/Button";

type Props = {
  a: string;
  b: string;
  selected: "a" | "b";
  onToggle?: (value: "a" | "b") => void;
};

export const Toggle: FC<Props> = ({ a, b, onToggle, selected }) => {
  return (
    <fieldset>
      <Button
        role="radio"
        rounded="left"
        variant="secondary"
        mode={selected === "a" ? "highlighted" : "dimmed"}
        onClick={() => onToggle?.("a")}
      >
        {a}
      </Button>
      <Button
        role="radio"
        rounded="right"
        variant="secondary"
        mode={selected === "b" ? "highlighted" : "dimmed"}
        onClick={() => onToggle?.("b")}
      >
        {b}
      </Button>
    </fieldset>
  );
};
