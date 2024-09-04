import { NODE_ENV } from "./../utils/constants";
import { useCallback, useEffect, useMemo, useRef } from "react";
import getSingleBroadCastChannel from "../functions/getSingleBroadcastChannel";

function useBroadcastChannel(
  channelName: string,
  //eslint-disable-next-line
  onMessageReceived: (message: any) => void
) {
  const channel = useMemo(
    () => getSingleBroadCastChannel(channelName),
    [channelName]
  );
  const isSubscribed = useRef(false);

  useEffect(() => {
    //console.log(NODE_ENV);
    if (!isSubscribed.current || NODE_ENV !== "development") {
      channel.onmessage = (event) => {
        onMessageReceived(event.data);
        //console.log(event.data);
      };
    }
    return () => {
      if (isSubscribed.current || NODE_ENV !== "development") {
        channel.close();
        isSubscribed.current = true;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const postMessage = useCallback(
    //eslint-disable-next-line
    (message: any) => {
      channel?.postMessage(message);
    },
    [channel]
  );

  return {
    postMessage,
  };
}

export default useBroadcastChannel;
