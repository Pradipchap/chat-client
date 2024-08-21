import { useEffect, useState } from "react";
import CallController from "../components/CallController";
import MyVideo from "../components/MyVideo";

export default function CallArea() {
  const [closeStatus, setCloseStatus] = useState(
    localStorage.getItem("callDetails") === null
  );

  useEffect(() => {
    function handleLocalStorage(event: StorageEvent) {
      if (event.storageArea !== localStorage) {
        return;
      }
      console.log(event.key);
      if (!event.key) {
        setCloseStatus(true);
      }
    }

    window.addEventListener("storage", handleLocalStorage);
    return () => window.removeEventListener("storage", handleLocalStorage);
  }, []);

  return (
    <div className="min-h-screen h-screen w-full bg-black relative">
      {closeStatus ? (
        <p className="m-auto text-lg font-medium text-white">call ended</p>
      ) : (
        <>
          <MyVideo />
          <CallController />
        </>
      )}
    </div>
  );
}
