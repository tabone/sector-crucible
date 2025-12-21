import type { PropsWithChildren } from "react";
import { Text } from "./components";

type SidebarItemProps = PropsWithChildren<{
  title: string;
  image?: string;
  description: string;
}>;

export const SidebarItem = ({
  title,
  image,
  children,
  description,
}: SidebarItemProps) => (
  <article className="flex flex-col border border-teal-900">
    <header className="flex gap-2 p-2">
      <figure className="basis-11 h-11 rounded-full overflow-hidden border-teal-900 p-1 border-2">
        {image ? (
          <img src={image} className="rounded-full" />
        ) : (
          <div className="bg-gray-200 h-full"></div>
        )}
      </figure>

      <div className="flex flex-col gap-0 flex-1">
        <Text className="font-bold uppercase">{title}</Text>
        <Text>{description}</Text>
      </div>
    </header>

    {children && <div className="p-2 border-t border-teal-900">{children}</div>}
  </article>
);
