import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import StaticImg from "../assets/avatar.svg";
import StatusButton from "./StatusButton";
import { useState } from "react";
import { SUBMIT_STATUS } from "../../utils/constants";
import friendController from "../../functions/friendController";
import { updateLatestMessage } from "../../redux/slices/UsersSlice";
import { updateRelation } from "../../redux/slices/ChatSlice";

export default function NonFriendsDetails() {
  const params = useParams();
  const secondaryChatter = useAppSelector((state) => state.chat);
  const secondaryChatterId = params.chatterID;
  const relation = secondaryChatter.secondaryChatterRelation;
  const accessToken = useAppSelector((state) => state.currentUser.accessToken);
  const [requestStatus, setRequestStatus] = useState(SUBMIT_STATUS.IDLE);
  const dispatch = useAppDispatch();
  const apiString =
    relation === "GOTREQUEST"
      ? "/confirmRequest"
      : relation === "SENTREQUEST"
      ? "/unsendRequest"
      : relation === "NORMAL"
      ? "/sendFriendRequest"
      : "";
  const views =
    relation === "GOTREQUEST"
      ? {
          idleMessage: "Confirm Request",
          loadingMessage: "confirming",
          successMessage: "Request Confirmed",
          failedMessage: "failed",
          idleIcon: "Check",
        }
      : relation === "SENTREQUEST"
      ? {
          idleMessage: "Unsend Request",
          loadingMessage: "unsending",
          successMessage: "Request unsent",
          failedMessage: "failed",
          idleIcon: "Delete",
        }
      : relation === "NORMAL"
      ? {
          idleMessage: "Send Request",
          loadingMessage: "sending",
          successMessage: "Request sent",
          failedMessage: "failed",
          idleIcon: "FriendRequest",
        }
      : {};

  async function handleController() {
    try {
      await friendController({
        requestData: { requestID: secondaryChatterId },
        accessToken,
        apiString,
        setrequestStatus: setRequestStatus,
      });
      if (relation === "GOTREQUEST") {
        dispatch(
          updateLatestMessage({
            messagerID: secondaryChatterId,
          })
        );
        dispatch(updateRelation("FRIEND"));
      }
    } catch (error) {
      //
    }
  }
  return (
    <div className="top-14 w-full h-[calc(100vh-120px)] bg-gray-200 flex flex-col items-center gap-5 px-2 py-10 scroll-smooth overflow-y-auto">
      <img
        src={secondaryChatter.secondaryChatterImage || StaticImg}
        className="h-40 w-40 rounded-full"
      />
      <h2>{secondaryChatter.secondaryChatterName}</h2>
      <StatusButton
        idleMessage={views.idleMessage}
        idleIcon={views.idleIcon}
        loadingMessage={views.loadingMessage}
        successMessage={views.successMessage}
        failedMessage={views.failedMessage}
        className="w-max"
        requestStatus={requestStatus}
        onClick={handleController}
      />
    </div>
  );
}
