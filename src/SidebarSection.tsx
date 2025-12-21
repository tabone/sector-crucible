import { useId, type PropsWithChildren } from "react";
import { Divider, Text } from "./components";

type SidebarSectionProps = PropsWithChildren<{
  title: string;
}>;

export const SidebarSection = ({ title, children }: SidebarSectionProps) => {
  const titleID = useId();

  return (
    <section className="flex flex-col gap-2" aria-labelledby={titleID}>
      <header>
        <Text
          id={titleID}
          component="h3"
          color="primary"
          className="font-bold text-sm uppercase"
        >
          {title}
        </Text>

        <Divider />
      </header>

      <div className="flex flex-col gap-2">{children}</div>
    </section>
  );
};
