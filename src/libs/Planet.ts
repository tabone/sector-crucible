import type { Coordinates, PlanetVariant } from "./models";
import { SettlementsManager } from "./SettlementsManager";
import type { Star } from "./Star";

import desertPlanetImage from "../assets/planets/Desert.webp";
import furnacePlanetImage from "../assets/planets/Furnace.webp";
import gravePlanetImage from "../assets/planets/Grave.webp";
import icePlanetImage from "../assets/planets/Ice.webp";
import jovianPlanetImage from "../assets/planets/Jovian.webp";
import junglePlanetImage from "../assets/planets/Jungle.webp";
import oceanPlanetImage from "../assets/planets/Ocean.webp";
import rockyPlanetImage from "../assets/planets/Rocky.webp";
import shatteredPlanetImage from "../assets/planets/Shattered.webp";
import taintedPlanetImage from "../assets/planets/Tainted.webp";
import vitalPlanetImage from "../assets/planets/Vital.webp";
import { match } from "ts-pattern";
import { uuid } from "./utils";

export type PlanetProps = {
  star: Star;
  id?: string;
  name: string;
  life: string;
  feature: string;
  atmosphere: string;
  variant: PlanetVariant;
  spaceObservation: string;
  coordinates?: Coordinates;
};

export class Planet {
  private _name: PlanetProps["name"];
  private _star: PlanetProps["star"];
  private _life: PlanetProps["life"];
  private _variant: PlanetProps["variant"];
  private _feature: PlanetProps["feature"];
  private _atmosphere: PlanetProps["atmosphere"];
  private _coordinates: PlanetProps["coordinates"];
  private _id: Exclude<PlanetProps["id"], undefined>;
  private _spaceObservation: PlanetProps["spaceObservation"];
  private _settlementsManager: SettlementsManager<"PLANETSIDE" | "ORBITAL">;

  constructor({
    id = uuid(),
    star,
    name,
    life,
    variant,
    feature,
    atmosphere,
    coordinates,
    spaceObservation,
  }: PlanetProps) {
    this._id = id;
    this._name = name;
    this._star = star;
    this._life = life;
    this._variant = variant;
    this._feature = feature;
    this._atmosphere = atmosphere;
    this._coordinates = coordinates;
    this._spaceObservation = spaceObservation;
    this._settlementsManager = new SettlementsManager({ parent: this });
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get life() {
    return this._life;
  }

  get variant() {
    return this._variant;
  }

  get oracleVariant() {
    return match<
      PlanetVariant,
      | "desert"
      | "furnace"
      | "grave"
      | "ice"
      | "jovian"
      | "jungle"
      | "ocean"
      | "rocky"
      | "shattered"
      | "tainted"
      | "vital"
    >(this._variant)
      .with("DESERT", () => "desert")
      .with("FURNACE", () => "furnace")
      .with("GRAVE", () => "grave")
      .with("ICE", () => "ice")
      .with("JOVIAN", () => "jovian")
      .with("JUNGLE", () => "jungle")
      .with("OCEAN", () => "ocean")
      .with("ROCKY", () => "rocky")
      .with("SHATTERED", () => "shattered")
      .with("TAINTED", () => "tainted")
      .with("VITAL", () => "vital")
      .exhaustive();
  }

  get variantDescription() {
    return match(this._variant)
      .with("DESERT", () => "Desert")
      .with("FURNACE", () => "Furnace")
      .with("GRAVE", () => "Grave")
      .with("ICE", () => "Ice")
      .with("JOVIAN", () => "Jovian")
      .with("JUNGLE", () => "Jungle")
      .with("OCEAN", () => "Ocean")
      .with("ROCKY", () => "Rocky")
      .with("SHATTERED", () => "Shattered")
      .with("TAINTED", () => "Tainted")
      .with("VITAL", () => "Vital")
      .otherwise(() => "Unknown");
  }

  get feature() {
    return this._feature;
  }

  get atmosphere() {
    return this._atmosphere;
  }

  get spaceObservation() {
    return this._spaceObservation;
  }

  get star() {
    return this._star;
  }

  get image() {
    return match(this._variant)
      .with("DESERT", () => desertPlanetImage)
      .with("FURNACE", () => furnacePlanetImage)
      .with("GRAVE", () => gravePlanetImage)
      .with("ICE", () => icePlanetImage)
      .with("JOVIAN", () => jovianPlanetImage)
      .with("JUNGLE", () => junglePlanetImage)
      .with("OCEAN", () => oceanPlanetImage)
      .with("ROCKY", () => rockyPlanetImage)
      .with("SHATTERED", () => shatteredPlanetImage)
      .with("TAINTED", () => taintedPlanetImage)
      .with("VITAL", () => vitalPlanetImage)
      .otherwise(() => undefined);
  }

  set coordinates(coordinates: undefined | Coordinates) {
    this._coordinates = coordinates;
  }

  get coordinates() {
    return !this._coordinates ? undefined : { ...this._coordinates };
  }

  get settlements() {
    return this._settlementsManager.settlements;
  }

  get hasSettlements() {
    return this.settlements.length > 0;
  }

  get settlementsManager() {
    return this._settlementsManager;
  }
}
