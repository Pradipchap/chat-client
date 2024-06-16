import "./App.css";
import Toast from "./components/Toast";
import Login from "./sections/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./sections/Signup.tsx";
import AuthenticatedRoute from "./AuthenticatedRoute.tsx";
import { lazy, Suspense } from "react";
import Friends from "./sections/Friends.tsx";
import FriendsGroup from "./sections/FriendsGroup.tsx";
import Loading from "./components/Loading.tsx";
import UserProfile from "./sections/UserProfile.tsx";
import { SERVER_BASE_URL } from "../utils/constants.ts";
import Chat from "./components/ChatBox.tsx";
import { useAppSelector } from "../utils/reduxHooks.ts";
import Home from "./sections/Home.tsx";
const AddFriends = lazy(async () => import(".//sections/AddFriends.tsx"));
const FriendRequests = lazy(async () =>
  import("./sections/FriendRequests.tsx")
);

function App() {
  const currentUser = useAppSelector((state) => state.currentUser);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticatedRoute />,
      children: [
        {
          path: "/chat",
          element: <Home />,
          children: [
            {
              path: ":chatterID",
              element: <Chat />,
            },
          ],
        },
        {
          path: "/friends",
          element: <Friends />,
          children: [
            {
              path: "friends",
              element: <FriendsGroup />,
            },
            {
              path: "addFriends",
              element: (
                <Suspense fallback={<Loading />}>
                  <AddFriends />
                </Suspense>
              ),
            },
            {
              path: "friendRequests",
              element: (
                <Suspense fallback={<Loading />}>
                  <FriendRequests />
                </Suspense>
              ),
            },
            {
              path: "userProfile/:userID",
              element: <UserProfile />,
              loader: async ({ request, params }) => {
                return fetch(
                  `${SERVER_BASE_URL}/api/user?userID=${params.userID}`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${currentUser.accessToken}`,
                    },
                    signal: request.signal,
                  }
                );
              },
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/register", element: <Signup /> },
  ]);
  return (
    <>
      <Toast />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
