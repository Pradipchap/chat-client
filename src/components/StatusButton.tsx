import Button from "./Button";
import { SUBMIT_STATUS } from "../../utils/constants";
import classNames from "../../utils/classNames";

function StatusButton({
  requestStatus = SUBMIT_STATUS.IDLE,
  successMessage = "Accepted",
  idleMessage = "Accept Request",
  failedMessage = "Not Accepted",
  loadingMessage = "Accepting",
  onClick = () => {},
  className = "",
  idleIcon = "Friend",
  type = "submit",
}: {
  successMessage?: string;
  idleMessage?: string;
  failedMessage?: string;
  loadingMessage?: string;
  requestStatus: SUBMIT_STATUS;
  onClick?: () => void;
  className?: string;
  idleIcon?: string;
  type?: "submit" | "button" | "reset";
}) {
  const data =
    requestStatus === SUBMIT_STATUS.LOADING
      ? {
          iconName: "Loading",
          name: loadingMessage,
          iconClassName: "animate-spin text-white",
          className: "bg-yellow-700",
        }
      : requestStatus === SUBMIT_STATUS.SUCCESS
      ? {
          iconName: "Check",
          name: successMessage,
          iconClassName: "text-white",
          className: "bg-green-700",
        }
      : requestStatus === SUBMIT_STATUS.FAILED
      ? {
          iconName: "Close",
          name: failedMessage,
          iconClassName: "text-white",
          className: "bg-red-700 text-white",
        }
      : {
          iconName: idleIcon,
          name: idleMessage,
          iconClassName: "text-white",
          className: classNames("bg-blue-700", className),
        };
  return (
    <Button
      disabled={requestStatus != SUBMIT_STATUS.IDLE}
      icon={data.iconName}
      iconClassName={data.iconClassName}
      type={type}
      className={classNames("gap-2 w-full min-w-44", data.className)}
      onClick={onClick}
    >
      {data.name}
    </Button>
  );
}

export default StatusButton;
