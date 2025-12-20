import { zStarVariant, type PlanetVariant, type RegionVariant } from "./models";
import { Universe, type UniverseProps } from "./Universe";
import { oracles, Random, roll } from "./utils";
import type { Region } from "./Region";
import { match } from "ts-pattern";
import type { Sector } from "./Sector";
import { makeRectangle } from "fractal-noise";
import { makeNoise2D } from "open-simplex-noise";
import type { Star } from "./Star";
import { PLANET_VARIANTS } from "./consts";
import type { Planet } from "./Planet";

export type SimulationProps = {
  seed?: number;
  settings: {
    regions: UniverseProps["regions"];
  };
};

export class Simulation {
  private _random: Random;
  private _universe: null | Universe;
  private _settings: SimulationProps["settings"];
  private _seed: Exclude<SimulationProps["seed"], undefined>;

  private _noise: Record<
    "stars" | "planets" | "population",
    ReturnType<typeof makeRectangle>
  >;

  constructor({ settings, seed = 371993 }: SimulationProps) {
    this._seed = seed;
    this._universe = null;
    this._settings = settings;
    this._random = new Random({ seed: String(seed) });

    this._noise = {
      stars: makeRectangle(
        settings.regions.width,
        settings.regions.height,
        makeNoise2D(seed * 2),
        {
          frequency: 0.04,
          octaves: 2,
        },
      ),

      planets: makeRectangle(
        settings.regions.width,
        settings.regions.height,
        makeNoise2D(seed * 3),
        {
          frequency: 0.04,
          octaves: 2,
        },
      ),

      population: makeRectangle(
        settings.regions.width,
        settings.regions.height,
        makeNoise2D(seed * 4),
        {
          frequency: 0.04,
          octaves: 2,
        },
      ),
    };
  }

  get seed() {
    return this._seed;
  }

  get random() {
    return this._random;
  }

  get universe() {
    return this._universe;
  }

  get settings() {
    return this._settings;
  }

  clearUniverse() {
    this._universe = null;
  }

  createUniverse() {
    if (this._universe) return;

    this._universe = new Universe({
      regions: this.settings.regions,
    });

    this._universe.regions.forEach((region) => this.populateRegion(region));

    return this._universe;
  }

  getStarThreshold(regionVariant: RegionVariant) {
    return match(regionVariant)
      .with("TERMINUS", () => 0.2)
      .with("OUTLANDS", () => 0.1)
      .with("EXPANSE", () => 0)
      .otherwise(() => 1);
  }

  getPlanetThreshold(regionVariant: RegionVariant) {
    return match(regionVariant)
      .with("TERMINUS", () => -0.1)
      .with("OUTLANDS", () => 0)
      .with("EXPANSE", () => 1)
      .otherwise(() => 1);
  }

  getDeepSpaceSettlementThreshold(regionVariant: RegionVariant) {
    return match(regionVariant)
      .with("TERMINUS", () => 0.2)
      .with("OUTLANDS", () => 0.3)
      .with("EXPANSE", () => 0.4)
      .otherwise(() => 1);
  }

  getDeepSpaceSettlementsAmount(regionVariant: RegionVariant, noise: number) {
    return match(regionVariant)
      .with("TERMINUS", () => {
        return noise > 0.5 ? 4 : noise > 0.3 ? 3 : 2;
      })
      .with("OUTLANDS", () => {
        return noise > 0.5 ? 3 : noise > 0.3 ? 2 : 1;
      })
      .with("EXPANSE", () => {
        return noise > 0.5 ? 2 : 1;
      })
      .otherwise(() => 1);
  }

  getSettlementThreshold(regionVariant: RegionVariant) {
    return match(regionVariant)
      .with("TERMINUS", () => 0)
      .with("OUTLANDS", () => 0.4)
      .with("EXPANSE", () => 0.6)
      .otherwise(() => 1);
  }

  getPlanetsAmount(regionVariant: RegionVariant) {
    return match(regionVariant)
      .with("TERMINUS", () => ({ min: 2, max: 4 }))
      .with("OUTLANDS", () => ({ min: 1, max: 3 }))
      .with("EXPANSE", () => ({ min: 0, max: 2 }))
      .otherwise(() => ({ min: 0, max: 0 }));
  }

