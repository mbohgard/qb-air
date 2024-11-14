import type { FC, PropsWithChildren } from "react";
import cn from "../../utils/cn";

type Props = {
  rounded?: boolean | "left" | "right";
  pressed?: boolean;
  variant?: "primary" | "secondary";
  flavour?: "default" | "success" | "danger" | "warning";
} & JSX.IntrinsicElements["button"];

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  flavour = "default",
  pressed,
  rounded = true,
  type,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={cn(
        "px-4 py-2 font-bold",

        flavour === "default" && "bg-gray-700",
        flavour === "success" && "bg-green-600",
        flavour === "danger" && "bg-red-500",
        flavour === "warning" && "bg-orange-500",

        variant === "secondary" && "text-xs uppercase",

        rounded === true && "rounded-xl",
        rounded === "left" && "rounded-l-xl",
        rounded === "right" && "rounded-r-xl",

        "disabled:opacity-70 disabled:cursor-not-allowed",
        pressed && "filter contrast-125",

        props.className
      )}
      type={type || "button"}
      {...props}
    >
      {children}
    </button>
  );
};
