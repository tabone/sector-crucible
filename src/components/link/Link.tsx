import type { AnchorHTMLAttributes } from "react";
import { Text } from "../text";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
  text: string;
};

export const Link = ({ text, ...props }: LinkProps) => {
  return (
    <a {...props}>
      <Text color="secondary">{text}</Text>
    </a>
  );
};