  private populateRegion(region: Region) {
    for (let x = 0; x < this.settings.regions.width; x++) {
      for (let y = 0; y < this.settings.regions.height; y++) {
        const sector = region.createSector({ coordinates: { x, y } });

        let star: Star | null = null;
        const planets: Planet[] = [];

        // Stars.
        if (this._noise.stars[y][x] > this.getStarThreshold(region.variant)) {
          star = this.createStar(sector);
        }

        // Planets.
        if (
          star &&
          this._noise.planets[y][x] > this.getPlanetThreshold(region.variant)
        ) {
          const { max, min } = this.getPlanetsAmount(region.variant);

          const amount = this._random.int(max + 1, min);

          if (amount > 0) {
            for (let index = 0; index < amount; index++) {
              planets.push(this.createPlanet(star));
            }
          }
        }

        // Deep Space Settlements.
        if (
          this._noise.population[y][x] >
          this.getDeepSpaceSettlementThreshold(region.variant)
        ) {
          const amount = this.getDeepSpaceSettlementsAmount(
            region.variant,
            this._noise.population[y][x],
          );

          for (let index = 0; index < amount; index++) {
            if (star) {
              star.settlementsManager.createSettlement({
                variant: "ORBITAL",
                ...this.getSettlementOracles(region.variant),
              });
            } else {
              sector.settlementsManager.createSettlement({
                variant: "DEEP_SPACE",
                ...this.getSettlementOracles(region.variant),
              });
            }
          }
        }

        // Planet Settlements.
        if (
          planets.length > 0 &&
          this._noise.population[y][x] >
            this.getSettlementThreshold(region.variant)
        ) {
          planets.forEach((planet) => {
            const result = roll({
              random: this._random,
              options:
                oracles.planets.collections[planet.oracleVariant].collections
                  .settlements.contents[region.oracleVariant].rows,
            });

            match(result)
              .with("Orbital settlement", () => {
                planet.settlementsManager.createSettlement({
                  variant: "ORBITAL",
                  ...this.getSettlementOracles(region.variant),
                });
              })
              .with("Planetside settlement", () => {
                planet.settlementsManager.createSettlement({
                  variant: "PLANETSIDE",
                  ...this.getSettlementOracles(region.variant),
                });
              })
              .with("Multiple settlements", () => {
                for (let index = 0; index < this._random.int(5, 2); index++) {
                  planet.settlementsManager.createSettlement({
                    variant: "PLANETSIDE",
                    ...this.getSettlementOracles(region.variant),
                  });
                }
              })
              .with("Settlements in conflict", () => {
                for (let index = 0; index < this._random.int(5, 2); index++) {
                  planet.settlementsManager.createSettlement({
                    variant: "PLANETSIDE",
                    ...this.getSettlementOracles(region.variant),
                  });
                }
              });
          });
        }
      }
    }
  }

  private createStar(sector: Sector) {
    return sector.createStar({
      variant: zStarVariant.parse(
        roll({
          random: this._random,
          options: oracles.space.contents.stellar_object.rows,
        }),
      ),
    });
  }

  private createPlanet(star: Star) {
    return star.createPlanet({
      coordinates: { x: Math.random(), y: Math.random() },
      ...this.getPlanetOracles(
        PLANET_VARIANTS[this._random.int(PLANET_VARIANTS.length)],
      ),
    });
  }

  private getPlanetOracles(planetVariant: PlanetVariant) {
    const variant = match<
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
    >(planetVariant)
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
      .otherwise(() => "desert");

    const planetOracles = oracles.planets.collections[variant];

    return {
      variant: planetVariant,
      name: roll({
        max: 20,
        random: this._random,
        options: planetOracles.contents.name.rows,
      }),
      life: roll({
        random: this._random,
        options: planetOracles.contents.life.rows,
      }),
      feature: roll({
        random: this._random,
        options: planetOracles.contents.feature.rows,
      }),
      atmosphere: roll({
        random: this._random,
        options: planetOracles.contents.atmosphere.rows,
      }),
      spaceObservation: roll({
        random: this._random,
        options: planetOracles.contents.observed_from_space.rows,
      }),
    };
  }

  private getSettlementOracles(region: RegionVariant) {
    const settlementOracles = oracles.settlements.contents;

    return {
      name: roll({
        random: this._random,
        options: settlementOracles.name.rows,
      }),
      trouble: roll({
        random: this._random,
        options: settlementOracles.trouble.rows,
      }),
      projects: roll({
        random: this._random,
        options: settlementOracles.projects.rows,
      }),
      authority: roll({
        random: this._random,
        options: settlementOracles.authority.rows,
      }),
      firstLook: roll({
        random: this._random,
        options: settlementOracles.first_look.rows,
      }),
      population: roll({
        random: this._random,
        options:
          oracles.settlements.collections.population.contents[
            region === "EXPANSE"
              ? "expanse"
              : region === "OUTLANDS"
                ? "outlands"
                : "terminus"
          ].rows,
      }),
      initialContact: roll({
        random: this._random,
        options: oracles.settlements.contents.initial_contact.rows,
      }),
    };
  }
}
