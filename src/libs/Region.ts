import { match } from "ts-pattern";
import { Sector, type SectorProps } from "./Sector";
import type { Universe } from "./Universe";
import type { RegionVariant } from "./models";

export type RegionProps = {
  id: string;
  width: number;
  height: number;
  universe: Universe;
  variant: RegionVariant;
};

export class Region {
  private _id: RegionProps["id"];
  private _width: RegionProps["width"];
  private _height: RegionProps["height"];
  private _variant: RegionProps["variant"];
  private _universe: RegionProps["universe"];
  private _sectors: Record<Sector["id"], Sector>;

  constructor({ id, width, height, variant, universe }: RegionProps) {
    this._id = id;
    this._sectors = {};
    this._width = width;
    this._height = height;
    this._variant = variant;
    this._universe = universe;
  }

  get id() {
    return this._id;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get code() {
    return match(this._variant)
      .with("EXPANSE", () => "E")
      .with("OUTLANDS", () => "O")
      .with("TERMINUS", () => "T")
      .otherwise(() => "U");
  }

  get variant() {
    return this._variant;
  }

  get oracleVariant() {
    return match<RegionVariant, "expanse" | "outlands" | "terminus">(
      this._variant,
    )
      .with("EXPANSE", () => "expanse")
      .with("OUTLANDS", () => "outlands")
      .with("TERMINUS", () => "terminus")
      .exhaustive();
  }

  get variantDescription() {
    return match(this._variant)
      .with("EXPANSE", () => "Expanse")
      .with("OUTLANDS", () => "Outlands")
      .with("TERMINUS", () => "Terminus")
      .otherwise(() => "Unknown");
  }

  get universe() {
    return this._universe;
  }

  get sectors() {
    return Object.values(this._sectors);
  }

  getSectorByID(id: string) {
    const [x, y] = id.split(":").map(Number);

    return this.getSectorByCoordinates(x, y);
  }

  getSectorByCoordinates(x: number, y: number) {
    return this._sectors[`${x}:${y}`];
  }

  createSector({ coordinates, ...props }: Omit<SectorProps, "region">) {
    const { x, y } = coordinates;
    if (x < 0 || x > this._width || y < 0 || y > this._height) {
      throw new Error("sector position exceeds region dimension");
    }

    const sector = new Sector({ ...props, coordinates, region: this });

    this._sectors[sector.id] = sector;

    return sector;
  }

  deleteSector(id: Sector["id"]) {
    delete this._sectors[id];
  }
}
