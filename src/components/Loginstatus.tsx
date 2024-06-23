import { ButtonHTMLAttributes } from "react";
import classNames from "../../utils/classNames";
import { useAppSelector } from "../../utils/reduxHooks";
import ProfilePic from "./ProfilePic";
interface props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}
export default function Loginstatus({ className, ...rest }: props) {
  const session = useAppSelector((state) => state.currentUser);
  return (
    <button
      {...rest}
      className={classNames(
        "flex items-center gap-2 bg-red-500 px-4 py-2 text-gray-7--",
        className
      )}
    >
      {session.accessToken && (
        <>
          <ProfilePic />
          <p>{session.username}</p>
        </>
      )}
    </button>
  );
}
