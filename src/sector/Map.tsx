import { AutoSizer, Grid } from "react-virtualized";
import { useUniverse } from "../hooks";
import { SectorSite } from "./SectorSite";
import { useMemo, type ComponentProps } from "react";
import type { Sector } from "../libs/Sector";
import type { Planet } from "../libs/Planet";
import type { Settlement } from "../libs/Settlement";
import type { Star } from "../libs/Star";

type MapProp = {
  sector: Sector;
  selectedEntity?: Star | Planet | Settlement;
  onSiteClick: ComponentProps<typeof SectorSite>["onClick"];
};

export const Map = ({ sector, onSiteClick, selectedEntity }: MapProp) => {
  const universe = useUniverse();

  const entitiesCoordinates = useMemo(
    () => sector.entitiesCoordinates,
    [sector],
  );

  return (
    <main className="flex-1">
      <div className="w-full h-full">
        <AutoSizer>
          {({ width, height }) => (
            <Grid
              width={width}
              height={height}
              rowHeight={68}
              columnWidth={68}
              rowCount={universe.settings.sectors.height}
              columnCount={universe.settings.sectors.width}
              containerStyle={{ overflow: "visible" }}
              cellRenderer={({ key, style, rowIndex, columnIndex }) => {
                const newStyle = { ...style };

                if (typeof newStyle.left === "number") {
                  newStyle.left += rowIndex % 2 ? 0 : 32;
                }

                const entity =
                  entitiesCoordinates[`${columnIndex}:${rowIndex}`];

                return (
                  <div style={newStyle} key={key}>
                    <SectorSite
                      x={columnIndex}
                      y={rowIndex}
                      isSelected={selectedEntity && selectedEntity === entity}
                      onClick={onSiteClick}
                      entity={entity}
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
