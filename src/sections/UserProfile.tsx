import { lazy, useState } from "react";
import { useLoaderData } from "react-router-dom";
const StatusButton = lazy(() => import("../components/StatusButton"));
import { SUBMIT_STATUS } from "../../utils/constants";
import friendController from "../../functions/friendController";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import Button from "../components/Button";
import { UserRelation } from "../../interfaces/dataInterfaces";
import { pullChatters, pushChatters } from "../../redux/slices/UsersSlice";

interface ResponseData {
  relation?: UserRelation;
  participantDetails: {
    _id: string;
    email: string;
    username: string;
    websocketId: string;
    __v: number;
  };
}

export default function UserProfile() {
  console.log("asdadsasd");
  const {
    participantDetails,
    relation = "FRIEND",
  } = useLoaderData() as ResponseData;
  console.log("user details is", participantDetails);
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.currentUser.accessToken);
  const [first, setFirst] = useState(SUBMIT_STATUS.IDLE);
  const [second, setSecond] = useState(SUBMIT_STATUS.IDLE);

  async function deleteFriendRequest() {
    2;
    friendController({
      requestData: { requestID: participantDetails._id },
      apiString: "/api/deleteRequest",
      setrequestStatus: setFirst,
      accessToken: accessToken,
    });
  }
  async function acceptRequest() {
    try {
      const data = await friendController({
        requestData: { requestID: participantDetails._id },
        apiString: "/confirmRequest",
        setrequestStatus: setSecond,
        accessToken: accessToken,
      });
      const convoID = await data.convoID;
      dispatch(
        pushChatters({
          username: participantDetails.username,
          email: participantDetails.email,
          _id: convoID,
          chatterID: participantDetails._id,
          relation: "FRIEND",
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFriend() {
    try {
      await friendController({
        requestData: { friendID: participantDetails._id },
        apiString: "/deleteFriend",
        setrequestStatus: setFirst,
        accessToken: accessToken,
      });
      dispatch(pullChatters(participantDetails._id));
    } catch (error) {
      console.log(error);
    }
  }
  async function unsendRequest() {
    friendController({
      requestData: { requestID: participantDetails._id },
      apiString: "/unsendRequest",
      setrequestStatus: setFirst,
      accessToken: accessToken,
    });
  }

  async function sendRequest() {
    friendController({
      requestData: { friendID: participantDetails._id },
      apiString: "/sendFriendRequest",
      setrequestStatus: setFirst,
      accessToken: accessToken,
    });
  }

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="h-44 w-44 bg-blue-600 rounded-full"></div>
      <p className="text-2xl mt-2 font-bold">{participantDetails.username}</p>
      <p className="text-sm mt-2 font-light">{participantDetails.email}</p>
      <div className="buttons flex gap-5 mt-5">
        {relation === "GOTREQUEST" ? (
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
        ) : relation === "SENTREQUEST" ? (
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
        ) : relation === "FRIEND" ? (
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
