import { useSetAtom } from "jotai";
import { Button, Page } from "../components";
import { Map } from "./Map";
import { UniverseSidebar } from "./UniverseSidebar";
import { configAtom, simulationAtom } from "../atoms";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
} from "react";
import type { Sector } from "../libs/Sector";
import { useSectorCodeParamParser, useSectorNavigate } from "../hooks";
import type { Grid } from "react-virtualized";

export const Universe = () => {
  const gridRef = useRef<Grid>(null);
  const setConfig = useSetAtom(configAtom);
  const sectorNavigate = useSectorNavigate();
  const [sector, setSector] = useState<Sector>();
  const setSimulation = useSetAtom(simulationAtom);
  const sectorFromParam = useSectorCodeParamParser();

  const resetSector = useCallback(() => setSector(undefined), []);

  const onBack = useCallback(() => {
    setConfig(null);
    setSimulation(null);
  }, [setConfig, setSimulation]);

  const onSectorClick = useCallback<
    ComponentProps<typeof Map>["onSectorClick"]
  >(
    ({ type, sector }) => {
      if (type === "CLICK") {
        setSector(sector);
        return;
      }

      sectorNavigate(sector);
    },
    [sectorNavigate],
  );

  useEffect(() => {
    if (!sectorFromParam) return;

    startTransition(() => {
      setSector(sectorFromParam);
    });
  }, [sectorFromParam]);

  return (
    <Page>
      <Map
        ref={gridRef}
        selectedSector={sector}
        onSectorClick={onSectorClick}
      />

      {sector && <UniverseSidebar sector={sector} onClose={resetSector} />}

      <Button
        condensed
        text="Back"
        onClick={onBack}
        className="absolute top-2 left-2"
      />
    </Page>
  );
};
