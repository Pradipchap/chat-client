import { requestCall } from "../../redux/slices/CallSlice";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import Icon from "./Icon";

export default function ChatBoxTopBar() {
  const dispatch = useAppDispatch();
  const chatterName = useAppSelector(
    (state) => state.chat.secondaryChatterName
  );
  const callDetails = useAppSelector((state) => state.call);

  // useEffect(() => {
  //   let interval;

  //   // Function to handle sending callReq message
  //   const sendCallReqMessage = () => {
  //     if (callDetails.callStatus === "requesting") {
  //       counter.current++;
  //       sendSocketMessage({
  //         sender: chatDetails.primaryChatter,
  //         receiver: chatDetails.secondaryChatter,
  //         type: "callReq",
  //         data: new Blob(),
  //         wsClient: wsClient,
  //       });

  //       //console.log(counter.current);

  //       if (counter.current >= 10) {
  //         //console.log("first");
  //         clearInterval(interval);
  //         setTimeout(() => {
  //           dispatch(closeCall());
  //           sendSocketMessage({
  //             sender: chatDetails.primaryChatter,
  //             receiver: chatDetails.secondaryChatter,
  //             type: "callTmo",
  //             data: new Blob(),
  //             wsClient: wsClient,
  //           });
  //         }, 2000);
  //       }
  //     }
  //   };

  //   // Start the interval
  //   interval = setInterval(sendCallReqMessage, 1000);

  //   // Cleanup function for clearing the interval when the component unmounts or callStatus changes to close or ended
  //   return () => clearInterval(interval);
  // }, [callDetails.callStatus]);

  function handleCallOpen() {
    if (callDetails.callStatus === "close") {
      dispatch(requestCall());
      // dispatch(
      //   updateCallDetails({
      //     primaryChatter: chatDetails.primaryChatter,
      //     secondaryChatter: chatDetails.secondaryChatter,
      //   })
      // );
    }
  }
  return (
    <div className="bg-gray-200 border-b border-gray-400 font-bold text-black h-14 w-full absolute top-0 flex justify-between items-center px-2">
      <p>{chatterName}</p>
      <button onClick={handleCallOpen} className="px-3 py-2">
        <Icon name="Call" className=" hover:text-gray-700 text-xl" />
      </button>
    </div>
  );
}
