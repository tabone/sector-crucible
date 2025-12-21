import { AutoSizer, Grid } from "react-virtualized";
import { SectorSite } from "./SectorSite";
import { useUniverse } from "../hooks";
import { type ComponentProps, type Ref } from "react";
import type { Sector } from "../libs/Sector";

type MapProps = {
  ref: Ref<Grid>;
  selectedSector?: Sector;
  onSectorClick: ComponentProps<typeof SectorSite>["onClick"];
};

export const Map = ({ ref, onSectorClick, selectedSector }: MapProps) => {
  const universe = useUniverse();

  return (
    <main className="flex-1">
      <div className="w-full h-full">
        <AutoSizer>
          {({ width, height }) => (
            <Grid
              ref={ref}
              width={width}
              height={height}
              rowHeight={68}
              columnWidth={68}
              rowCount={universe.height}
              columnCount={universe.width}
              containerStyle={{ overflow: "visible" }}
              scrollToRow={selectedSector?.universeCoordinates?.y}
              scrollToColumn={selectedSector?.universeCoordinates?.x}
              cellRenderer={({ key, style, rowIndex, columnIndex }) => {
                const regionIndex = Math.floor(
                  rowIndex / universe.settings.regions.height,
                );

                const region = universe.regions[regionIndex];

                const newStyle = { ...style };

                if (typeof newStyle.left === "number") {
                  newStyle.left += rowIndex % 2 ? 0 : 32;
                }

                const sector = region.getSectorByCoordinates(
                  columnIndex,
                  rowIndex - regionIndex * universe.settings.regions.height,
                );

                return (
                  <div style={newStyle} key={key}>
                    <SectorSite
                      sector={sector}
                      onClick={onSectorClick}
                      isSelected={selectedSector === sector}
                    />
                  </div>
                );
              }}
            />
          )}
        </AutoSizer>
      </div>
    </main>
  );
};
