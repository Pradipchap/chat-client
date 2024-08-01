import classNames from "../../utils/classNames";
import Icon from "./Icon";
import { CustomLinkProp} from "../../interfaces/componentInterfaces"
import { Link } from "react-router-dom";

export default function CustomLink(props:CustomLinkProp ) {
  const {
    icon,
    iconClassName,
    className,
    variant = "primary",
    iconAlignment = "left",
    children,
    ...rest
  } = props;

  const linkClasses = classNames(
    "p-2 text-black bg-emerald-800 rounded-md px-3 w-fit hover:bg-opacity-90 transition-all ease-linear duration-300 text-sm flex items-center justify-center",
    variant === "primary"
      ? "border-none"
      : "border-customBlue border text-gray-700 bg-transparent",
    className,
  );

  return (
    <Link {...rest} className={linkClasses}>
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
    </Link>
  );
}
