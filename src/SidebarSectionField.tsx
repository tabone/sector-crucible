import { useId } from "react";
import { Text } from "./components";

type SidebarSectionFieldProps = {
  label: string;
  value: number | string;
};

export const SidebarSectionField = ({
  label,
  value,
}: SidebarSectionFieldProps) => {
  const id = useId();

  return (
    <div className="flex flex-col">
      <Text id={id} className="uppercase text-xs font-bold">
        {label}
      </Text>

      <Text aria-labelledby={id}>{value}</Text>
    </div>
  );
};
