import classNames from "../../utils/classNames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faSearch,
  faXmark,
  faArrowRightFromBracket,
  faCalendarDays,
  faChevronDown,
  faCloudArrowUp,
  faCheck,
  faPlus,
  faUserGroup,
  faChevronRight,
  faChevronLeft,
  faFolder,
  faFile,
  faEllipsisVertical,
  faLock,
  faLockOpen,
  faPenToSquare,
  faPen,
  faExclamation,
  faRightFromBracket,
  faBookOpen,
  faPhone,
  faLeftLong,
  faGear,
  faMessage,
  faUserPlus,
  faEdit,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { faSpinner, faQuestion } from "@fortawesome/free-solid-svg-icons";
import {
  faBell,
  faClock,
  faEye,
  faEyeSlash,
  faFilePdf,
  faFloppyDisk,
  faTrashCan,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
interface IconProps {
  name: string;
  className?: string;
}

export default function Icon({ name, className = "" }: IconProps) {
  switch (name) {
    case "Call":
      return (
        <FontAwesomeIcon
          icon={faPhone}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Dashboard":
      return (
        <FontAwesomeIcon
          icon={faGaugeHigh}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Logout":
      return (
        <FontAwesomeIcon
          icon={faArrowRightFromBracket}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Notification":
      return (
        <FontAwesomeIcon
          icon={faBell}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Close":
      return (
        <FontAwesomeIcon
          icon={faXmark}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Message":
      return (
        <FontAwesomeIcon
          icon={faMessage}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Search":
      return (
        <FontAwesomeIcon
          icon={faSearch}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Profile":
      return (
        <FontAwesomeIcon
          icon={faUser}
          className={classNames("text-black text-lg", className)}
        />
      );
    // case "Users":
    //   return (
    //     <FontAwesomeIcon
    //       icon={faUsers}
    //       className={classNames("text-black text-lg", className)}
    //     />
    //   );
    case "Calendar":
      return (
        <FontAwesomeIcon
          icon={faCalendarDays}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Setting":
      return (
        <FontAwesomeIcon
          icon={faGear}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Down":
      return (
        <FontAwesomeIcon
          icon={faChevronDown}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Check":
      return (
        <FontAwesomeIcon
          icon={faCheck}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Plus":
      return (
        <FontAwesomeIcon
          icon={faPlus}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Upload":
      return (
        <FontAwesomeIcon
          icon={faCloudArrowUp}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "File":
      return (
        <FontAwesomeIcon
          icon={faFilePdf}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Eye":
      return (
        <FontAwesomeIcon
          icon={faEye}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Users":
      return (
        <FontAwesomeIcon
          icon={faUserGroup}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "FriendRequest":
      return (
        <FontAwesomeIcon
          icon={faUserPlus}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Clock":
      return (
        <FontAwesomeIcon
          icon={faClock}
          className={classNames("text-black text-lg", className)}
        />
      );
      case "Edit":
      return (
        <FontAwesomeIcon
          icon={faEdit}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "UserEdit":
      return (
        <FontAwesomeIcon
          icon={faUserEdit}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Delete":
      return (
        <FontAwesomeIcon
          icon={faTrashCan}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Phone":
      return (
        <FontAwesomeIcon
          icon={faPhone}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Right":
      return (
        <FontAwesomeIcon
          icon={faChevronRight}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Left":
      return (
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Question":
      return (
        <FontAwesomeIcon
          icon={faQuestion}
          className={classNames("text-black text-lg", className)}
        />
      );
    case "Back":
      return (
        <FontAwesomeIcon
          icon={faLeftLong}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Folder":
      return (
        <FontAwesomeIcon
          icon={faFolder}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "NormalFile":
      return (
        <FontAwesomeIcon
          icon={faFile}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "ThreeDots":
      return (
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Locked":
      return (
        <FontAwesomeIcon
          icon={faLock}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Unlocked":
      return (
        <FontAwesomeIcon
          icon={faLockOpen}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Write":
      return (
        <FontAwesomeIcon
          icon={faPenToSquare}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Exclamation":
      return (
        <FontAwesomeIcon
          icon={faExclamation}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Loading":
      return (
        <FontAwesomeIcon
          icon={faSpinner}
          className={classNames("text-lg text-black animate-spin", className)}
        />
      );
    case "Save":
      return (
        <FontAwesomeIcon
          icon={faFloppyDisk}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Exit":
      return (
        <FontAwesomeIcon
          icon={faRightFromBracket}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Blog":
      return (
        <FontAwesomeIcon
          icon={faBookOpen}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "EyeSlash":
      return (
        <FontAwesomeIcon
          icon={faEyeSlash}
          className={classNames("text-lg text-black", className)}
        />
      );
    case "Google":
      return (
        <FontAwesomeIcon
          icon={"google"}
          className={classNames("text-lg text-black", className)}
        />
      );
    default:
      return (
        <FontAwesomeIcon
          icon={faPen}
          className={classNames("text-lg text-black", className)}
        />
      );
  }
}
