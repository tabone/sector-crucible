import { useAtomValue } from "jotai";
import { simulationAtom } from "../atoms";

export const useUniverse = () => {
  const simulation = useAtomValue(simulationAtom);

  if (!simulation?.universe) throw new Error("no simulation in context");

  return simulation.universe;
};
