import { useState } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import { SERVER_BASE_URL, SUBMIT_STATUS } from "../../utils/constants";
import StatusButton from "./StatusButton";

interface props {
  userID?: string;
  username: string;
  email: string;
  image?: string;
}

export default function SendRequestCard({ userID, username,email }: props) {
  const currentUser = useAppSelector((state) => state.currentUser);
  const [requestStatus, setrequestStatus] = useState<SUBMIT_STATUS>(
    SUBMIT_STATUS.IDLE
  );
  async function sendRequest() {
    try {
      console.log("");
      const requestData = { friendID: userID };
      setrequestStatus(SUBMIT_STATUS.LOADING);
      const response = await fetch(SERVER_BASE_URL + "/api/sendFriendRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + " " + currentUser.accessToken,
        },
        body: JSON.stringify(requestData),
      });
      console.log("response", response);
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
  return (
    <div className="w-full max-w-[250px] p-3 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col items-center justify-between">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{username}</h5>
        <span className="text-sm text-gray-500">{email}</span>
        <div className="flex mt-4 md:mt-6"></div>
        <StatusButton
          idleIcon="Plus"
          requestStatus={requestStatus}
          onClick={sendRequest}
          successMessage="Request Sent"
          loadingMessage="Sending"
          failedMessage="Request failed"
          idleMessage="Send Request"
        />
      </div>
    </div>
  );
}
