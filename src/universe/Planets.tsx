import { Planet } from "./Planet";
import type { Sector } from "../libs/Sector";
import { SidebarSection } from "../SidebarSection";
import { SidebarNoResults } from "../SidebarNoResults";

type PlanetsProps = {
  sector: Sector;
};

export const Planets = ({ sector }: PlanetsProps) => {
  return (
    <SidebarSection title="Planets">
      {!sector.star?.hasPlanets ? (
        <SidebarNoResults message="No Planets" />
      ) : (
        sector.star.planets.map((planet) => <Planet planet={planet} />)
      )}
    </SidebarSection>
  );
};
