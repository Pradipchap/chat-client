import classNames from "../../../utils/classNames";
import { InputHTMLAttributes } from "react";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  labelClassName?: string;
  containerClassName?: string;
}

export default function Checkbox({
  label,
  name,
  labelClassName,
  containerClassName,
  ...rest
}: CheckboxProps) {
  return (
    <div
      className={classNames(
        "flex justify-center items-center gap-2",
        containerClassName,
      )}
    >
      <input
        type="checkbox"
        name={name}
        id={name}
        className="h-4 w-4 rounded-sm accent-customBlue"
        {...rest}
      />
      <label
        htmlFor={name}
        className={classNames("text-base font-medium", labelClassName)}
      >
        {label}
      </label>
    </div>
  );
}
