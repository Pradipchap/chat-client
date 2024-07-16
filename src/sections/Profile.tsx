// import { useAppSelector } from "../../utils/reduxHooks";
// import ProfilePic from "../components/ProfilePic";

// export default function Profile() {
//   const { username, email, image } = useAppSelector(
//     (state) => state.currentUser
//   );
//   return (
//     <div className="flex flex-col gap-10 mt-10">
//       <div className="h-full w-full flex flex-col items-center">
//         <ProfilePic className="h-20 w-20" image={image} />
//         <p className="text-2xl mt-2 font-bold">{username}</p>
//         <p className="text-sm mt-2 font-light">{email}</p>
//       </div>
//     </div>
//   );
// }

import ImageUpload from "../components/Inputs/ImageUpload";
import useToast from "../../customHooks/useToast";
import { SERVER_BASE_URL, SUBMIT_STATUS } from "../../utils/constants";
import { FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../utils/reduxHooks";
import updateProfile from "../../functions/updateProfile";
import { fetchSessionData } from "../../redux/slices/SessionSlice";
import StatusButton from "../components/StatusButton";
import ProfilePic from "../components/ProfilePic";
import Button from "../components/Button";
import PopupOver from "../components/Popups/Popup";
import Icon from "../components/Icon";
import logoutHandler from "../../functions/logoutHandler";

export default function Profile() {
  const session = useAppSelector((state) => state.currentUser);
  return (
    <div className="relative px-2 mx-auto w-full flex flex-col items-center justify-center mt-10 gap-10">
      <PopupOver content={<EditProfilePopup />} targetIndependent>
        <button className="absolute right-2 top-0">
          <Icon
            className="bg-gray-100 px-2 py-2 text-black text-lg rounded-lg"
            name="UserEdit"
          />
        </button>
      </PopupOver>
      <ProfilePic image={session?.image || null} className="h-32 w-32" />
      <div className="flex gap-5 flex-col md:flex-row w-full items-center justify-center">
        <div className="flex-1 w-full flex-col flex gap-8">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className="  text-gray-500">
              Display Name
            </label>
            <input
              defaultValue={session.username || ""}
              name="name"
              disabled
              className="px-0 bg-transparent border-b border-x-0 rounded-none border-t-0
    "
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="  text-gray-500">
              Email Address
            </label>
            <input
              defaultValue={session?.email || ""}
              name="email"
              disabled
              className="outline-none px-0 bg-transparent border-b border-x-0 rounded-none border-t-0"
            />
          </div>
          <div className="flex flex-col gap-1 w-full ">
            <label htmlFor="phone" className="text-gray-500">
              Phone
            </label>
            <input
              defaultValue={session?.phone || ""}
              name="phone"
              disabled
              className="outline-none px-0 bg-transparent border-b border-x-0 rounded-none border-t-0"
            />
          </div>
          <div className="flex flex-col gap-1 w-full ">
            <label htmlFor="dateofbirth" className="text-gray-500">
              Date of Birth
            </label>
            <input
              defaultValue={new Date(new Date()).toISOString().substring(0, 10)}
              name="dateofbirth"
              type="date"
              disabled
              className="px-0 w-full self-start bg-transparent border-b border-x-0 rounded-none border-t-0
    "
            />
          </div>
        </div>
        <div className="flex-1 w-full flex-col flex gap-8">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name" className="text-gray-500">
              Language
            </label>
            <input
              // defaultValue={session.username || ""}
              defaultValue={"English"}
              name="name"
              disabled
              className="px-0 bg-transparent border-b border-x-0 rounded-none border-t-0"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="email" className="text-gray-500">
              Notifications
            </label>
            <input
              // defaultValue={session?.email || ""}
              defaultValue={"On"}
              name="email"
              disabled
              className="outline-none px-0 bg-transparent border-b border-x-0 rounded-none border-t-0"
            />
          </div>
          <div className="flex flex-col gap-1 w-full ">
            <label htmlFor="phone" className="text-gray-500">
              Active Status
            </label>
            <input
              // defaultValue={session?.phone || ""}
              defaultValue={"On"}
              name="phone"
              disabled
              className="outline-none px-0 bg-transparent border-b border-x-0 rounded-none border-t-0
    "
            />
          </div>
          <div className="flex flex-col gap-1 w-full ">
            <Button
              onClick={logoutHandler}
              className="bg-red-700 text-base px-5 gap-2"
              icon="Logout"
              iconClassName="text-white"
            >
              logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
function EditProfilePopup() {
  const session = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();
  const { showError } = useToast();
  const [profileEditStatus, setProfileEditStatus] = useState<SUBMIT_STATUS>(
    SUBMIT_STATUS.IDLE
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setProfileEditStatus(SUBMIT_STATUS.LOADING);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(`${SERVER_BASE_URL}/api/editProfile`, {
        method: "POST",
        headers: {
          Authorization: "Bearer" + " " + session.accessToken,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("profile edit not successfull");
      }
      setProfileEditStatus(SUBMIT_STATUS.SUCCESS);
      // const data = await response.json();
      // updateProfile(await data.profile, session.expiresIn, session.accessToken);
      // dispatch(fetchSessionData());
      // onclose();
    } catch (error) {
      //console.error("Error updating profile:", error);
      setProfileEditStatus(SUBMIT_STATUS.FAILED);
      showError("profile edit unsuccessful");
      setTimeout(() => {
        setProfileEditStatus(SUBMIT_STATUS.IDLE);
      }, 3000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 w-[450px] items-center justify-center flex flex-col gap-5"
    >
      <p className="h-10 text-xl ">Edit Profile</p>
      <ImageUpload
        defaultImage={session?.image || undefined}
        shape="circle"
        className="h-32 w-32"
      />
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="name" className=" text-sm text-gray-500">
          Display Name
        </label>
        <input
          defaultValue={session.username || ""}
          name="name"
          className="px-0 bg-transparent border-b border-x-0 rounded-none border-t-0
    "
        />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="email" className=" text-sm text-gray-500">
          Email Address
        </label>
        <input
          defaultValue={session?.email || ""}
          name="email"
          className="outline-none px-0 bg-transparent border-b border-x-0 rounded-none border-t-0
    "
        />
      </div>

      <div className="flex flex-col gap-1 w-full ">
        <label htmlFor="phone" className=" text-sm text-gray-500">
          Phone
        </label>
        <input
          defaultValue={session?.phone || ""}
          name="phone"
          className="outline-none px-0 bg-transparent border-b border-x-0 rounded-none border-t-0
    "
        />
      </div>
      <div className="flex flex-col gap-1 w-full ">
        <label htmlFor="dateofbirth" className=" text-sm text-gray-500">
          Date of Birth
        </label>
        <input
          defaultValue={new Date(new Date()).toISOString().substring(0, 10)}
          name="dateofbirth"
          type="date"
          className="px-0 w-full self-start bg-transparent border-b border-x-0 rounded-none border-t-0
    "
        />
      </div>
      <StatusButton
        type="submit"
        requestStatus={profileEditStatus}
        className="mt-5 transition-all"
      />
    </form>
  );
}
