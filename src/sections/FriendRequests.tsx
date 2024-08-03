import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { SERVER_BASE_URL, SUBMIT_STATUS } from "../../utils/constants";
import { lazy, useState } from "react";
import Pagination from "../components/Pagination";
const StatusButton = lazy(() => import("../components/StatusButton"));
import useUsersFetch from "../../customHooks/useUsersFetch";
import { pushChatters } from "../../redux/slices/UsersSlice";
import FriendsGroupSkeleton from "../components/Skeleton/FriendsGroupSkeleton";

interface props {
  userID?: string;
  username: string;
  email: string;
  image?: string;
}

export default function FriendRequests() {
  const { pageNo, result, loading, setPageNo } = useUsersFetch({
    currentPath: "friendRequests",
  });
  const friendRequests = result?.users || [];
  const totalData = result?.noOfUsers || 0;

  if (loading) return <FriendsGroupSkeleton />;

  return (
    <div className="p-2 mt-10">
      <div className="flex gap-5 w-full">
        {friendRequests.length > 0 &&
          friendRequests[0] !== null &&
          friendRequests.map((item) => {
            return (
              <SendRequestCard
                key={item._id}
                username={item.username}
                email={item.email}
                userID={item._id}
              />
            );
          })}
      </div>
      {totalData > 0 ? (
        <Pagination
          currentPage={pageNo}
          dataLength={totalData}
          dataPerPage={10}
          onPageChange={setPageNo}
        />
      ) : (
        <div className="m-auto w-max text-lg font-medium">
          Sorry , there are no friend requests <br />{" "}
        </div>
      )}
    </div>
  );
}

function SendRequestCard({ userID, username, email }: props) {
  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();
  const [requestStatus, setrequestStatus] = useState<SUBMIT_STATUS>(
    SUBMIT_STATUS.IDLE
  );
  const [requestStatusDelete, setrequestStatusDelete] = useState<SUBMIT_STATUS>(
    SUBMIT_STATUS.IDLE
  );
  async function acceptRequest() {
    try {
      const requestData = { requestID: userID };
      setrequestStatus(SUBMIT_STATUS.LOADING);
      const response = await fetch(SERVER_BASE_URL + "/api/confirmRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + currentUser.accessToken,
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        setrequestStatus(SUBMIT_STATUS.SUCCESS);
        const convo = await response.json();
        console.log(convo);
        dispatch(
          pushChatters({
            username: username,
            email: email,
            _id: convo.convoID,
            chatterID: userID,
            relation: "FRIEND",
          })
        );
      } else {
        console.log("first");
        throw "";
      }
    } catch (error) {
      console.log(error);
      setrequestStatus(SUBMIT_STATUS.FAILED);
      setTimeout(() => {
        setrequestStatus(SUBMIT_STATUS.IDLE);
      }, 5000);
    }
  }

  async function deleteRequest() {
    try {
      const requestData = { requestID: userID };
      setrequestStatusDelete(SUBMIT_STATUS.LOADING);
      const response = await fetch(SERVER_BASE_URL + "/api/deleteRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + currentUser.accessToken,
        },
        body: JSON.stringify(requestData),
      });
      //console.log("response", response);
      if (response.ok) {
        setrequestStatusDelete(SUBMIT_STATUS.SUCCESS);
      } else {
        throw new Error();
      }
    } catch (error) {
      setrequestStatusDelete(SUBMIT_STATUS.FAILED);
      setTimeout(() => {
        setrequestStatusDelete(SUBMIT_STATUS.IDLE);
      }, 5000);
    }
  }
  return (
    <div className="w-full max-w-[250px] p-3 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col items-center justify-between">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{username}</h5>
        <span className="text-sm text-gray-500">Visual Designer</span>
        <div className="flex mt-4 md:mt-6"></div>
        <div className="flex flex-col gap-2 w-full">
          <StatusButton
            type="button"
            idleIcon="Check"
            requestStatus={requestStatus}
            onClick={acceptRequest}
          />
          <StatusButton
            type="button"
            idleIcon="Delete"
            className="bg-black"
            requestStatus={requestStatusDelete}
            onClick={deleteRequest}
            idleMessage="Delete Request"
            loadingMessage="Deleting"
            successMessage="Deleted"
            failedMessage="Couldn't Delete"
          />
        </div>
      </div>
    </div>
  );
}
