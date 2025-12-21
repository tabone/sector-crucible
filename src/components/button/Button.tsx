import { useMemo, type ButtonHTMLAttributes } from "react";
import { Text } from "../text";

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  text: string;
  condensed?: boolean;
  fullWidth?: boolean;
};

export const Button = ({
  text,
  disabled,
  className,
  condensed = false,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const classes = useMemo(() => {
    const classes = [
      ...(className?.split(" ") ?? []),
      "py-1",
      "px-3",
      "bg-emerald-300",
      "cursor-pointer",
      "hover:bg-emerald-400",

      "flex",
      "items-center",
      "justify-center",
    ];

    if (fullWidth) classes.push("w-full");
    if (disabled) classes.push("opacity-20");

    return classes.join(" ");
  }, [disabled, fullWidth, className]);

  const textClasses = useMemo(() => {
    const classes = ["uppercase", !condensed ? "text-md" : "text-xs"];
    return classes.join(" ");
  }, [condensed]);

  return (
    <button {...props} className={classes}>
      <Text className={textClasses} color="black">
        {text}
      </Text>
    </button>
  );
};
