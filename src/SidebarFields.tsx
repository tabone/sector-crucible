import type { PropsWithChildren } from "react";

type SidebarFields = PropsWithChildren;

export const SidebarFields = ({ children }: SidebarFields) => (
  <div className="flex flex-col gap-4">{children}</div>
);
