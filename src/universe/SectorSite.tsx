import { memo, useCallback, useMemo } from "react";
import type { Sector, Sector as SectorModel } from "../libs/Sector";
import { Site, Text } from "../components";
import { useDebouncedCallback } from "use-debounce";

type SectorSiteOnClickProps = {
  sector: Sector;
  type: "CLICK" | "DOUBLE_CLICK";
};

export type SectorSiteProps = {
  sector: SectorModel;
  isSelected?: boolean;
  onClick: (sector: SectorSiteOnClickProps) => void;
};

export const SectorSite = memo(
  ({ sector, isSelected, onClick: onClickProp }: SectorSiteProps) => {
    const isEmpty = useMemo(
      () => !sector.star && !sector.hasSettlements,
      [sector],
    );

    const hasSettements = useMemo(
      () =>
        sector.hasSettlements ||
        sector.star?.hasSettlements ||
        sector.star?.planets.some((planet) => planet.hasSettlements),
      [sector],
    );

    const onClick = useDebouncedCallback(
      useCallback(
        (e) => {
          onClickProp({
            sector,
            type: e.detail === 1 ? "CLICK" : "DOUBLE_CLICK",
          });
        },
        [sector, onClickProp],
      ),
      200,
    );

    return (
      <Site
        isEmpty={isEmpty}
        onClick={onClick}
        title={sector.code}
        isSelected={isSelected}
      >
        <Text className="whitespace-nowrap text-xs">{sector.code}</Text>

        <div className="flex gap-2">
          {sector.hasStar && (
            <Text
              title="Presence of a Star"
              color="primary"
              className="text-xs"
            >
              ★
            </Text>
          )}
          {sector.star?.hasPlanets && (
            <Text
              title="Presence of a Planet"
              color="primary"
              className="text-xs"
            >
              ●
            </Text>
          )}
          {hasSettements && (
            <Text
              title="Presence of a Settlement"
              color="primary"
              className="text-xs"
            >
              ▲
            </Text>
          )}
        </div>
      </Site>
    );
  },
);
