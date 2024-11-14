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
        pressed={selected === "a"}
        onClick={() => onToggle?.("a")}
      >
        {a}
      </Button>
      <Button
        role="radio"
        rounded="right"
        variant="secondary"
        pressed={selected === "b"}
        onClick={() => onToggle?.("b")}
      >
        {b}
      </Button>
    </fieldset>
  );
};
