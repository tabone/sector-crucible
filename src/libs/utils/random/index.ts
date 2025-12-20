import seedrandom from "seedrandom";

type RandomProps = {
  seed: string;
};

export class Random {
  private _seed;
  private _random: seedrandom.PRNG;

  constructor({ seed }: RandomProps) {
    this._seed = seed;
    this._random = seedrandom(seed, { state: true });
  }

  get seed() {
    return this._seed;
  }

  get state() {
    // @ts-expect-error SeedRandom types need to be updated.
    return this._random.state();
  }

  /**
   * Get a random integer between min (inclusive) & max (exclusive).
   * @param max maximum
   * @param min minimum
   * @returns random integer
   */
  int(max: number, min: number = 0) {
    return Math.floor(this._random.quick() * (max - min)) + min;
  }

  /**
   * Get a random boolean
   * @returns random boolean
   */
  bool() {
    return this._random.quick() > 0.5;
  }
}
