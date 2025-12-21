import { SettlementDetails } from "../components";
import type { Settlement } from "../libs/Settlement";
import { SidebarSection } from "../SidebarSection";

type SettlementsProps = {
  settlements: Settlement[];
};

export const Settlements = ({ settlements }: SettlementsProps) => {
  return (
    <SidebarSection
      title={settlements.length === 1 ? "Settlement" : "Settlements"}
    >
      {settlements.map((settlement) => (
        <SettlementDetails settlement={settlement} />
      ))}
    </SidebarSection>
  );
};
