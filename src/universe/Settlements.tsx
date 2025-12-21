import type { Sector } from "../libs/Sector";
import { SidebarSection } from "../SidebarSection";
import { useMemo } from "react";
import { SidebarNoResults } from "../SidebarNoResults";
import { SettlementDetails } from "../components";

type SettlementsProps = {
  sector: Sector;
};

export const Settlements = ({ sector }: SettlementsProps) => {
  const settlements = useMemo(() => {
    const settlements = [];

    settlements.push(...sector.settlements);
    settlements.push(...(!sector.star ? [] : sector.star.settlements));
    settlements.push(
      ...(sector.star?.planets || []).flatMap((planet) => planet.settlements),
    );

    return settlements;
  }, [sector]);

  return (
    <SidebarSection title="Settlements">
      {settlements.length === 0 ? (
        <SidebarNoResults message="No Settlements" />
      ) : (
        settlements.map((settlement) => (
          <SettlementDetails settlement={settlement} />
        ))
      )}
    </SidebarSection>
  );
};
