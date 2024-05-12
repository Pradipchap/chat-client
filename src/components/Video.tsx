import {  useRef, useState } from "react";

export default function Video() {
  const [mediaRecorder, setmediaRecorder] = useState<null | MediaRecorder>(
    null
  );
  const [videoStream, setVideoStream] = useState();
  const wsClient = new WebSocket("ws://localhost:3100");
  const previewRef = useRef<HTMLVideoElement>(null);
  async function getUserMedia() {
    console.log("first");
    const recording = document.getElementById("recording");
    try {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((stream) => {
          if (previewRef.current) {
            previewRef.current.srcObject = stream; // Assign the stream to the video element
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   mediaRecorder?.start();
  // }, [mediaRecorder]);

  // useEffect(() => {
  //   mediaRecorder?.addEventListener("dataavailable", async (event) => {
  //     const x = await event.data.arrayBuffer();
  //   });
  // }, [mediaRecorder]);

  function stopRecording() {
    mediaRecorder?.stop();
  }
  return (
    <div className=" h-[40rem] w-[40rem] border-4 border-red-400">
      <div className="w-full h-20 bg-green-500">
        <button onClick={getUserMedia}>media</button>
        <button onClick={stopRecording}>stop</button>
      </div>
      <video
        id="recording"
        ref={previewRef}
        className="w-full h-[35rem]"
        autoPlay
        controls
      ></video>
    </div>
  );
}
