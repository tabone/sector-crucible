import {
  memo,
  useMemo,
  type HTMLAttributes,
  type PropsWithChildren,
} from "react";

export type SiteProps = PropsWithChildren<{
  title: string;
  isEmpty?: boolean;
  isSelected?: boolean;
  onClick?: HTMLAttributes<HTMLDivElement>["onClick"];
}>;

export const Site = memo(
  ({
    title,
    onClick,
    children,
    isEmpty = true,
    isSelected = false,
  }: SiteProps) => {
    const classes = useMemo(() => {
      const classes = [
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "gap-2",
        "shrink-0",

        "select-none",

        "w-15",
        "h-15",

        "border",
        "font-bold",
        "transition",
        "rounded-full",
        "overflow-hidden",
        "hover:cursor-pointer",
      ];

      classes.push(
        ...(isSelected
          ? ["bg-teal-900", "border-emerald-300"]
          : ["bg-teal-950", "border-teal-900", "hover:bg-teal-900"]),
      );

      if (isEmpty) classes.push("opacity-30");

      return classes.join(" ");
    }, [isEmpty, isSelected]);

    return (
      <div role="button" onClick={onClick} className={classes} title={title}>
        {children}
      </div>
    );
  },
);
