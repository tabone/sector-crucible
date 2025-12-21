import z from "zod";

export const zCoordinates = z.object({
  x: z.number(),
  y: z.number(),
});

export type Coordinates = z.infer<typeof zCoordinates>;
