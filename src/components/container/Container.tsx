import { useMemo, type HTMLAttributes } from "react";
import { useClassname } from "../../hooks";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

export const Container = ({
  className: classNameProp,
  children,
  ...props
}: ContainerProps) => {
  const className = useClassname({
    classNames: useMemo(() => [classNameProp, "bg-teal-950"], [classNameProp]),
  });

  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
};
