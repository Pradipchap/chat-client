import { useAppSelector } from "../../utils/reduxHooks";
import { SERVER_BASE_URL, SUBMIT_STATUS } from "../../utils/constants";
import { lazy, useState } from "react";
import Pagination from "../components/Pagination";
const StatusButton = lazy(() => import("../components/StatusButton"));
import useUsersFetch from "../../customHooks/useUsersFetch";

interface props {
  userID?: string;
  username: string;
  email: string;
  image?: string;
}

export default function FriendRequests() {
  const {
    pageNo,
    users: friendRequests,
    setPageNo,
    totalData,
  } = useUsersFetch({ currentPath: "friendRequests" });

  return (
    <>
      <div className="flex gap-5 p-2">
        {friendRequests.length > 0 &&
          friendRequests[0] !== null &&
          friendRequests.map((item) => {
            return (
              <SendRequestCard
                username={item.username}
                email={item.email}
                userID={item._id}
              />
            );
          })}
      </div>
      {totalData > 0 && (
        <Pagination
          currentPage={pageNo}
          dataLength={totalData}
          dataPerPage={10}
          onPageChange={setPageNo}
        />
      )}
    </>
  );
}

function SendRequestCard({ userID, username }: props) {
  const currentUser = useAppSelector((state) => state.currentUser);
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
      const response = await fetch(
        SERVER_BASE_URL + "/api/confirmRequest?pageNo=",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + currentUser.accessToken,
          },
          body: JSON.stringify(requestData),
        }
      );
      //console.log("response", response);
      if (response.ok) {
        setrequestStatus(SUBMIT_STATUS.SUCCESS);
      } else {
        throw new Error();
      }
    } catch (error) {
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
