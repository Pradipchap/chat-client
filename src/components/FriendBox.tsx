import { useNavigate } from "react-router-dom";
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
  Suspense,
  lazy,
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
const FriendBoxSkeleton = lazy(() => import("./Skeleton/FriendBoxSkeleton"));
import ProfileImage from "../assets/avatar.svg";

export default function FriendBox({ ...props }: ChatterInterface) {
  return (
    <Suspense fallback={<FriendBoxSkeleton />}>
      <FriendBoxUI {...props} />
    </Suspense>
  );
}

function FriendBoxUI({
  chatterID,
  _id,
  message,
  whoMessaged,
  datetime,
  relation,
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
    datetime ? datetime : details?.latestMessage?.datetime || ""
  );

  const [isMsgRed, setisMsgRed] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    async function getChatterDetails() {
      try {
        const apiEndPoint = relation === "FRIEND" ? "getChatter" : "notChatter";
        //console.log(apiEndPoint);
        const response = await fetch(`${SERVER_BASE_URL}/api/${apiEndPoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + accessToken,
          },
          body: JSON.stringify({ requestID: chatterID }),
        });
        const result: ChatterDetailsInterface = await response.json();
        setDetails(result);
        const probableChatterID = result?.participantDetails._id;
        if (secondaryChatterFromRedux === probableChatterID) {
          dispatch(
            updateChatterDetails({
              name: result?.participantDetails.username,
              secondaryChatter: result.participantDetails._id,
              image: result.participantDetails.image,
              relation: relation,
            })
          );
          navigate(`/chat/${probableChatterID}`);
        }
        if (result?.seen) {
          setisMsgRed(false);
          dispatch(updateSeenStatus(true));
        } else {
          if (result.latestMessage?.sender === chatterID) {
            setisMsgRed(true);
          }
        }
      } catch (error) {
        //console.log(error);
      }
    }
    getChatterDetails();
  }, []);

  useEffect(() => {
    if (wsClient instanceof WebSocket && isActive && isMsgRed) {
      setisMsgRed(false);
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
    //console.log(message);
    function handleMsgWhite() {
      if (isActive) {
        setisMsgRed(false);
      } else {
        if (typeof message !== "undefined") {
          setisMsgRed(true);
          return;
        }
        if (whoMessaged === chatterID) {
          setisMsgRed(true);
          return;
        } else {
          setisMsgRed(false);
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
    navigate(`/chat/${chatterID}`);
    dispatch(
      updateChatterDetails({
        primaryChatter: primaryChatter,
        secondaryChatter: chatterID,
        relation: relation,
        name: details?.participantDetails.username,
        image: details?.participantDetails.image,
      })
    );
  }
  return (
    <button
      onClick={updateChatter}
      className={`${
        isActive ? "bg-gray-400/20" : "hover:bg-gray-500/20"
      } px-2  rounded-lg flex items-center h-16 gap-3 mt-2 w-full`}
    >
      <div className="relative w-12 h-12 bg-gray-100 rounded-full">
        {details && (
          <img
            loading="eager"
            src={
              details?.participantDetails.image === ""
                ? ProfileImage
                : details.participantDetails.image
            }
            alt="user image"
            height={20}
            width={20}
            className="h-full w-full rounded-full"
          />
        )}
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
            isMsgRed ? "text-red-600 font-black" : "text-gray-700 font-normal"
          }`}
        >
          {message ? (
            <p className="text-[13px] max-w-32 truncate ">
              {whoMessaged === primaryChatter
                ? "you"
                : details?.participantDetails.username.split(" ")[0]}{" "}
              : {message}
            </p>
          ) : details?.latestMessage ? (
            <p className={`text-[13px] max-w-32 truncate`}>
              {details?.latestMessage?.sender === primaryChatter
                ? "you"
                : details?.participantDetails.username.split(" ")[0]}{" "}
              : {details?.latestMessage?.message}
            </p>
          ) : null}
          <p className="text-[10px]">{timePassed}</p>
        </div>
      </div>
    </button>
  );
}
