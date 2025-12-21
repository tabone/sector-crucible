import { Button, Page } from "../components";
import { Map } from "./Map";
import { SectorSidebar } from "./SectorSidebar";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Star } from "../libs/Star";
import type { Planet } from "../libs/Planet";
import type { Settlement } from "../libs/Settlement";
import { useNavigate, useParams } from "react-router";
import type { SectorCode } from "../libs/models";
import { useUniverse } from "../hooks";

export const Sector = () => {
  const { sectorCode } = useParams<{ sectorCode: SectorCode }>();

  const navigate = useNavigate();
  const universe = useUniverse();
  const [entity, setEntity] = useState<Star | Planet | Settlement>();

  const sector = useMemo(() => {
    if (!sectorCode) return;

    return universe.getSectorByCode(sectorCode);
  }, [universe, sectorCode]);

  const resetEntity = useCallback(() => setEntity(undefined), []);

  const onBack = useCallback(
    () => navigate(!sector ? "/" : `/?sectorCode=${sector.code}`),
    [sector, navigate],
  );

  useEffect(() => {
    if (!sector) onBack();
  }, [sector, onBack]);

  return (
    sector && (
      <Page>
        <Map selectedEntity={entity} onSiteClick={setEntity} sector={sector} />

        {entity && (
          <SectorSidebar
            sector={sector}
            entity={entity}
            onClose={resetEntity}
          />
        )}

        <Button
          condensed
          text="Back"
          onClick={onBack}
          className="absolute top-2 left-2"
        />
      </Page>
    )
  );
};
