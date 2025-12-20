import { useCallback, useMemo } from "react";
import type { Sector as SectorModel } from "../libs/Sector";

export type SectorProps = {
  sector: SectorModel;
  isSelected?: boolean;
  onSelect: (payload: { sector: SectorModel; type: "INFO" | "VIEW" }) => void;
};

export const Sector = ({
  sector,
  onSelect,
  isSelected = false,
}: SectorProps) => {
  const isEmpty = useMemo(
    () => !sector.star && !sector.hasSettlements,
    [sector],
  );

  const hasSettements = useMemo(
    () =>
      sector.hasSettlements ||
      sector.star?.hasSettlements ||
      sector.star?.planets.some((planet) => planet.hasSettlements),
    [sector],
  );

  const classes = useMemo(() => {
    const classes = [
      "flex",
      "items-center",
      "justify-center",
      "w-15",
      "h-15",
      "border",
      "rounded-full",
      "shrink-0",
      "font-mono",
      "text-xs",
      "font-bold",
      "flex-col",
      "gap-2",
      "hover:cursor-pointer",
      "transition",
    ];

    classes.push(
      ...(isSelected
        ? ["bg-teal-900", "border-emerald-300"]
        : ["bg-teal-950", "border-teal-900", "hover:bg-teal-900"]),
    );

    if (isEmpty) {
      classes.push("opacity-30");
    }

    return classes.join(" ");
  }, [isEmpty, isSelected]);

  const onClick = useCallback(
    () => onSelect({ sector, type: "INFO" }),
    [sector, onSelect],
  );

  const onDoubleClick = useCallback(
    () => onSelect({ sector, type: "VIEW" }),
    [sector, onSelect],
  );

  return (
    <div className={classes} onClick={onClick} onDoubleClick={onDoubleClick}>
      <span className="text-white">{sector.code}</span>

      <div className="flex gap-2 text-emerald-300">
        {sector.hasStar && <div>★</div>}
        {sector.star?.hasPlanets && <div>●</div>}
        {hasSettements && <div>▲</div>}
      </div>
    </div>
  );
};
