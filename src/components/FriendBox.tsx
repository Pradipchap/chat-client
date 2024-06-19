import { Link, useNavigate } from "react-router-dom";
import {
  ChatterDetailsInterface,
  ChatterInterface,
} from "../../interfaces/dataInterfaces";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import {
  updateChatterDetails,
  updateSeenStatus,
} from "../../redux/slices/ChatSlice";
import useDateDetails from "../../functions/useDateDetails";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { SERVER_BASE_URL } from "../../utils/constants";
import sendSocketMessage from "../../functions/sendSocketMessage";
import { WsContext } from "../../utils/WsProvider";
import useGetChatter from "../../customHooks/useGetChatter";

export default function FriendBox({
  chatterID,
  _id,
  message,
  whoMessaged,
  datetime,
}: ChatterInterface) {
  const wsClient = useContext(WsContext);

  const { userID: primaryChatter, accessToken } = useAppSelector(
    (state) => state.currentUser
  );
  const secondaryChatter = useGetChatter();
  const secondaryChatterFromRedux = useAppSelector(
    (state) => state.chat.secondaryChatter
  );

  const [details, setDetails] = useState<ChatterDetailsInterface | null>(null);
  const isActive = useMemo(
    () => secondaryChatter === details?.participantDetails._id,
    [secondaryChatter, details]
  );
  const timePassed = useDateDetails(
    new Date(
      datetime ? datetime : details?.latestMessage?.datetime || new Date()
    )
  );

  const [isMsgWhite, setIsMsgWhite] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
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
        console.log(primaryChatter, result?.participantDetails._id);
        const probableChatterID = result?.participantDetails._id;
        if (secondaryChatterFromRedux === probableChatterID) {
          dispatch(
            updateChatterDetails({
              name: result?.participantDetails.username,
              image: result.participantDetails.image,
            })
          );
          navigate(`/chat/${probableChatterID}`);
        }
        if (result?.seen) {
          setIsMsgWhite(false);
          dispatch(updateSeenStatus(true));
        } else {
          setIsMsgWhite(true);
        }
      } catch (error) {
        //console.log(error);
      }
    }
    getChatterDetails();
  }, []);

  useEffect(() => {
    if (wsClient instanceof WebSocket && isActive && isMsgWhite) {
      setIsMsgWhite(false);
      sendSocketMessage({
        sender: primaryChatter,
        receiver: chatterID || "",
        type: "msgSeen",
        data: new Blob([]),
        wsClient: wsClient,
      });
    }
  }, [isActive, message]);

  useLayoutEffect(() => {
    function handleMsgWhite() {
      console.log(isActive, message);
      // if (message) {
      //   if (!isActive) setIsMsgWhite(true);
      //   else setIsMsgWhite(false);
      //   return;
      // } else {
      //   if (details?.seen) {
      //     setIsMsgWhite(false);
      //   } else {
      //     setIsMsgWhite(true);
      //   }
      // }
      if (isActive) {
        setIsMsgWhite(false);
      } else {
        if (typeof message !== "undefined") {
          console.log("first");
          setIsMsgWhite(true);
          return;
        }
        if (whoMessaged === chatterID) {
          console.log("ads");
          setIsMsgWhite(true);
          return;
        } else {
          setIsMsgWhite(false);
          return;
        }
      }
    }

    handleMsgWhite();
  }, [message]);

  if (typeof _id === "undefined") {
    return null;
  }

  function updateChatter() {
    dispatch(
      updateChatterDetails({
        primaryChatter: primaryChatter,
        secondaryChatter: chatterID,
        name: details?.participantDetails.username,
        image: details?.participantDetails.image,
      })
    );
    // dispatch(updateChatterName(details?.participantDetails.username));
    //console.log(primaryChatter, chatterID);
    //console.log("updated");
  }
  return (
    <Link
      to={`/chat/${chatterID}`}
      onClick={updateChatter}
      className={`${
        isActive ? "bg-stone-900/20" : "hover:bg-gray-400/20"
      } px-2  rounded-lg flex items-center h-16 gap-3 mt-2 w-full`}
    >
      <div className="relative w-12 h-12 bg-red-500 rounded-full">
        {/* <img
          src={image}
          alt="user image"
          height={20}
          width={20}
          className="h-full w-full rounded-full"
        /> */}
        {details?.isActive && (
          <div className="h-3.5 w-3.5 bg-green-600 rounded-full absolute bottom-[2%] right-[10%]" />
        )}
      </div>
      <div className="flex-1 h-full py-1 flex flex-col justify-start items-start">
        {" "}
        <p className="text-lg font-medium text-gray-700">
          {details?.participantDetails.username}
        </p>
        <div
          className={`flex justify-between items-center gap-2 pt-1 ${
            isMsgWhite ? "text-red-600 font-black" : "text-gray-700 font-normal"
          }`}
        >
          {message ? (
            <p className="text-[13px] max-w-32 truncate ">
              {whoMessaged === primaryChatter
                ? "you"
                : details?.participantDetails.username.slice(0, 5)}{" "}
              : {message}
            </p>
          ) : (
            <p className={`text-[13px] max-w-32 truncate`}>
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
