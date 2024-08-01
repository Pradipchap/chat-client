import Ringtone from "../assets/ringtone.mp3";
import { useEffect, useMemo } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import { Outlet } from "react-router-dom";
import WsHandler from "./WsHandler";
import Navigation from "./Optionsnavigation";

export default function Front() {
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
    <>
      <WsHandler />
      <main className="flex">
        <Navigation />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </>
  );
}
