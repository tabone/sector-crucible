import z from "zod";
import { REGION_VARIANTS } from "../consts";

export const zRegionVariant = z.union(
  REGION_VARIANTS.map((variant) => z.literal(variant)),
);

export type RegionVariant = z.infer<typeof zRegionVariant>;
