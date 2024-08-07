import { lazy } from "react";
import { MessageInterface } from "../../interfaces/dataInterfaces";
import { useAppSelector } from "../../utils/reduxHooks";
const ProfilePic = lazy(() => import("./ProfilePic"));

export default function ChatMessage({ message, isReceiver }: MessageInterface) {
  const image = useAppSelector((state) => state.chat.secondaryChatterImage);
  const rotation = isReceiver ? "-rotate-180" : "";
  const align = isReceiver ? "self-start" : "self-end flex-row-reverse";
  return (
    <div
      className={`${rotation} ${align} elf-end flex-row-reverse h-12 w-max float-end flex gap-2 items-center`}
    >
      <ProfilePic
        className={`${rotation} h-10 w-10 rounded-full`}
        image={isReceiver ? image : null}
      />
      <div>
        <p
          className={`${rotation} rounded-2xl px-2 py-1 rounded-tr-none text-gray-800 font-light bg-gray-300`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
