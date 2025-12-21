import { useId, useMemo, type InputHTMLAttributes } from "react";
import { Text } from "../text/Text";
import { useClassname } from "../../hooks";

type TextfieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Textfield = ({
  label,
  className: classNameProp,
  type = "text",
  ...props
}: TextfieldProps) => {
  const id = useId();

  const className = useClassname({
    classNames: useMemo(
      () => [classNameProp, "flex flex-col"],
      [classNameProp],
    ),
  });

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id}>
          <Text className="uppercase">{label}</Text>
        </label>
      )}

      <input
        id={id}
        type={type}
        {...props}
        className="border bg-teal-900 border-emerald-700 text-white py-1 px-2"
      />
    </div>
  );
};
