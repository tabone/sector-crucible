import type { HTMLAttributes } from "react";

export type PropsWithClasses<T = unknown> = T & {
  className?: HTMLAttributes<unknown>["className"];
};
