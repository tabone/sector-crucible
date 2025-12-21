import { Region } from "./Region";
import { uuid } from "./utils";
import {
  zSectorCode,
  type RegionCode,
  type RegionVariant,
  type SectorCode,
} from "./models";
import { match } from "ts-pattern";

export type UniverseProps = {
  id?: string;
  settings: {
    regions: {
      width: number;
      height: number;
    };
    sectors: {
      width: number;
      height: number;
    };
  };
};

export class Universe {
  private _regions: Record<RegionVariant, Region>;
  private _settings: UniverseProps["settings"];
  private _id: Exclude<UniverseProps["id"], undefined>;

  constructor({ id = uuid(), settings }: UniverseProps) {
    this._id = id;
    this._settings = settings;

    this._regions = {
      EXPANSE: new Region({
        universe: this,
        variant: "EXPANSE",
        id: `${this._id}-EXPANSE`,
        width: settings.regions.width,
        height: settings.regions.height,
      }),

      OUTLANDS: new Region({
        universe: this,
        variant: "OUTLANDS",
        id: `${this._id}-OUTLANDS`,
        width: settings.regions.width,
        height: settings.regions.height,
      }),

      TERMINUS: new Region({
        universe: this,
        variant: "TERMINUS",
        id: `${this._id}-TERMINUS`,
        width: settings.regions.width,
        height: settings.regions.height,
      }),
    };
  }

  get id() {
    return this._id;
  }

  get regions() {
    return Object.values(this._regions);
  }

  get settings() {
    return this._settings;
  }

  get width() {
    return this._settings.regions.width;
  }

  get height() {
    return this._settings.regions.height * this.regions.length;
  }

  get sectorCenter() {
    return {
      x: Math.floor(this._settings.sectors.width / 2),
      y: Math.floor(this._settings.sectors.height / 2),
    };
  }

  getSectorByCode(code: SectorCode) {
    const { success, data } = zSectorCode.safeParse(code);

    if (!success) return null;

    const [regionCode, sectorID] = data.split("-");

    const region = this.getRegionByCode(regionCode as RegionCode);

    if (!region) return null;

    return region.getSectorByID(sectorID);
  }

  getRegionByCode(code: RegionCode) {
    return match(code)
      .with("E", () => this.getRegionByVariant("EXPANSE"))
      .with("O", () => this.getRegionByVariant("OUTLANDS"))
      .with("T", () => this.getRegionByVariant("TERMINUS"))
      .otherwise(() => null);
  }

  getRegionByVariant(variant: RegionVariant) {
    return this._regions[variant];
  }
}
