import { lazy, useState } from "react";
import GoogleLogo from "../assets/google.svg";
const Input = lazy(() => import("../components/Inputs/Input"));
const Checkbox = lazy(() => import("../components/Inputs/Checkbox"));
import { FormEvent } from "react";
import useToast from "../../customHooks/useToast";
import { useNavigate } from "react-router-dom";
import getFormElementValues from "../../functions/getFormElementValues";
import { SERVER_BASE_URL, SUBMIT_STATUS } from "../../utils/constants";
import { useAppDispatch } from "../../utils/reduxHooks";
import { fetchSessionData } from "../../redux/slices/SessionSlice";
import setCookie from "../../functions/setCookie";
import StatusButton from "../components/StatusButton";
import LoginIntroduction from "./LoginIntroduction";
import ProfileImage from "../assets/loginImages/profile.png";
import RequestImage from "../assets/loginImages/request.png";
import { ErrorInterface } from "../../interfaces/dataInterfaces";

export default function Login() {
  const dispatch = useAppDispatch();
  const { showError } = useToast();
  const [loginStatus, setLoginStatus] = useState<SUBMIT_STATUS>(
    SUBMIT_STATUS.IDLE
  );
  const navigate = useNavigate();

  async function loginHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const requestData = getFormElementValues(event);
    setLoginStatus(SUBMIT_STATUS.LOADING);
    try {
      const response = await fetch(SERVER_BASE_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      if (await response.ok) {
        setCookie("chatAppDetails", result, 1);
        dispatch(fetchSessionData());
        setLoginStatus(SUBMIT_STATUS.SUCCESS);
        navigate("/chat");
      } else {
        throw result;
      }
    } catch (error) {
      const errorObj = error as ErrorInterface;
      setLoginStatus(SUBMIT_STATUS.FAILED);
      setTimeout(() => {
        setLoginStatus(SUBMIT_STATUS.IDLE);
      }, 3000);
      showError(errorObj.error.message || "user cannot be logged in");
    }
  }

  return (
    <div className="w-full min-h-screen h-full flex flex-none justify-center items-center p-5">
      <LoginIntroduction
        primaryImage={ProfileImage}
        secondaryImage={RequestImage}
      />
      <div className="max-w-[400px] 2xl:max-w-[800px] flex-1 p-5 !bg-transparent flex flex-col gap-2 2xl:gap-7">
        <p className="text-customBlue mb-1 text-3xl font-semibold">Login</p>
        <form
          onSubmit={loginHandler}
          className="space-y-4 2xl:space-y-7 mt-6 flex flex-col"
        >
          <Input
            type="text"
            name="email"
            label="Email number"
            placeholder="Enter your email or phone number"
            containerClassName="2xl:h-14 2xl text-lg"
          />
          <div>
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              containerClassName="2xl:h-14 2xl text-lg"
            />
          </div>
          <div className="w-full flex justify-between">
            <Checkbox label="Remember me" name="rememberme" />
            <a href="/">Forgot Password?</a>
          </div>
          <StatusButton
            successMessage="success"
            idleMessage="Sign in"
            idleIcon="Signin"
            loadingMessage="signing in"
            failedMessage="sign in failed"
            requestStatus={loginStatus}
            type="submit"
          />
          <button
            // onClick={() => signIn("google")}
            className="w-full h-10 font-medium shadow-md hover:text-black border hover:border-customBlue rounded-[4px]"
          >
            <div className="flex items-center justify-center">
              <img
                src={GoogleLogo}
                alt="google-logo"
                width={20}
                height={20}
                className="mr-2"
              />
              Sign in with Google
            </div>
          </button>
        </form>
        <div className="flex items-center justify-center mt-6 gap-1">
          <p className="text-subtext text-customInputText">
            Don’t have an account?
          </p>
          <a href="/register" className="!text-customBlue">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
