import type { FC, PropsWithChildren } from "react";
import cn from "../utils/cn";

type Props = {
  open?: boolean;
};

export const Modal: FC<PropsWithChildren<Props>> = ({
  children,
  open = false,
}) => {
  return (
    <div
      className={cn(
        "fixed left-0 right-0 bottom-0 top-0 flex items-center justify-center pointer-events-none duration-300",
        open && "backdrop-blur-md pointer-events-auto transition-all"
      )}
    >
      <div
        className={cn(
          "p-6 bg-slate-600 rounded-md duration-700 opacity-0 translate-y-20",
          open && "opacity-100 translate-y-0 transition-all"
        )}
      >
        {children}
      </div>
    </div>
  );
};
