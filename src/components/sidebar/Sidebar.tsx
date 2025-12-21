import type { PropsWithChildren } from "react";
import { Button } from "../button";
import { Text } from "../text";

type SidebarProps = PropsWithChildren<{
  title: string;
  subTitle?: string;
  onClose?: () => void;
}>;

export const Sidebar = ({
  title,
  onClose,
  subTitle,
  children,
}: SidebarProps) => {
  return (
    <aside className="flex flex-col basis-100 grow-0 shrink  bg-teal-950 px-2 border-l border-emerald-300 shadow-xl shadow-black/70">
      {onClose && (
        <div className="absolute top-2 right-2">
          <Button condensed onClick={onClose} text="close" />
        </div>
      )}

      <header className="flex flex-col justify-center p-4 gap-2">
        <Text
          component="h2"
          className="text-2xl font-bold text-center"
          color="primary"
        >
          {title}
        </Text>

        {subTitle && (
          <Text component="h3" className="uppercase text-center">
            {subTitle}
          </Text>
        )}
      </header>

      <div className="flex flex-col overflow-auto gap-4 py-2">{children}</div>
    </aside>
  );
};
