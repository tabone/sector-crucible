import { createContext } from "react";
import type { Simulation } from "../libs/Simulation";

export const SimulationContext = createContext<null | Simulation>(null);
