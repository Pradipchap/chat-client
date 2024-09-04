import { useEffect, useState } from "react";
import CallController from "../components/CallController";
import MyVideo from "../components/MyVideo";
import Button from "../components/Button";
import deleteCallSession from "../../functions/deleteCallSession";
import { Peer } from "peerjs";
import { useAppSelector } from "../../utils/reduxHooks";
import getCallSession from "../../functions/getCallSession";

export default function CallArea() {
  const userId = useAppSelector((state) => state.currentUser.userID);
  const callPartner = getCallSession().userId;
  const peer = new Peer(userId);
  const [closeStatus, setCloseStatus] = useState(
    localStorage.getItem("callDetails") === null
  );

  useEffect(() => {
    function handleConnection() {
      if (closeStatus || callPartner === "") {
        peer.disconnect();
        return;
      }
      const conn = peer.connect(callPartner);
      conn?.on("open", () => {
        conn.send("call connection established");
      });
    }
    handleConnection();

    return () => peer.disconnect();
  }, [closeStatus, callPartner]);

  useEffect(() => {
    function handleLocalStorage(event: StorageEvent) {
      if (event.storageArea !== localStorage) {
        return;
      }
      if (!event.newValue) {
        setCloseStatus(true);
      }
    }

    window.addEventListener("storage", handleLocalStorage);
    return () => window.removeEventListener("storage", handleLocalStorage);
  }, []);

  function closeWindow() {
    window.close();
  }

  useEffect(() => {
    function endCall() {
      deleteCallSession();
      window.close();
    }

    window.addEventListener("unload", endCall);
    return () => window.addEventListener("unload", endCall);
  }, []);

  return (
    <div className="min-h-screen h-screen w-full bg-black relative flex">
      {closeStatus ? (
        <div className="text-xl text-white m-auto">
          <p>call ended</p>
          <Button
            icon="Close"
            onClick={closeWindow}
            iconClassName="text-4xl text-white"
            className="bg-transparent m-auto"
          >
            {" "}
            <></>
          </Button>
        </div>
      ) : (
        <>
          <MyVideo />
          <CallController />
        </>
      )}
    </div>
  );
}
