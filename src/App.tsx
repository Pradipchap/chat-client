import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
const Toast = lazy(() => import("./components/Toast"));
const Login = lazy(() => import("./sections/Login.tsx"));
const Signup = lazy(() => import("./sections/Signup.tsx"));
const AuthenticatedRoute = lazy(() => import("./AuthenticatedRoute.tsx"));
const Options = lazy(() => import("./sections/Options.tsx"));
const FriendsGroup = lazy(() => import("./sections/FriendsGroup.tsx"));
const Loading = lazy(() => import("./components/Loading.tsx"));
const UserProfile = lazy(() => import("./sections/UserProfile.tsx"));
const Chat = lazy(() => import("./components/ChatBox.tsx"));
const Home = lazy(() => import("./sections/Home.tsx"));
const AddFriends = lazy(async () => import(".//sections/AddFriends.tsx"));
const FriendRequests = lazy(async () =>
  import("./sections/FriendRequests.tsx")
);
const Profile = lazy(() => import("./sections/Profile.tsx"));
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
          element: (
            <Suspense fallback={null}>
              {" "}
              <Home />
            </Suspense>
          ),
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
          path: "/options",
          element: (
            <Suspense fallback={null}>
              <Options />
            </Suspense>
          ),
          children: [
            {
              path: "friends",
              element: (
                <Suspense fallback={null}>
                  <FriendsGroup />
                </Suspense>
              ),
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
                const requestID = params.userID;
                return fetch(`${SERVER_BASE_URL}/api/user`, {
                  method: "POST",
                  body: JSON.stringify({ requestID }),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${currentUser.accessToken}`,
                  },

                  signal: request.signal,
                });
              },
            },
            {
              path: "profile",
              element: (
                <Suspense fallback={null}>
                  <Profile />
                </Suspense>
              ),
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
      <Suspense>
        <Toast />
      </Suspense>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
