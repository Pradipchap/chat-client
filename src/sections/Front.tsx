import Chat from "../components/ChatBox";
import Friends from "../components/Friends";
import Ringtone from "../assets/ringtone.mp3";
import { useEffect, useMemo } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import { Outlet } from "react-router-dom";
export default function Front({ wsClient }: { wsClient: WebSocket }) {
  const audio = useMemo(() => new Audio(Ringtone), []);
  const callStatus = useAppSelector((state) => state.call.callStatus);
  useEffect(() => {
    function handleAudio() {
      if (callStatus === "incoming") {
        audio.play();
      } else if (
        callStatus === "rejected" ||
        callStatus === "close" ||
        callStatus === "ended" ||
        callStatus === "ongoing"
      ) {
        audio.pause();
      } else {
        null;
      }
    }
    handleAudio();
  }, [callStatus, audio]);

  return (
    <main className="flex">
      <div className="w-[30%]">
        <Friends />
      </div>
      <div className="w-[70%]">
        {/* <Chat wsClient={wsClient}/> */}
        <Outlet />
        {/* <Video/> */}
      </div>
    </main>
  );
}
