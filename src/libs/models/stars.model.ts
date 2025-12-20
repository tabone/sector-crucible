import z from "zod";
import { STAR_VARIANTS } from "../consts";

export const zStarVariant = z.union(
  STAR_VARIANTS.map((variant) => z.literal(variant)),
);

export type StarVariant = z.infer<typeof zStarVariant>;
