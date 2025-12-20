import type { ComponentProps } from "react";
import { useUniverse } from "../hooks";
import type { Sector } from "../libs/Sector";
import { Region } from "./Region";

type MapProps = {
  selectedSector?: Sector;
  onSectorSelect: ComponentProps<typeof Region>["onSectorSelect"];
};

export const Map = ({ selectedSector, onSectorSelect }: MapProps) => {
  const universe = useUniverse();

  return (
    <main className="flex-1 overflow-auto flex">
      <div className="p-4 flex flex-col gap-2">
        <Region
          selectedSector={selectedSector}
          onSectorSelect={onSectorSelect}
          region={universe.regions[0]}
        />
        <Region
          selectedSector={selectedSector}
          onSectorSelect={onSectorSelect}
          region={universe.regions[1]}
        />
        <Region
          selectedSector={selectedSector}
          onSectorSelect={onSectorSelect}
          region={universe.regions[2]}
        />
      </div>
    </main>
  );
};
