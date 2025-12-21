import { Sidebar } from "../components";
import type { Planet as PlanetModel } from "../libs/Planet";
import type { Sector } from "../libs/Sector";
import { Settlement } from "../libs/Settlement";
import { Star as StarModel } from "../libs/Star";
import { Planet } from "./Planet";
import { Settlements } from "./Settlements";
import { Star } from "./Star";

type SectorSidebarProps = {
  sector: Sector;
  onClose: () => void;
  entity: StarModel | PlanetModel | Settlement;
};

export const SectorSidebar = ({
  sector,
  entity,
  onClose,
}: SectorSidebarProps) => {
  return (
    <Sidebar
      title={sector.code}
      subTitle={sector.region.variantDescription}
      onClose={onClose}
    >
      {entity instanceof StarModel ? (
        <Star star={entity} />
      ) : entity instanceof Settlement ? (
        <Settlements settlements={[entity]} />
      ) : (
        <Planet planet={entity} />
      )}
    </Sidebar>
  );
};
