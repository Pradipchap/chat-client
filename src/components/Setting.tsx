import { useNavigate } from "react-router-dom";
import Loginstatus from "./Loginstatus";
import PopupOver from "./Popups/Popup";
import Button from "./Button";
import { icon } from "leaflet";

export default function Setting() {
  return (
    <div className="absolute bottom-0 w-full right-0 px-2 h-12 flex bg-gray-600 justify-between items-center">
      <p>asd</p>
      <PopupOver content={<Content />} targetIndependent={true}>
        <Loginstatus className="rounded-full bg-transparent" />
      </PopupOver>
    </div>
  );
}

function Content() {
  const navigate = useNavigate();
  return (
    <div className="py-4 px-2 w-44 bg-blue-900 shadow-md rounded">
      {[
        { name: "Profile", url: "profile", iconName: "Profile" },
        { name: "Friends", url: "friends/friends", iconName: "Users" },
        { name: "Setting", url: "setting", iconName: "Setting" },
      ].map((element) => {
        return (
          <Button
            key={element.name}
            onClick={() => navigate(`/${element.url}`)}
            className="bg-transparent w-full justify-around hover:bg-white/5"
            icon={element.iconName}
            iconClassName="text-white"
          >
            {element.name}
          </Button>
        );
      })}
    </div>
  );
}
