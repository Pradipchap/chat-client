import { useRef } from "react";
import useDragHandler from "../../customHooks/useDragHandler";

export default function MyVideo() {
  const videoRef = useRef<HTMLDivElement | null>(null);
  useDragHandler(videoRef);
  return <div ref={videoRef} id="hello" className="myvideo h-64 w-56 sticky bg-green-200"></div>;
}
