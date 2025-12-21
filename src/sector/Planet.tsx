import { useMemo } from "react";
import type { Planet as PlanetModel } from "../libs/Planet";
import { PlanetDetails } from "../components";
import { SidebarSection } from "../SidebarSection";
import { Settlements } from "./Settlements";

type PlanetProps = {
  planet: PlanetModel;
};

export const Planet = ({ planet }: PlanetProps) => {
  const settlements = useMemo(
    () =>
      planet.settlements.filter(
        (settlement) => settlement.variant === "PLANETSIDE",
      ),
    [planet],
  );

  return (
    <>
      <SidebarSection title={"Planet"}>
        <PlanetDetails planet={planet} />
      </SidebarSection>

      {settlements.length > 0 && <Settlements settlements={settlements} />}
    </>
  );
};
