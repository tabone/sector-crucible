import type { Settlement } from "../../libs/Settlement";
import { SidebarFields } from "../../SidebarFields";
import { SidebarItem } from "../../SidebarItem";
import { SidebarSectionField } from "../../SidebarSectionField";

type SettlementDetailsProps = {
  settlement: Settlement;
};

export const SettlementDetails = ({ settlement }: SettlementDetailsProps) => {
  return (
    <SidebarItem
      title={settlement.name}
      description={settlement.variantDescription}
      image={settlement.image}
    >
      <SidebarFields>
        <SidebarSectionField label="Population" value={settlement.population} />
        <SidebarSectionField label="First Look" value={settlement.firstLook} />
        <SidebarSectionField label="Trouble" value={settlement.trouble} />
        <SidebarSectionField label="Projects" value={settlement.projects} />
        <SidebarSectionField label="Authority" value={settlement.authority} />
        <SidebarSectionField
          label="Orbits"
          value={`${settlement.parentType} ${settlement.parentName}`}
        />
        <SidebarSectionField
          label="Initial Contact"
          value={settlement.initialContact}
        />
      </SidebarFields>
    </SidebarItem>
  );
};
