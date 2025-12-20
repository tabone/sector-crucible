import { type PropsWithChildren } from "react";

type SidebarSectionProps = PropsWithChildren<{
  title: string;
}>;

export const SidebarSection = ({ title, children }: SidebarSectionProps) => {
  return (
    <section className="flex flex-col gap-2">
      <header>
        <h3 className="font-bold text-lg border-b text-emerald-300">{title}</h3>
      </header>

      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
};
