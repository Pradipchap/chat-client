import { MessageInterface } from "../../interfaces/dataInterfaces";

export default function ChatMessage({
  message,
  time,
  isReceiver,
}: MessageInterface) {
  const rotation = isReceiver ? "-rotate-180" : "";
  const align = isReceiver ? "self-start" : "self-end flex-row-reverse";
  return (
    <div
      className={`${rotation} ${align} elf-end flex-row-reverse h-12 w-max float-end flex gap-2 items-center`}
    >
      <div className={`${rotation} h-10 w-10 bg-red-600 rounded-full`}></div>
      <div>
        <p
          className={`${rotation} rounded-2xl px-2 py-1 rounded-tr-none bg-gray-500`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
