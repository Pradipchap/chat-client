import { useAppSelector } from "./../utils/reduxHooks";
import { useContext, useEffect, useState } from "react";
import { Peer } from "peerjs";
import { WsContext } from "../utils/WsProvider";
import sendSocketMessage from "../functions/sendSocketMessage";

export default function usePeer() {
  const wsClient = useContext(WsContext);
  const callDetails = useAppSelector((state) => state.call);
  const userDetails = useAppSelector((state) => state.currentUser);
  const [myPeer, setPeer] = useState<Peer | null>(null);

  function cleanup() {
    if (myPeer) {
      myPeer.disconnect();
      myPeer.destroy();
    }
    setPeer(null);
  }

  useEffect(() => {
    const callPartner = callDetails.secondaryChatter;
    const peer = myPeer
      ? myPeer
      : new Peer(getRandomId(), {
          host: "localhost",
          port: 9000,
        });

    peer?.on("open", () => {
      console.log("d");

      sendSocketMessage({
        wsClient,
        sender: userDetails.userID,
        type: "peersId",
        receiver: userDetails.userID,
        data: new Blob([peer.id]),
      });

      setPeer(peer);
      if (callPartner === "") {
        return;
      }

      const connection = peer.connect(callPartner);
      console.log(typeof connection);

      connection?.on("open", () => {
        console.log("Connection established with", callPartner);
        connection.send("hi");
        if (callDetails.callStatus !== "ongoing") {
          return;
        }
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            const call = peer?.call("another-peers-id", stream);
            call.on("stream", (remoteStream) => {
              // Show stream in some <video> element.
              console.log(remoteStream);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
      connection?.on("error", (err) => {
        console.error("Connection error:", err);
      });

      if (callDetails.callStatus === "close") {
        connection.close();
      }
    });
    peer.on("disconnected", () => {
      cleanup();
    });
    peer.on("close", () => {
      console.log("Peer closed remotetly");
      cleanup();
    });

    peer?.on("error", (err) => {
      cleanup();
      console.log(err);
    });
    return () => {
      cleanup();
    };
  }, [callDetails.secondaryChatter]);

  // useEffect(() => {
  //   peer?.on("connection", (connection) => {
  //     connection.on("open", () => {
  //       console.log("Connection received");
  //     });

  //     connection?.on("error", (err) => {
  //       console.error("Connection error on receiving side:", err);
  //     });
  //     if (callDetails.callStatus === "close") {
  //       connection.close();
  //     }
  //   });

  //   peer?.on("call", (call) => {
  //     navigator.mediaDevices
  //       .getUserMedia({ video: true, audio: true })
  //       .then((stream) => {
  //         if (callDetails.callStatus !== "ongoing") {
  //           return;
  //         }
  //         call.answer(stream);
  //         call.on("stream", (stream) => {
  //           console.log(stream);
  //         });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   });

  //   return () => {
  //     peer?.disconnect();
  //     peer?.destroy();
  //   };
  // }, [peer, callDetails]);
}

function getRandomId() {
  const min = Math.ceil(10000000);
  const max = Math.floor(99999999);
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}
