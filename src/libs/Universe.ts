import { Region } from "./Region";
import { uuid } from "./utils";
import type { RegionVariant } from "./models";

export type UniverseProps = {
  id?: string;
  regions: {
    width: number;
    height: number;
  };
};

export class Universe {
  private _regions: Record<RegionVariant, Region>;
  private _id: Exclude<UniverseProps["id"], undefined>;

  constructor({ id = uuid(), regions }: UniverseProps) {
    this._id = id;

    this._regions = {
      EXPANSE: new Region({
        universe: this,
        variant: "EXPANSE",
        id: `${this._id}-EXPANSE`,
        width: regions.width,
        height: regions.height,
      }),

      OUTLANDS: new Region({
        universe: this,
        variant: "OUTLANDS",
        id: `${this._id}-OUTLANDS`,
        width: regions.width,
        height: regions.height,
      }),

      TERMINUS: new Region({
        universe: this,
        variant: "TERMINUS",
        id: `${this._id}-TERMINUS`,
        width: regions.width,
        height: regions.height,
      }),
    };
  }

  get id() {
    return this._id;
  }

  get regions() {
    return Object.values(this._regions);
  }

  getRegionByVariant(variant: RegionVariant) {
    return this._regions[variant];
  }
}
