import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
const Toast = lazy(() => import("./components/Toast"));
const Login = lazy(() => import("./sections/Login.tsx"));
const Signup = lazy(() => import("./sections/Signup.tsx"));
const AuthenticatedRoute = lazy(() => import("./AuthenticatedRoute.tsx"));
const Friends = lazy(() => import("./sections/Friends.tsx"));
const FriendsGroup = lazy(() => import("./sections/FriendsGroup.tsx"));
const Loading = lazy(() => import("./components/Loading.tsx"));
const UserProfile = lazy(() => import("./sections/UserProfile.tsx"));
const Chat = lazy(() => import("./components/ChatBox.tsx"));
const Home = lazy(() => import("./sections/Home.tsx"));
const AddFriends = lazy(async () => import(".//sections/AddFriends.tsx"));
const FriendRequests = lazy(async () =>
  import("./sections/FriendRequests.tsx")
);

import { SERVER_BASE_URL } from "../utils/constants.ts";
import { useAppSelector } from "../utils/reduxHooks.ts";
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
              element: (
                <Suspense fallback={null}>
                  <Chat />
                </Suspense>
              ),
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
