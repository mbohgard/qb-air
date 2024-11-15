import type { FC } from "react";
import { Button } from "../atoms/Button";

type Props = {
  a: string;
  b: string;
  selected: "a" | "b";
  onToggle?: (value: "a" | "b") => void;
};

export const Toggle: FC<Props> = ({ a, b, onToggle, selected }) => (
  <fieldset>
    <Button
      role="radio"
      rounded="left"
      variant="secondary"
      aria-checked={selected === "a"}
      mode={selected === "a" ? "highlighted" : "dimmed"}
      onClick={() => onToggle?.("a")}
    >
      {a}
    </Button>
    <Button
      role="radio"
      rounded="right"
      variant="secondary"
      aria-checked={selected === "b"}
      mode={selected === "b" ? "highlighted" : "dimmed"}
      onClick={() => onToggle?.("b")}
    >
      {b}
    </Button>
  </fieldset>
);
