import type { Sector } from "../libs/Sector";
import { SidebarSection } from "../SidebarSection";
import { SidebarNoResults } from "../SidebarNoResults";
import { PlanetDetails } from "../components";

type PlanetsProps = {
  sector: Sector;
};

export const Planets = ({ sector }: PlanetsProps) => {
  return (
    <SidebarSection title="Planets">
      {!sector.star?.hasPlanets ? (
        <SidebarNoResults message="No Planets" />
      ) : (
        sector.star.planets.map((planet) => <PlanetDetails planet={planet} />)
      )}
    </SidebarSection>
  );
};
