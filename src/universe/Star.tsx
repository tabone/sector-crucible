import { StarDetails } from "../components";
import type { Sector } from "../libs/Sector";
import { SidebarSection } from "../SidebarSection";
import { SidebarNoResults } from "../SidebarNoResults";

type StarProps = {
  sector: Sector;
};

export const Star = ({ sector }: StarProps) => {
  return (
    <SidebarSection title="Star">
      {!sector.star ? (
        <SidebarNoResults message="No Star" />
      ) : (
        <StarDetails star={sector.star} />
      )}
    </SidebarSection>
  );
};
