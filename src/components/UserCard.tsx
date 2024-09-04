import { lazy, useState } from "react";
const StatusButton = lazy(() => import("./StatusButton"));
import { SUBMIT_STATUS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import friendController from "../../functions/friendController";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { pullChatters, pushChatters } from "../../redux/slices/UsersSlice";
import { updateChatterDetails } from "../../redux/slices/ChatSlice";
import StaticImage from "../assets/avatar.svg";

interface props {
  userID: string;
  username: string;
  email: string;
  image?: string;
}
export default function UserCard({ username, userID, email, image }: props) {
  //eslint-disable-next-line
  const accessToken = useAppSelector((state) => state.currentUser.accessToken);
  const [requestStatus] = useState<SUBMIT_STATUS>(SUBMIT_STATUS.IDLE);
  const [requestStatusDelete, setRequestStatusDelete] = useState<SUBMIT_STATUS>(
    SUBMIT_STATUS.IDLE
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function deleteFriend() {
    try {
      setRequestStatusDelete(SUBMIT_STATUS.LOADING);
      await friendController({
        requestData: { friendID: userID },
        apiString: "/deleteFriend",
        setrequestStatus: setRequestStatusDelete,
        accessToken: accessToken,
      });
      dispatch(pullChatters(userID));
      setRequestStatusDelete(SUBMIT_STATUS.SUCCESS);
    } catch (error) {
      //console.log(error);
      setRequestStatusDelete(SUBMIT_STATUS.FAILED);
    }
  }
  return (
    <div className="min-w-[250px] max-w-[300px] h-max p-3 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-col items-center justify-between">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={image || StaticImage}
          alt="Bonnie image"
        />
        <p className="mb-1 text-xl font-medium text-gray-900">{username}</p>
        <span className="text-sm text-gray-500">{email}</span>
        <div className="flex mt-4 md:mt-6"></div>
        <div className="flex flex-col gap-2 w-full">
          <StatusButton
            idleIcon="Message"
            idleMessage="Message"
            requestStatus={requestStatus}
            onClick={() => {
              dispatch(
                pushChatters({
                  username: username,
                  email: email,
                  _id: crypto.randomUUID(),
                  chatterID: userID,
                  relation: "FRIEND",
                })
              );
              dispatch(
                updateChatterDetails({
                  name: username,
                  image: image,
                  relation: "FRIEND",
                  secondaryChatter: userID,
                })
              );
              navigate(`/chat/${userID}`);
            }}
          />

          <StatusButton
            idleIcon="Delete"
            requestStatus={requestStatusDelete}
            onClick={deleteFriend}
            idleClassName="bg-red-700"
            idleMessage="Delete Friend"
            loadingMessage="Deleting"
            successMessage="Deleted"
            failedMessage="Couldn't Delete"
          />
        </div>
      </div>
    </div>
  );
}
