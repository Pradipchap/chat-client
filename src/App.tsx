import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
const Toast = lazy(() => import("./components/Toast"));
const Login = lazy(() => import("./sections/Login.tsx"));
const Signup = lazy(() => import("./sections/Signup.tsx"));
const AuthenticatedRoute = lazy(() => import("./AuthenticatedRoute.tsx"));
const FriendsGroup = lazy(() => import("./sections/FriendsGroup.tsx"));
const UserProfile = lazy(() => import("./sections/UserProfile.tsx"));
const Chat = lazy(() => import("./components/ChatBox.tsx"));
const Home = lazy(() => import("./sections/Home.tsx"));
const AddFriends = lazy(async () => import(".//sections/AddFriends.tsx"));
const FriendRequests = lazy(async () =>
  import("./sections/FriendRequests.tsx")
);
const Profile = lazy(() => import("./sections/Profile.tsx"));
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={null}>
          <AuthenticatedRoute />
        </Suspense>
      ),
      children: [
        {
          path: "/chat",
          element: (
            <Suspense fallback={null}>
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
          path: "profile",
          element: (
            <Suspense fallback={null}>
              <Profile />
            </Suspense>
          ),
        },
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
            <Suspense fallback={null}>
              <AddFriends />
            </Suspense>
          ),
        },
        {
          path: "friendRequests",
          element: (
            <Suspense fallback={null}>
              <FriendRequests />
            </Suspense>
          ),
        },
        {
          path: "userProfile/:userID",
          element: <UserProfile />,
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
