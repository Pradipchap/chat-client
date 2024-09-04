import { FormEvent, lazy, useState } from "react";
const Input = lazy(() => import("../components/Inputs/Input"));
const EmailVerification = lazy(() => import("./EmailVerification"));
import GoogleLogo from "../assets/google.svg";
import useToast from "../../customHooks/useToast";
import getFormElementValues from "../../functions/getFormElementValues";
import { SERVER_BASE_URL, SUBMIT_STATUS } from "../../utils/constants";
import LoginIntroduction from "./LoginIntroduction";
import StatusButton from "../components/StatusButton";
import ChatImage from "../assets/loginImages/chat.png";
import friendsImage from "../assets/loginImages/friends.png";
import { ErrorInterface } from "../../interfaces/dataInterfaces";

interface stepValues {
  step: number;
  email: string;
}
export default function Signup() {
  const { showError } = useToast();
  const [step, setStep] = useState<stepValues>({ step: 0, email: "" });
  const [loginStatus, setLoginStatus] = useState<SUBMIT_STATUS>(
    SUBMIT_STATUS.IDLE
  );

  async function signUpHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginStatus(SUBMIT_STATUS.LOADING);
    ////console.log("first");
    const { username, email, password, confirmPassword } = getFormElementValues(
      event
    ) as {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    };
    try {
      ////console.log(password, confirmPassword);
      if (password !== confirmPassword) {
        throw { error: { message: "password must be same" } };
      }
      const requestData = {
        username,
        email,
        password,
      };

      const response = await fetch(SERVER_BASE_URL + "/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      if (await response.ok) {
        setStep({ step: 1, email: email });
        setLoginStatus(SUBMIT_STATUS.SUCCESS);
      } else {
        throw result;
      }
    } catch (error) {
      const errorObj = error as ErrorInterface;
      showError(errorObj.error.message || "user cannot be registered");
      setLoginStatus(SUBMIT_STATUS.FAILED);
    } finally {
      setTimeout(() => {
        setLoginStatus(SUBMIT_STATUS.IDLE);
      }, 3000);
    }
  }
  return (
    <div className="w-full min-h-screen h-full flex flex-none justify-center items-center px-5">
      <LoginIntroduction
        primaryImage={ChatImage}
        secondaryImage={friendsImage}
      />
      {step.step === 0 ? (
        <div className="max-w-[500px] h-full flex-1 flex flex-col gap-2 2xl:gap-7">
          <p className="text-customBlue mb-1 text-3xl font-semibold">
            Register your account!
          </p>
          <form
            className="space-y-4 2xl:space-y-7 mt-6 flex flex-col"
            onSubmit={signUpHandler}
          >
            <Input
              type="text"
              name="username"
              label="Full Name"
              required
              placeholder="Enter your full name"
              containerClassName="2xl:h-14 2xl text-lg"
            />
            <Input
              type="email"
              name="email"
              required
              label="Email"
              placeholder="Enter your email or phone number"
              containerClassName="2xl:h-14 2xl text-lg"
            />
            <Input
              name="password"
              type="password"
              label="Password"
              required
              placeholder="Enter your password"
              containerClassName="2xl:h-14 2xl text-lg"
            />
            <Input
              name="confirmPassword"
              type="password"
              required
              label="Confirm Password"
              placeholder="Enter your password"
              containerClassName="2xl:h-14 2xl text-lg"
            />
            <StatusButton
              successMessage="success"
              idleMessage="Sign in"
              idleIcon="Signin"
              loadingMessage="signing in"
              failedMessage="sign in failed"
              requestStatus={loginStatus}
              className="h-11 text-base"
              type="submit"
            />
            <button
              // onClick={() => signIn("google")}
              className="w-full h-10 font-medium shadow-md hover:text-black border rounded-[4px]"
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
            <div className="flex items-center justify-center mt-6 gap-1">
              <p className="text-subtext text-customInputText">
                Already have an account?
              </p>
              <a href="/login" className="!text-customBlue">
                Log in
              </a>
            </div>
          </form>
        </div>
      ) : (
        <EmailVerification email={step.email} />
      )}
    </div>
  );
}
