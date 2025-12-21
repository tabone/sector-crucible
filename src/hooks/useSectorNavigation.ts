import { useCallback } from "react";
import { useNavigate } from "react-router";
import type { Sector } from "../libs/Sector";

export const useSectorNavigate = () => {
  const navigate = useNavigate();

  return useCallback(
    (sector: Sector) => {
      sector.generate();
      navigate(`/sector/${sector.code}`);
    },
    [navigate],
  );
};
