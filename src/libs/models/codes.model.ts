import z from "zod";

export const zRegionCode = z.union(
  ["T", "O", "E", "U"].map((code) => z.literal(code)),
);

export const zSectorCode = z.templateLiteral([
  zRegionCode,
  "-",
  z.number(),
  ":",
  z.number(),
]);

export type RegionCode = z.infer<typeof zRegionCode>;
export type SectorCode = z.infer<typeof zSectorCode>;
