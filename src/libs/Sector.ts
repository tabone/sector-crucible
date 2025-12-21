import type { Region } from "./Region";
import { Star, type StarProps } from "./Star";
import { SettlementsManager } from "./SettlementsManager";
import type { Coordinates } from "./models/coordinates.model";
import type { Planet } from "./Planet";
import type { Settlement } from "./Settlement";
import { Collection } from "coords-chisel";
import { Random } from "./utils";
import type { SectorCode } from "./models";
import { match } from "ts-pattern";

export type SectorProps = {
  region: Region;
  coordinates: Coordinates;
};

type EntityCoordinatesIndex = Record<
  `${number}:${number}`,
  Star | Planet | Settlement
>;

type EntitiesIndex = Array<Star | Planet | Settlement>;

export class Sector {
  private _star: null | Star;
  private _isGenerated: boolean;
  private _region: SectorProps["region"];
  private _coordinates: SectorProps["coordinates"];
  private _settlementsManager: SettlementsManager<"DEEP_SPACE">;

  private _indexes: {
    entities: null | EntitiesIndex;
    entityCoordinates: null | EntityCoordinatesIndex;
  };

  constructor({ region, coordinates }: SectorProps) {
    this._star = null;
    this._region = region;
    this._isGenerated = false;
    this._coordinates = coordinates;
    this._settlementsManager = new SettlementsManager({ parent: this });

    this._indexes = {
      entities: null,
      entityCoordinates: null,
    };
  }

  get id() {
    return `${this._coordinates.x}:${this._coordinates.y}`;
  }

  get code(): SectorCode {
    return `${this.region.code}-${this._coordinates.x}:${this._coordinates.y}`;
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

  get universeCoordinates() {
    const coordinates = this._coordinates;

    const offsetY = match(this._region.variant)
      .with("EXPANSE", () => 0)
      .with("OUTLANDS", () => this._region.height)
      .with("TERMINUS", () => this._region.height * 2)
      .otherwise(() => null);

    return offsetY === null
      ? null
      : {
          x: coordinates.x,
          y: coordinates.y + offsetY,
        };
  }

  get settlementsManager() {
    return this._settlementsManager;
  }

  get entities() {
    if (this._indexes.entities) return this._indexes.entities;

    this._indexes.entities = [
      ...(!this._star ? [] : [this._star]),
      ...(!this._star ? [] : this._star.planets),

      ...[
        ...this.settlements,
        ...(!this._star ? [] : this._star.settlements),
        ...(!this._star
          ? []
          : this._star.planets.flatMap((planet) => planet.settlements)),
      ],
    ];

    return this._indexes.entities;
  }

  get entitiesCoordinates() {
    if (this._indexes.entityCoordinates) return this._indexes.entityCoordinates;

    this._indexes.entityCoordinates =
      this.entities.reduce<EntityCoordinatesIndex>((info, entity) => {
        if (!entity.coordinates) return info;

        const id: keyof EntityCoordinatesIndex = `${entity.coordinates.x}:${entity.coordinates.y}`;

        if (info[id]) return info;

        info[id] = entity;

        return info;
      }, {});

    return this._indexes.entityCoordinates;
  }

  generate() {
    if (this._isGenerated) return;

    this.clearIndex("entityCoordinates");
    const random = new Random({ seed: this.id });

    let availableArea = Collection.createCircle({
      radius: 8,
      origin: this.region.universe.sectorCenter,
    }).minus(
      Collection.createCircle({
        origin: this.region.universe.sectorCenter,
        radius: 4,
      }),
    );

    availableArea = this.generateStar(random, availableArea);

    this.generateSettlements(random, availableArea);
  }

  private generateStar(random: Random, availableAreaProps: Collection) {
    if (!this._star) return availableAreaProps;

    const availableArea = this._star.planets.reduce((availableArea, planet) => {
      planet.coordinates =
        availableArea.coordinates[random.int(availableArea.coordinates.length)];

      const planetArea = Collection.createCircle({
        radius: 4,
        origin: planet.coordinates,
      });

      return planet.settlements
        .reduce((availableArea, settlement) => {
          if (settlement.variant === "PLANETSIDE") return availableArea;

          settlement.coordinates =
            planetArea.coordinates[random.int(planetArea.coordinates.length)];

          planetArea.minus(
            Collection.createCircle({
              radius: 1,
              origin: settlement.coordinates,
            }),
          );

          return availableArea;
        }, availableArea)
        .minus(planetArea);
    }, availableAreaProps);

    return this._star.settlements.reduce((availableArea, settlement) => {
      settlement.coordinates =
        availableArea.coordinates[random.int(availableArea.coordinates.length)];

      return availableArea.minus(
        Collection.createCircle({
          radius: 1,
          origin: settlement.coordinates,
        }),
      );
    }, availableArea);
  }

  private generateSettlements(random: Random, availableAreaProp: Collection) {
    return this.settlements.reduce((availableArea, settlement) => {
      settlement.coordinates =
        availableArea.coordinates[random.int(availableArea.coordinates.length)];

      return availableArea.minus(
        Collection.createCircle({
          radius: 1,
          origin: settlement.coordinates,
        }),
      );
    }, availableAreaProp);
  }

  clearIndex(key: keyof typeof this._indexes) {
    this._indexes[key] = null;
  }

  createStar(props: Omit<StarProps, "sector">) {
    this._star = new Star({ ...props, sector: this });
    return this._star;
  }

  removeStar() {
    this._star = null;
  }
}
