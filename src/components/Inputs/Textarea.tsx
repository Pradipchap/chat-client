"use client";

import classNames from "@/utils/classNames";
import {
  ErrorTextProps,
  TextareaProps,
} from "@/interfaces/ComponentInterfaces";
import Label from "./Label";

export default function Textarea({
  name,
  label,
  labelClassName = "",
  className = "",
  error,
  errorClassName = "",
  containerClassName = "",
  errorAlignment = "bottom",
  ...rest
}: TextareaProps) {
  return (
    <div className="space-y-1 relative">
      {label && (
        <Label
          label={label}
          htmlFor={name}
          className={labelClassName + "mb-1"}
        />
      )}
      <div
        className={classNames(
          `h-11 text-base font-[400] text-customInputText flex justify-center items-center`,
          containerClassName,
        )}
      >
        <textarea
          aria-invalid="true"
          aria-errormessage={name}
          aria-label={name}
          name={name}
          id={name}
          className={classNames(
            `h-full px-2 outline-none w-full rounded-[4px] border ${
              error ? "border-red-600" : "border-customInputBorder"
            }`,
            className,
          )}
          {...rest}
        />
      </div>
      {error && (
        <ErrorText
          name={name}
          error={error}
          className={errorClassName}
          alignment={errorAlignment}
        />
      )}
    </div>
  );
}

export const ErrorText = ({
  error,
  name,
  className,
  alignment = "bottom",
}: ErrorTextProps) => (
  <span
    data-testid={name}
    className={classNames(
      "text-red-500 text-sm",
      alignment === "topRight" && "absolute top-0 right-0",
      className,
    )}
  >
    {error}
  </span>
);
