import { useContext } from "react";
import { SimulationContext } from "../contexts";

export const useUniverse = () => {
  const simulation = useContext(SimulationContext);

  if (!simulation?.universe) throw new Error("no simulation in context");

  return simulation.universe;
};
