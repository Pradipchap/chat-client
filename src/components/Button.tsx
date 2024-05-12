import classNames from "../../utils/classNames";
import Icon from "./Icon";
import {ButtonProps} from "../../interfaces/componentInterfaces"

export default function Button(props: ButtonProps) {
  const {
    icon,
    iconClassName,
    className,
    variant = "primary",
    iconAlignment = "left",
    children,
    ...rest
  } = props;

  const buttonClasses = classNames(
    "p-2 text-white bg-emerald-800 rounded-md px-3 w-fit hover:bg-opacity-90 transition-all ease-linear duration-300 text-sm flex items-center justify-center",
    variant === "primary"
      ? "border-none"
      : "border-customBlue border text-gray-700 bg-transparent",
    className,
  );

  return (
    <button {...rest} className={buttonClasses}>
      {icon && iconAlignment === "left" && (
        <span className="mr-1">
          <Icon name={icon} className={iconClassName} />
        </span>
      )}
      {children}{" "}
      {icon && iconAlignment === "right" && (
        <span className="ml-1">
          <Icon name={icon} className={iconClassName} />
        </span>
      )}
    </button>
  );
}
