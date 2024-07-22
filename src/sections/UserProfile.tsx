import { lazy, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const StatusButton = lazy(() => import("../components/StatusButton"));
import { SERVER_BASE_URL, SUBMIT_STATUS } from "../../utils/constants";
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
  const dispatch = useAppDispatch();
  const params = useParams();
  const accessToken = useAppSelector((state) => state.currentUser.accessToken);
  const [first, setFirst] = useState(SUBMIT_STATUS.IDLE);
  const [second, setSecond] = useState(SUBMIT_STATUS.IDLE);
  const [userData, setUserData] = useState<ResponseData | null>(null);

  useEffect(() => {
    async function getDetails() {
      try {
        const response = await fetch(`${SERVER_BASE_URL}/api/user`, {
          method: "POST",
          body: JSON.stringify({ requestID: params.userID }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw "";
        }
        const initialRel = "FRIEND";
        const { participantDetails } = (await response.json()) as ResponseData;
        setUserData({ participantDetails, relation: initialRel });
      } catch (error) {
        console.log(error);
      }
    }
    getDetails();
  }, []);

  async function deleteFriendRequest() {
    friendController({
      requestData: { requestID: userData?.participantDetails._id },
      apiString: "/api/deleteRequest",
      setrequestStatus: setFirst,
      accessToken: accessToken,
    });
  }
  async function acceptRequest() {
    try {
      const data = await friendController({
        requestData: { requestID: userData?.participantDetails._id },
        apiString: "/confirmRequest",
        setrequestStatus: setSecond,
        accessToken: accessToken,
      });
      const convoID = await data.convoID;
      dispatch(
        pushChatters({
          username: userData?.participantDetails.username,
          email: userData?.participantDetails.email,
          _id: convoID,
          chatterID: userData?.participantDetails._id,
          relation: "FRIEND",
        })
      );
      if (userData?.participantDetails) {
        setUserData({
          participantDetails: userData.participantDetails,
          relation: "FRIEND",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFriend() {
    try {
      await friendController({
        requestData: { friendID: userData?.participantDetails._id },
        apiString: "/deleteFriend",
        setrequestStatus: setFirst,
        accessToken: accessToken,
      });
      dispatch(pullChatters(userData?.participantDetails._id));
      if (userData?.participantDetails) {
        await setUserData({
          participantDetails:  userData.participantDetails,
          relation: "NORMAL",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function unsendRequest() {
    try {
      friendController({
        requestData: { requestID: userData?.participantDetails._id },
        apiString: "/unsendRequest",
        setrequestStatus: setFirst,
        accessToken: accessToken,
      });
      if (userData?.participantDetails) {
        setUserData({
          participantDetails: userData.participantDetails,
          relation: "NORMAL",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function sendRequest() {
    try {
      console.log(userData?.participantDetails._id);
      await friendController({
        requestData: { requestID: userData?.participantDetails._id },
        apiString: "/sendFriendRequest",
        setrequestStatus: setFirst,
        accessToken: accessToken,
      });
      console.log("first");
      if (userData?.participantDetails) {
        console.log("ds");
        setUserData({
          participantDetails: userData.participantDetails,
          relation: "SENTREQUEST",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="h-44 w-44 bg-blue-600 rounded-full"></div>
      <p className="text-2xl mt-2 font-bold">
        {userData?.participantDetails.username}
      </p>
      <p className="text-sm mt-2 font-light">
        {userData?.participantDetails.email}
      </p>
      <div className="buttons flex gap-5 mt-5">
        {userData?.relation === "GOTREQUEST" ? (
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
        ) : userData?.relation === "SENTREQUEST" ? (
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
        ) : userData?.relation === "FRIEND" ? (
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
        ) : userData?.relation === "NORMAL" ? (
          <StatusButton
            onClick={sendRequest}
            idleMessage="Send Request"
            loadingMessage="Sending"
            successMessage="Request Sent"
            failedMessage="failed"
            idleIcon="Plus"
            requestStatus={first}
          />
        ) : null}
      </div>
    </div>
  );
}
