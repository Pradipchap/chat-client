import { useLocation } from "react-router-dom";
import CustomLink from "../components/CustomLink";
import Friends from "../components/Friends";
import { UserNavigationItems } from "../../utils/constants";

export default function Navigation() {
  const location = useLocation().pathname.split("/")[1];
  if (location === "profile") return null;


  return (
    <div className="w-[25%] bg-gray-100/60">
      {location === "chat" ? (
        <Friends />
      ) : (
        <div className="px-5 py-10 flex flex-col gap-2 items-start border-r min-h-screen">
          {UserNavigationItems.map((item) => {
            return (
              <CustomLink
                key={item.url}
                to={item.url}
                icon={item.icon}
                iconClassName="text-black"
                className={`w-full bg-transparent hover:bg-gray-200/10 ${
                  location === item.url
                    ? "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-100 via-gray-200 to-gray-100"
                    : ""
                } gap-5 justify-start text-xl py-3`}
              >
                {item.name}
              </CustomLink>
            );
          })}
        </div>
      )}
    </div>
  );
}
