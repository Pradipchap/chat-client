import { requestCall } from "../../redux/slices/CallSlice";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import Icon from "./Icon";

export default function ChatBoxTopBar() {
  const dispatch = useAppDispatch();
  const chatterName = useAppSelector(
    (state) => state.chat.secondaryChatterName
  );
  const callDetails = useAppSelector((state) => state.call);

  function handleCallOpen() {
    if (callDetails.callStatus === "close") {
      dispatch(requestCall());
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
