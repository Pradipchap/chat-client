import { useEffect, useRef, useState, startTransition } from "react";
import { updateChatters } from "../../redux/slices/UsersSlice";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { SERVER_BASE_URL } from "../../utils/constants";
import useDebounce from "../../customHooks/useDebounce";

export default function Search() {
  const x = useRef(1);
  const accessToken = useAppSelector((state) => state.currentUser.accessToken);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const debouncedValue = useDebounce(input);
  const chatters = useAppSelector((state) => state.users.chatters);
  const [memoizedChatter, setMemoizedChatter] = useState(chatters);

  useEffect(() => {
    if (x.current <= 1) {
      setMemoizedChatter(chatters);
    }
  }, [chatters]);

  useEffect(() => {
    if (debouncedValue === "") {
      if (x.current > 1) {
        startTransition(() => {
          dispatch(updateChatters(memoizedChatter));
        });
      }
      return;
    }
    
    async function fetchUsers() {
      x.current += 1;
      console.log(x.current);
      if (debouncedValue === "") return;

      try {
        const response = await fetch(`${SERVER_BASE_URL}/api/users/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            searchString: debouncedValue,
          }),
        });

        const users = await response.json();
        console.log(users.users);
        
        startTransition(() => {
          dispatch(updateChatters(users.users));
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    
    fetchUsers();
  }, [debouncedValue, dispatch, memoizedChatter, accessToken]);

  return (
    <div className="relative flex items-center rounded-lg px-2 sm:px-3 h-10 w-full bg-gray-200 my-3">
      <input
        type="search"
        name="searchString"
        onChange={(e) => setInput(e.target.value)}
        id="search"
        className="outline-none border placeholder:text-gray-600 border-gray-400 px-5 rounded-full h-full w-full text-gray-900 active:border bg-gray-200"
        placeholder="Search"
      />
    </div>
  );
}
