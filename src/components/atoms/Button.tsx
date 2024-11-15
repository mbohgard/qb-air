import type { FC, PropsWithChildren } from "react";
import cn from "../../utils/cn";
import { swtch } from "../../utils/switch";

type Props = {
  rounded?: boolean | "left" | "right";
  variant?: "primary" | "secondary";
  flavour?: "default" | "success" | "danger" | "warning";
  mode?: "default" | "dimmed" | "highlighted";
} & JSX.IntrinsicElements["button"];

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  flavour = "default",
  mode = "default",
  rounded = true,
  type,
  variant = "primary",
  ...props
}) => {
  const _flavour =
    swtch(
      flavour,
      ["success", "bg-green-600"],
      ["danger", "bg-red-500"],
      ["warning", "bg-orange-500"]
    ) ?? "bg-gray-700";

  const _rounded =
    swtch(rounded, ["left", "rounded-l-xl"], ["right", "rounded-r-xl"]) ??
    "rounded-xl";

  const _mode =
    flavour === "default" &&
    swtch(
      mode,
      ["dimmed", "bg-gray-700 text-opacity-70"],
      ["highlighted", "bg-gray-900"]
    );

  return (
    <button
      {...props}
      className={cn(
        "px-4 py-2 font-bold text-white",
        variant === "secondary" && "text-xs uppercase",
        _flavour,
        _rounded,
        _mode,
        "disabled:opacity-70 disabled:cursor-not-allowed",
        props.className
      )}
      type={type || "button"}
    >
      {children}
    </button>
  );
};
