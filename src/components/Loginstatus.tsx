import { ButtonHTMLAttributes } from "react";
import classNames from "../../utils/classNames";
import { useAppSelector } from "../../utils/reduxHooks";
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
          {/* <img
            src={session?.user?.image}
            alt="user image"
            height={50}
            width={50}
            className="h-10 w-10 rounded-full"
          /> */}
          <div className="h-8 w-8 rounded-full bg-blue-700"></div>
          <p>{session.username}</p>
        </>
      )}
    </button>
  );
}
