import Button from "./Button";
import deleteCallSession from "../../functions/deleteCallSession";

export default function CallController() {
  const callChannel = new BroadcastChannel("call-channel");
  function handleMute() {}

  function endCall() {
    deleteCallSession();
    callChannel.postMessage("close");
    window.close();
  }

  return (
    <div className="absolute flex bottom-[10%] left-1/2 -translate-x-1/2 h-10 w-max bg-gray-300 border rounded-md">
      <Button
        onClick={handleMute}
        icon="M"
        iconClassName="text-red-600"
        className=" bg-transparent"
      >
        <></>
      </Button>
      <Button
        onClick={endCall}
        icon="Call"
        iconClassName="text-white"
        className="bg-red-600"
      >
        <></>
      </Button>
    </div>
  );
}
