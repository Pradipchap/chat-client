import React, { useCallback, useState } from "react";
import Select from "react-select/async-creatable";
import Label from "./Label";
import { GroupBase, OptionsOrGroups, Props } from "react-select";
import { ReactSelectOptions } from "@/interfaces/DashboardInterfaces";

interface SelectProps extends Props {
  name: string;
  label: string;
  onChange: (newValue: unknown) => void;
  defaultOptions?: boolean | OptionsOrGroups<unknown, GroupBase<unknown>>;
  onCreate?: (input: string) => void;
  fetchData: (input: string) => Promise<ReactSelectOptions[]>;
}

export default function Dropdown({
  name,
  label,
  onChange,
  onCreate,
  fetchData,
  ...rest
}: SelectProps) {
  const [value, setValue] = useState<ReactSelectOptions>();

  const debounce = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (operation: (...args: any[]) => void, delay: number = 1000) => {
      let timeoutId: ReturnType<typeof setTimeout>;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (...args: any[]) => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          operation(...args);
        }, delay);
      };
    },
    [],
  );

  const loadOptions = debounce((input: string, callback) => {
    fetchData(input).then((data) => callback(data));
  }, 1000);

  return (
    <div className="space-y-1">
      <Label htmlFor={name} label={label} />
      <Select
        value={value}
        cacheOptions
        name={name}
        classNames={{
          control: () =>
            "h-10 border border-customInputBorder !bg-transparent rounded-md",
          container: () => "",
          indicatorSeparator: () => "hidden",
          option: (state) =>
            `${state.isFocused && "!bg-customInputBorder"} ${
              state.isSelected && " !bg-transparent !text-black"
            }`,
        }}
        onCreateOption={(input) => {
          onCreate?.(input);
          const newValue = { label: input, value: input.replace(" ", "") };
          setValue({ label: input, value: input });
          onChange(newValue);
        }}
        {...rest}
        loadOptions={loadOptions}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange={(newValue: any) => {
          setValue(newValue);
          onChange(newValue);
        }}
      />
    </div>
  );
}
