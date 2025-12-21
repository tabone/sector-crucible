import { StarDetails } from "../components";
import type { Star as StarModel } from "../libs/Star";
import { SidebarSection } from "../SidebarSection";

type StarProps = {
  star: StarModel;
};

export const Star = ({ star }: StarProps) => {
  return (
    <SidebarSection title="Star">
      <StarDetails star={star} />
    </SidebarSection>
  );
};
