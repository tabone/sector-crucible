import { match } from "ts-pattern";
import type { Coordinates, StarVariant } from "./models";
import { Planet, type PlanetProps } from "./Planet";
import type { Sector } from "./Sector";
import { SettlementsManager } from "./SettlementsManager";
import { uuid } from "./utils";

import artificialStarImage from "../assets/stars/artificial.png";
import blackHoleImage from "../assets/stars/black.png";
import blueStarImage from "../assets/stars/blue.png";
import corruptedStarImage from "../assets/stars/corrupted.png";
import hypergiantStarImage from "../assets/stars/hypergiant.png";
import neutronStarImage from "../assets/stars/neutron.png";
import orangeStarImage from "../assets/stars/orange.png";
import redStarImage from "../assets/stars/red.png";
import twoStarImage from "../assets/stars/two.png";
import unstableStarImage from "../assets/stars/unstable.png";
import whiteStarImage from "../assets/stars/white.png";
import yellowStarImage from "../assets/stars/yellow.png";
import youngStarImage from "../assets/stars/young.png";

export type StarProps = {
  id?: string;
  sector: Sector;
  variant: StarVariant;
};

export class Star {
  private _sector: StarProps["sector"];
  private _variant: StarProps["variant"];
  private _planets: Record<string, Planet>;
  private _id: Exclude<StarProps["id"], undefined>;
  private _settlementsManager: SettlementsManager<"ORBITAL">;

  constructor({ id = uuid(), sector, variant }: StarProps) {
    this._id = id;
    this._planets = {};
    this._sector = sector;
    this._variant = variant;
    this._settlementsManager = new SettlementsManager({ parent: this });
  }

  get id() {
    return this._id;
  }

  get code() {
    const code = match(this.variant)
      .with("RED", () => "R")
      .with("ORANGE", () => "O")
      .with("YELLOW", () => "Y")
      .with("BLUE", () => "E")
      .with("YOUNG", () => "G")
      .with("WHITE_DWARF", () => "W")
      .with("CURRUPTED", () => "C")
      .with("NEUTRON", () => "N")
      .with("TWO", () => "T")
      .with("BLACK_HOLE", () => "B")
      .with("HYPERGIANT", () => "H")
      .with("ARTIFICIAL", () => "A")
      .with("UNSTABLE", () => "S")
      .otherwise(() => "U");

    return `${this.sector.code}|${code}`;
  }

  get name() {
    return match(this.variant)
      .with("RED", () => "Red Star")
      .with("ORANGE", () => "Orange Star")
      .with("YELLOW", () => "Yellow Star")
      .with("BLUE", () => "Blue Star")
      .with("YOUNG", () => "Young Star")
      .with("WHITE_DWARF", () => "White Dwarf")
      .with("CURRUPTED", () => "Currupted Star")
      .with("NEUTRON", () => "Neutron Star")
      .with("TWO", () => "Two Stars")
      .with("BLACK_HOLE", () => "Black Hole")
      .with("HYPERGIANT", () => "Hypergiant")
      .with("ARTIFICIAL", () => "Artificial Star")
      .with("UNSTABLE", () => "Unstable Star")
      .otherwise(() => "Unknown");
  }

  get image() {
    return match(this.variant)
      .with("RED", () => redStarImage)
      .with("ORANGE", () => orangeStarImage)
      .with("YELLOW", () => yellowStarImage)
      .with("BLUE", () => blueStarImage)
      .with("YOUNG", () => youngStarImage)
      .with("WHITE_DWARF", () => whiteStarImage)
      .with("CURRUPTED", () => corruptedStarImage)
      .with("NEUTRON", () => neutronStarImage)
      .with("TWO", () => twoStarImage)
      .with("BLACK_HOLE", () => blackHoleImage)
      .with("HYPERGIANT", () => hypergiantStarImage)
      .with("ARTIFICIAL", () => artificialStarImage)
      .with("UNSTABLE", () => unstableStarImage)
      .otherwise(() => undefined);
  }

  get description() {
    return match(this.variant)
      .with("RED", () => "Smoldering smoldering red star")
      .with("ORANGE", () => "Glowing orange star")
      .with("YELLOW", () => "Burning yellow star")
      .with("BLUE", () => "Blazing blue star")
      .with("YOUNG", () => "Young star incubating in a molecular cloud")
      .with("WHITE_DWARF", () => "White dwarf shining with spectral light")
      .with("CURRUPTED", () => "Currupted star radiating with unnatural light")
      .with(
        "NEUTRON",
        () => "Neutron star surrounded by intense magnetic fields",
      )
      .with(
        "TWO",
        () => "Two stars in close orbit connecting by fiery tendrils of energy",
      )
      .with(
        "BLACK_HOLE",
        () => "Black hole allows nothing to escape - not even light",
      )
      .with(
        "HYPERGIANT",
        () => "Hypergiant star generating turbulent solar winds",
      )
      .with(
        "ARTIFICIAL",
        () => "Artificial star constructed by long-dead civilization",
      )
      .with(
        "UNSTABLE",
        () => "Unstable star showing signs of impending supernova",
      )
      .otherwise(() => "Unknown");
  }

  get sector() {
    return this._sector;
  }

  get coordinates() {
    return this._sector.region.universe.sectorCenter;
  }

  get variant() {
    return this._variant;
  }

  get planets() {
    return Object.values(this._planets);
  }

  getPlanetByCoords(coords: Coordinates) {
    return this.planets.find(
      (planet) =>
        planet.coordinates &&
        planet.coordinates.x === coords.x &&
        planet.coordinates.y === coords.y,
    );
  }

  get settlements() {
    return this._settlementsManager.settlements;
  }

  get hasSettlements() {
    return this.settlements.length > 0;
  }

  get hasPlanets() {
    return this.planets.length > 0;
  }

  get settlementsManager() {
    return this._settlementsManager;
  }

  createPlanet(props: Omit<PlanetProps, "star">) {
    const planet = new Planet({ ...props, star: this });

    this._planets[planet.id] = planet;

    return planet;
  }

  removePlanet(id: Planet["id"]) {
    delete this._planets[id];
  }
}
