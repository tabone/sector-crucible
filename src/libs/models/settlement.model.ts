import z from "zod";
import { SETTLEMENT_VARIANTS } from "../consts";

export const zSettlementVariant = z.union(
  SETTLEMENT_VARIANTS.map((variant) => z.literal(variant)),
);

export type SettlementVariant = z.infer<typeof zSettlementVariant>;
