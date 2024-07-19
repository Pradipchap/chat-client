import { useState, useEffect, useRef } from "react";

export default function useSound(url: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(url));

  function play() {
    audioRef.current.play();
    setIsPlaying(true);
  }

  function pause() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  }

  useEffect(() => {
    const current = audioRef.current;
    audioRef.current.addEventListener("ended", () => setIsPlaying(false));
    return () => {
      current.removeEventListener("ended", () => setIsPlaying(false));
    };
  }, []);

  return [play, pause,isPlaying];
}
