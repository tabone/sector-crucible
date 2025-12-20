import { Planets } from "./Planets";
import type { Sector } from "../libs/Sector";
import { Settlements } from "./Settlements";
import { Star } from "./Star";

type SidebarProps = {
  sector?: Sector;
  onClose: () => void;
};

export const Sidebar = ({ sector, onClose }: SidebarProps) => {
  return (
    sector && (
      <aside className="flex flex-col basis-100 font-mono bg-teal-950 text-white px-2">
        <button
          className="absolute top-2 right-2 uppercase text-xs border py-1 px-3 text-emerald-300 cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
        <header className="flex flex-col justify-center items-center p-4 gap-2">
          <h2 className="font-bold text-center text-2xl text-emerald-300">
            {sector.code}
          </h2>

          <h3 className="text-sm uppercase">
            {sector.region.variantDescription}
          </h3>
        </header>

        <div className="flex flex-col overflow-auto gap-4">
          <Star sector={sector} />

          <Planets sector={sector} />

          <Settlements sector={sector} />
        </div>
      </aside>
    )
  );
};
