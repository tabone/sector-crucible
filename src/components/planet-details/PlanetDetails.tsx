import type { Planet } from "../../libs/Planet";
import { SidebarFields } from "../../SidebarFields";
import { SidebarItem } from "../../SidebarItem";
import { SidebarSectionField } from "../../SidebarSectionField";

type PlanetDetailsProps = {
  planet: Planet;
};

export const PlanetDetails = ({ planet }: PlanetDetailsProps) => {
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
