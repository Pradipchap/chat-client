import { Link } from "react-router-dom";
import {
  ChatterDetailsInterface,
  ChatterInterface,
} from "../../interfaces/dataInterfaces";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { updateCurrentChatter } from "../../redux/slices/ChatSlice";
import useDateDetails from "../../functions/useDateDetails";
import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../../utils/constants";

export default function FriendBox({
  chatterID,
  _id,
  message,
  whoMessaged,
  datetime,
}: ChatterInterface) {
  const { userID: primaryChatter, accessToken } = useAppSelector(
    (state) => state.currentUser
  );
  const currentChat = useAppSelector((state) => state.chat);

  const [details, setDetails] = useState<ChatterDetailsInterface | null>(null);
  const isActive =
    currentChat.secondaryChatter === details?.participantDetails._id;
  const timePassed = useDateDetails(
    new Date(datetime?datetime:details?.latestMessage?.datetime || new Date())
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getChatterDetails() {
      try {
        const response = await fetch(`${SERVER_BASE_URL}/api/getChatter`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + accessToken,
          },
          body: JSON.stringify({ requestID: chatterID }),
        });
        const result: ChatterDetailsInterface = await response.json();
        setDetails(result);
      } catch (error) {
        console.log(error);
      }
    }
    getChatterDetails();
  }, []);

  if (typeof _id === "undefined") {
    return null;
  }

  function updateChatter() {
    dispatch(
      updateCurrentChatter({
        primaryChatter: primaryChatter,
        secondaryChatter: chatterID,
      })
    );
    console.log(primaryChatter,chatterID)
    console.log("updated");
  }
  return (
    <Link
      to={`chat/${chatterID}`}
      onClick={updateChatter}
      className={`${
        isActive ? "bg-gray-700" : "b"
      } px-2 rounded-lg flex items-center h-16 gap-3 mt-2 w-full`}
    >
      <div className="relative w-14 h-14 bg-red-500 rounded-full">
        {/* <img
          src={image}
          alt="user image"
          height={20}
          width={20}
          className="h-full w-full rounded-full"
        /> */}
        <div className="h-3 w-3 bg-green-600 rounded-full absolute bottom-[2%] right-[10%]" />
      </div>

      <div className="flex-1 h-full py-1 flex flex-col justify-start items-start">
        {" "}
        <p className="text-lg font-bold text-white">
          {details?.participantDetails.username}
        </p>
        <div className="flex justify-between items-center gap-2 pt-1 text-gray-400">
          {message ? (
            <p className="text-[13px] max-w-32 truncate ">
              {whoMessaged === primaryChatter
                ? "you"
                : details?.participantDetails.username.slice(0, 5)}{" "}
              : {message}
            </p>
          ) : (
            <p className="text-[13px] max-w-32 truncate ">
              {details?.latestMessage?.sender === primaryChatter
                ? "you"
                : details?.participantDetails.username.slice(0, 5)}{" "}
              : {details?.latestMessage?.message}
            </p>
          )}
            <p className="text-[10px]">{timePassed}</p>
        </div>
      </div>
    </Link>
  );
}
