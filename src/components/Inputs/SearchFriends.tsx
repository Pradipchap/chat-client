import { useEffect, useState } from "react";
import Icon from "../Icon";
import useDebounce from "../../../customHooks/useDebounce";
import { FriendBoxInterface } from "../../../interfaces/dataInterfaces";
import { SERVER_BASE_URL } from "../../../utils/constants";
import PopupOver from "../Popups/Popup";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../utils/reduxHooks";
export default function SearchFriends() {
  const [input, setInput] = useState("");
  const [userList, setUserList] = useState<FriendBoxInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useAppSelector((state) => state.currentUser.accessToken);
  const debouncedValue = useDebounce(input);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const response = await fetch(SERVER_BASE_URL + "/api/users/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + accessToken,
          },
          body: JSON.stringify({ searchString: debouncedValue }),
        });
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        setUserList(data.users);
      } catch (error) {
        //console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (debouncedValue !== "") getData();
  }, [debouncedValue]);

  return (
    <div className="w-full flex justify-end items-center px-5 h-20 bg-blue-900 relative">
      <PopupOver
        content={<Content users={userList} isLoading={isLoading} />}
        targetIndependent={false}
      >
        <div className="absolute top-1/2 -translate-y-1/2 w-[400px] min-w-[100px] mx-auto">
          <div className="relative flex items-center border-gray-200 border w-full h-11 rounded-s-sm shadow-lg transition-all focus-within:shadow-lg bg-white">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <Icon name="Search" />
            </div>
            <input
              className="peer h-full w-full outline-none text-lg text-gray-700 pr-2"
              type="text"
              value={input}
              id="search"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search something.."
            />
          </div>
        </div>
      </PopupOver>
    </div>
  );
}
function Content({
  users,
  isLoading,
}: {
  users: FriendBoxInterface[];
  isLoading: boolean;
}) {
  return (
    <div className="w-full min-h-32 flex px-2 py-5 mt-8 bg-white rounded-sm shadow-md flex-col gap-1">
      {isLoading && <Icon name="Loading" className=" animate-spin" />}
      {users.length > 0 ? (
        users.map((user) => {
          return (
            <EachResult
              userID={user._id}
              email={user.email}
              username={user.username}
            />
          );
        })
      ) : (
        <div>Sorry , No results</div>
      )}
    </div>
  );
}
function EachResult({
  username,
  email,
  userID,
}: {
  username: string;
  email: string;
  userID: string;
}) {
  const navigate = useNavigate();
  function navigateToProfile() {
    navigate(`userProfile/${userID}`);
  }
  return (
    <div
      onClick={navigateToProfile}
      className="flex w-full hover:bg-slate-300/30 gap-3 py-2 px-2 rounded-sm transition-all"
    >
      <div className="bg-red-600 rounded-full w-12 h-12"></div>
      <div className="flex-1 flex-col">
        <p className="text-lg">{username}</p>
        <p className="text-gray-500 text-sm">{email}</p>
      </div>
    </div>
  );
}
