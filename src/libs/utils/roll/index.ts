import type { Random } from "../random";

type RollProps = {
  random: Random;
  max?: number;
  options: Array<{
    min: null | number;
    max: null | number;
    text: string;
  }>;
};

export const roll = ({ random, options, max = 100 }: RollProps) => {
  const result = random.int(max + 1, 1);

  const option = options.find((option) =>
    option.min == null || option.max == null
      ? false
      : option.min <= result && option.max >= result,
  )?.text;

  if (!option) throw new Error("roll resulted in an undefined");

  return option;
};
