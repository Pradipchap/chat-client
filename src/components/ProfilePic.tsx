import classNames from "../../utils/classNames";
import { useAppSelector } from "../../utils/reduxHooks";
import StaticImg from "../assets/avatar.svg";

export default function ProfilePic({
  className = "",
  image = null,
}: {
  className?: string;
  image?: string | null;
}) {
  const sessionImg = useAppSelector((state) => state.currentUser.image);
  const profileImage = image || sessionImg || StaticImg;
  return (
    <img
      alt="profile pic"
      src={profileImage}
      className={classNames("h-50 w-50 rounded-full", className)}
    />
  );
}
