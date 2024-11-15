import { FC, PropsWithChildren } from "react";
import cn from "../../utils/cn";

type Props = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  center?: boolean;
  bold?: boolean;
} & JSX.IntrinsicElements["p"]; // not legit polymorphic props - "p" should share props with the rest

export const Text: FC<PropsWithChildren<Props>> = ({
  as: Component = "p",
  bold = false,
  center = false,
  children,
  ...props
}) => (
  <Component
    {...props}
    className={cn(
      bold && "font-bold",
      center && "text-center",
      props.className
    )}
  >
    {children}
  </Component>
);
