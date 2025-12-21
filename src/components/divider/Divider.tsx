import type { HTMLAttributes } from "react";

type DividerProps = Pick<HTMLAttributes<HTMLHRElement>, "className">;

export const Divider = ({ className = "" }: DividerProps) => (
  <hr className={className + " border-t border-emerald-300"} />
);
