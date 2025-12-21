import type { Star } from "../../libs/Star";
import { SidebarItem } from "../../SidebarItem";

type StarDetailsProps = {
  star: Star;
};

export const StarDetails = ({ star }: StarDetailsProps) => {
  return (
    <SidebarItem
      image={star.image}
      title={star.name}
      description={star.description}
    ></SidebarItem>
  );
};
