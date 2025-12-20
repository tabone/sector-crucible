import { useId } from "react";

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
      <span id={id} className="uppercase text-xs font-bold">
        {label}
      </span>

      <span aria-labelledby={id}>{value}</span>
    </div>
  );
};
