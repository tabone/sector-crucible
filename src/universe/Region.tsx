import { useMemo, type ComponentProps } from "react";
import { Sector } from "./Sector";
import type { Region as RegionModel } from "../libs/Region";
import type { Sector as SectorModel } from "../libs/Sector";

type RegionProps = {
  region: RegionModel;
  selectedSector?: SectorModel;
  onSectorSelect: ComponentProps<typeof Sector>["onSelect"];
};

export const Region = ({
  region,
  selectedSector,
  onSectorSelect,
}: RegionProps) => {
  const rows = useMemo(() => {
    const rows = [];

    for (let y = 0; y < region.height; y++) {
      const cells = [];

      for (let x = 0; x < region.width; x++) {
        const sector = region.getSectorByCoordinates(x, y);

        cells.push(
          <Sector
            key={sector.id}
            onSelect={onSectorSelect}
            sector={sector}
            isSelected={sector === selectedSector}
          />,
        );
      }

      rows.push(
        <div key={`${region.id}:${y}`} className="flex gap-2 even:ml-8">
          {cells}
        </div>,
      );
    }

    return rows;
  }, [region, onSectorSelect, selectedSector]);

  return <div className="flex gap-2 flex-col">{rows}</div>;
};
