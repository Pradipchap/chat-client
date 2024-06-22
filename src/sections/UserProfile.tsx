import { useLoaderData } from "react-router-dom";
const StatusButton = lazy(() => import("../components/StatusButton"));
import { lazy, useState } from "react";
import { SUBMIT_STATUS } from "../../utils/constants";
import friendController from "../../functions/friendController";
import { useAppSelector } from "../../utils/reduxHooks";
import Button from "../components/Button";

interface ResponseData {
  isFriend: boolean;
  hasIGotRequest: boolean;
  hasISentRequest: boolean;
  userDetails: {
    _id: string;
    email: string;
    username: string;
    websocketId: string;
    __v: number;
  };
}
export default function UserProfile() {
  const {
    hasIGotRequest,
    hasISentRequest,
    isFriend,
    userDetails,
  } = useLoaderData() as ResponseData;
  const accessToken = useAppSelector((state) => state.currentUser.accessToken);
  const [first, setFirst] = useState(SUBMIT_STATUS.IDLE);
  const [second, setSecond] = useState(SUBMIT_STATUS.IDLE);

  function deleteFriendRequest() {
    friendController({
      requestData: { requestID: userDetails._id },
      apiString: "/api/deleteRequest",
      setrequestStatus: setFirst,
      accessToken: accessToken,
    });
  }
  function acceptRequest() {
    friendController({
      requestData: { requestID: userDetails._id },
      apiString: "/api/confirmRequest",
      setrequestStatus: setSecond,
      accessToken: accessToken,
    });
  }
  function deleteFriend() {
    friendController({
      requestData: { friendID: userDetails._id },
      apiString: "/api/deleteFriend",
      setrequestStatus: setFirst,
      accessToken: accessToken,
    });
  }
  function unsendRequest() {
    friendController({
      requestData: { requestID: userDetails._id },
      apiString: "/api/unsendRequest",
      setrequestStatus: setFirst,
      accessToken: accessToken,
    });
  }

  function sendRequest() {
    friendController({
      requestData: { friendID: userDetails._id },
      apiString: "/api/sendFriendRequest",
      setrequestStatus: setFirst,
      accessToken: accessToken,
    });
  }

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="h-44 w-44 bg-blue-600 rounded-full"></div>
      <p className="text-2xl mt-2 font-bold">{userDetails.username}</p>
      <p className="text-sm mt-2 font-light">{userDetails.email}</p>
      <div className="buttons flex gap-5 mt-5">
        {hasIGotRequest ? (
          <>
            <StatusButton
              onClick={deleteFriendRequest}
              idleMessage="Delete Request"
              loadingMessage="Deleting"
              successMessage="Deleted"
              failedMessage="failed"
              idleIcon="Delete"
              className="bg-red-600"
              requestStatus={first}
            />
            <StatusButton
              onClick={acceptRequest}
              idleMessage="Accept Request"
              loadingMessage="Accepting"
              successMessage="Accepted"
              failedMessage="failed"
              idleIcon="Delete"
              className="bg-green-600"
              requestStatus={second}
            />
          </>
        ) : hasISentRequest ? (
          <StatusButton
            onClick={unsendRequest}
            idleMessage="Unsend Request"
            loadingMessage="unsending"
            successMessage="Unsent"
            failedMessage="failed"
            idleIcon="Delete"
            className="bg-red-600"
            requestStatus={first}
          />
        ) : isFriend ? (
          <>
            <Button
              icon="Message"
              iconClassName="text-white"
              className="gap-2 w-full min-w-44
						"
            >
              Message
            </Button>
            <StatusButton
              onClick={deleteFriend}
              idleMessage="Delete Friend"
              loadingMessage="Deleting"
              successMessage="Deleted"
              failedMessage="failed"
              idleIcon="Delete"
              className="bg-red-600"
              requestStatus={first}
            />
          </>
        ) : (
          <StatusButton
            onClick={sendRequest}
            idleMessage="Send Request"
            loadingMessage="Sending"
            successMessage="Request Sent"
            failedMessage="failed"
            idleIcon="Plus"
            requestStatus={first}
          />
        )}
      </div>
    </div>
  );
}
