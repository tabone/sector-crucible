import type { Region } from "./Region";
import { Star, type StarProps } from "./Star";
import { SettlementsManager } from "./SettlementsManager";
import type { Coordinates } from "./models/coordinates.model";

export type SectorProps = {
  region: Region;
  coordinates: Coordinates;
};

export class Sector {
  private _star: null | Star;
  private _region: SectorProps["region"];
  private _coordinates: SectorProps["coordinates"];
  private _settlementsManager: SettlementsManager<"DEEP_SPACE">;

  constructor({ region, coordinates }: SectorProps) {
    this._star = null;
    this._region = region;
    this._coordinates = coordinates;
    this._settlementsManager = new SettlementsManager({ parent: this });
  }

  get id() {
    return `${this._coordinates.x}:${this._coordinates.y}`;
  }

  get code() {
    return `${this.region.code}:${this._coordinates.x}-${this._coordinates.y}`;
  }

  get star() {
    return this._star;
  }

  get region() {
    return this._region;
  }

  get hasStar() {
    return !!this._star;
  }

  get settlements() {
    return this._settlementsManager.settlements;
  }

  get hasSettlements() {
    return this.settlements.length > 0;
  }

  get coordinates() {
    return { ...this._coordinates };
  }

  get settlementsManager() {
    return this._settlementsManager;
  }

  createStar(props: Omit<StarProps, "sector">) {
    this._star = new Star({ ...props, sector: this });
    return this._star;
  }

  removeStar() {
    this._star = null;
  }
}
