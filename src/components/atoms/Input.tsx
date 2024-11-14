import type { FC } from "react";
import cn from "../../utils/cn";

type Props = {
  label?: string;
} & JSX.IntrinsicElements["input"];

export const Input: FC<Props> = ({ label, ...props }) => {
  return (
    <label
      className={cn(
        "flex flex-col gap-1",
        props.disabled && "text-white text-opacity-30"
      )}
    >
      {label}
      <input
        type={props.type ?? "text"}
        {...props}
        className={cn(
          "rounded-md p-2 text-lg bg-gray-900 disabled:text-gray-500 disabled:opacity-70 invalid:bg-red-900",
          props.className
        )}
      />
    </label>
  );
};
