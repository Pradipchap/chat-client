import { lazy } from "react";
import Icon from "./Icon";
import { Link, useLocation } from "react-router-dom";
import { UserNavigationItems } from "../../utils/constants";
const Loginstatus = lazy(() => import("./Loginstatus"));

const items = [
  { link: "chat", children: <Icon name="Message" className="text-inherit" /> },
  { link: "friends", children: <Icon name="Users" className="text-inherit" /> },
];
export default function Setting() {
  const location = useLocation().pathname.split("/")[1];
  const isFriendsActive = UserNavigationItems.some((item) => {
    return location === item.url;
  });

  return (
    <div className="px-2 min-h-screen max-w-16 min-w-14 bg-gray-200/70 flex flex-col py-10 gap-5 border-t border-gray-300 justify-start items-center">
      {items.map((item, index) => {
        return (
          <Link
            to={`/${item.link}`}
            key={item.link}
            className={` rounded-lg flex items-center justify-center w-full h-12 ${
              item.link === location || (index === 1 && isFriendsActive)
                ? "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-blue-400 to-blue-600 text-gray-300"
                : "text-gray-500"
            } `}
          >
            {item.children}
          </Link>
        );
      })}
      <Link
        to={`/profile`}
        className={`rounded-lg mt-auto flex items-center justify-center w-full h-12`}
      >
        <Loginstatus className="rounded-full" />
      </Link>
    </div>
  );
}
