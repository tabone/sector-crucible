import { useMemo, type HTMLAttributes, type PropsWithChildren } from "react";
import { match } from "ts-pattern";
import type { PropsWithClasses } from "../../models";

type TextProps = Pick<HTMLAttributes<unknown>, "id" | "title"> &
  PropsWithChildren<
    PropsWithClasses<{
      color?:
        | "white"
        | "black"
        | "invert"
        | "primary"
        | "warning"
        | "secondary"
        | "destructive";
      component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    }>
  >;

export const Text = ({
  children,
  color = "white",
  className: classNameProp,
  component: Component = "span",
  ...props
}: TextProps) => {
  const className = useMemo(() => {
    const className = !classNameProp ? [] : classNameProp.split(" ");

    className.push(
      "font-mono",
      match(color)
        .with("black", () => "text-black")
        .with("warning", () => "text-orange-500")
        .with("secondary", () => "text-teal-300")
        .with("primary", () => "text-emerald-300")
        .with("destructive", () => "text-red-400")
        .otherwise(() => "text-white"),
    );

    return className.join(" ");
  }, [color, classNameProp]);

  return (
    <Component {...props} className={className}>
      {children}
    </Component>
  );
};
