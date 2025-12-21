import { useCallback } from "react";
import { Site } from "../components";
import type { Planet } from "../libs/Planet";
import type { Settlement } from "../libs/Settlement";
import type { Star } from "../libs/Star";

type SectorSiteProps = {
  x: number;
  y: number;
  isSelected?: boolean;
  entity?: Star | Planet | Settlement;
  onClick: (entity: Star | Planet | Settlement) => void;
};

export const SectorSite = ({
  x,
  y,
  entity,
  isSelected,
  onClick: onClickProp,
}: SectorSiteProps) => {
  const onClick = useCallback(() => {
    if (!entity) return;
    onClickProp(entity);
  }, [entity, onClickProp]);

  return (
    <Site
      title={`${x}:${y}`}
      isEmpty={!entity}
      onClick={onClick}
      isSelected={isSelected}
    >
      <div>{entity && <img src={entity.image} width="30" />}</div>
    </Site>
  );
};
