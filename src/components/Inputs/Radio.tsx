import classNames from "@/utils/classNames";
import React, { InputHTMLAttributes } from "react";

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label1: string;
  label2: string;
  labelClassName?: string;
}

export default function Radio({
  name,
  label1,
  label2,
  labelClassName,
  ...rest
}: RadioProps) {
  return (
    <div className="flex w-full items-center gap-10" onChange={rest.onChange}>
      <label
        htmlFor={name}
        className={classNames(
          "flex gap-2 items-center justify-center text-xl text-customBlue",
          labelClassName,
        )}
      >
        <input
          className=" h-5 w-5  box-border checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-customRed focus:outline-none border rounded-full border-customRed  cursor-pointer checked:ring-1 checked:ring-customRed checked:bg-customRed checked:border-white checked:border-[5px]"
          name={name}
          defaultChecked
          required
          id={label1}
          value={label1.toLowerCase()}
          type="radio"
        />
        {label1}
      </label>
      <label
        htmlFor={name}
        className={classNames(
          "flex gap-2 items-center justify-center text-xl text-customBlue",
          labelClassName,
        )}
      >
        <input
          className=" h-5 w-5  box-border checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-customRed focus:outline-none border rounded-full border-customRed  cursor-pointer checked:ring-1 checked:ring-customRed checked:bg-customRed checked:border-white checked:border-[5px]"
          name={name}
          required
          id={label2}
          value={label2.toLowerCase()}
          type="radio"
        />
        {label2}
      </label>
    </div>
  );
}
