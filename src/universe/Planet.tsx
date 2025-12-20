import type { Planet as PlanetModel } from "../libs/Planet";
import { SidebarFields } from "../SidebarFields";
import { SidebarItem } from "../SidebarItem";
import { SidebarSectionField } from "../SidebarSectionField";

type PlanetProps = {
  planet: PlanetModel;
};

export const Planet = ({ planet }: PlanetProps) => {
  return (
    <SidebarItem
      image={planet.image}
      title={planet.name}
      description={planet.variantDescription}
    >
      <SidebarFields>
        <SidebarSectionField label="Orbits" value={planet.star.code} />
        <SidebarSectionField
          label="Settlements"
          value={planet.settlements.length}
        />
        <SidebarSectionField label="Life" value={planet.life} />
        <SidebarSectionField label="Feature" value={planet.feature} />
        <SidebarSectionField label="Atmosphere" value={planet.atmosphere} />
        <SidebarSectionField
          label="Space Observation"
          value={planet.spaceObservation}
        />
      </SidebarFields>
    </SidebarItem>
  );
};
