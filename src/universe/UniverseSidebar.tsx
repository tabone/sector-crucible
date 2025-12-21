import { Star } from "./Star";
import { Planets } from "./Planets";
import { Settlements } from "./Settlements";
import { Button, Sidebar } from "../components";
import { useCallback } from "react";
import type { Sector } from "../libs/Sector";
import { useSectorNavigate } from "../hooks";

type UniverseSidebarProps = {
  sector: Sector;
  onClose: () => void;
};

export const UniverseSidebar = ({ sector, onClose }: UniverseSidebarProps) => {
  const sectorNavigate = useSectorNavigate();

  const onViewSector = useCallback(
    () => sectorNavigate(sector),
    [sector, sectorNavigate],
  );

  return (
    <Sidebar
      onClose={onClose}
      title={sector.code}
      subTitle={sector.region.variantDescription}
    >
      <Button text="View Sector" onClick={onViewSector} />

      <Star sector={sector} />
      <Planets sector={sector} />
      <Settlements sector={sector} />
    </Sidebar>
  );
};
