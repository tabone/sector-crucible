import type { PropsWithChildren } from "react";

export const Page = ({ children }: PropsWithChildren) => (
  <div className="h-screen w-screen overflow-hidden flex bg-emerald-950">
    {children}
  </div>
);
