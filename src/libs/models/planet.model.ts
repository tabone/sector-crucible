import z from "zod";
import { PLANET_VARIANTS } from "../consts";

export const zPlanetVariant = z.union(
  PLANET_VARIANTS.map((variant) => z.literal(variant)),
);

export type PlanetVariant = z.infer<typeof zPlanetVariant>;
