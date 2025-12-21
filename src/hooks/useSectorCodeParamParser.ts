import { useSearchParams } from "react-router";
import type { SectorCode } from "../libs/models";
import { useUniverse } from "./useUniverse";
import { useEffect } from "react";

export const useSectorCodeParamParser = () => {
  const universe = useUniverse();
  const [searchParams, setSearchParams] = useSearchParams();

  const sectorCode = searchParams.get("sectorCode");

  useEffect(() => {
    if (!sectorCode) return;
    setSearchParams(undefined);
  }, [sectorCode, setSearchParams]);

  return !sectorCode
    ? null
    : universe.getSectorByCode(sectorCode as SectorCode);
};
