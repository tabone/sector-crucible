import { useCallback, useState, type ComponentProps } from "react";
import { Map } from "./Map";
import { Sidebar } from "./Sidebar";
import type { Sector } from "../libs/Sector";

type UniverseProps = {
  onSectorView: (sector: Sector) => void;
};

export const Universe = ({ onSectorView }: UniverseProps) => {
  const [sector, setSector] = useState<Sector>();

  const onSectorSelect = useCallback<
    ComponentProps<typeof Map>["onSectorSelect"]
  >(
    (payload) => {
      setSector(payload.sector);

      if (payload.type === "VIEW") onSectorView(payload.sector);
    },
    [onSectorView],
  );

  return (
    <div className="h-screen w-screen overflow-hidden flex bg-emerald-950">
      <Map onSectorSelect={onSectorSelect} selectedSector={sector} />
      <Sidebar sector={sector} onClose={() => setSector(undefined)} />
    </div>
  );
};
