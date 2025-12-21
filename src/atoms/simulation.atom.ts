import { atom } from "jotai";
import type { Simulation } from "../libs/Simulation";

export const simulationAtom = atom<null | Simulation>();
