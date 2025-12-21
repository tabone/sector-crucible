type UseClassnameProps = {
  classNames: Array<string | undefined>;
};

export const useClassname = ({ classNames }: UseClassnameProps) =>
  classNames.filter((className) => className).join(" ");
