import type { Sector } from "../libs/Sector";
import { SidebarItem } from "../SidebarItem";
import { SidebarNoResults } from "../SidebarNoResults";
import { SidebarSection } from "../SidebarSection";

type StarProps = {
  sector: Sector;
};

export const Star = ({ sector }: StarProps) => {
  return (
    <SidebarSection title="Star">
      {!sector.star ? (
        <SidebarNoResults message="No Star" />
      ) : (
        <SidebarItem
          image={sector.star.image}
          title={sector.star.name}
          description={sector.star.description}
        ></SidebarItem>
      )}
    </SidebarSection>
  );
};
