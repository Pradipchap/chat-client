import { LabelProps } from "../../../interfaces/ComponentInterfaces";
import classNames from "../../../utils/classNames";

export default function Label({ label, className, ...rest }: LabelProps) {
  return (
    <label
      {...rest}
      className={classNames(
        "text-customInputText mb-3 flex flex-col",
        className,
      )}
    >
      {label}
    </label>
  );
}
