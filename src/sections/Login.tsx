import GoogleLogo from "../assets/google.svg";
import Input from "../components/Inputs/Input";
import Checkbox from "../components/Inputs/Checkbox";
import Button from "../components/Button";
import { FormEvent } from "react";
import useToast from "../../customHooks/useToast";
import { useNavigate } from "react-router-dom";
import getFormElementValues from "../../functions/getFormElementValues";
import { SERVER_BASE_URL } from "../../utils/constants";
import { useAppDispatch } from "../../utils/reduxHooks";
import { fetchSessionData } from "../../redux/slices/SessionSlice";
import setCookie from "../../functions/setCookie";

export default function Login() {
  const dispatch = useAppDispatch();
  const { showError, showLoading, showSuccess } = useToast();
  const navigate = useNavigate();

  async function loginHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const requestData = getFormElementValues(event);
    showLoading("loading");
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
        showSuccess("User successfully created");
        setCookie("chatAppDetails", JSON.stringify(result), 1);
        dispatch(fetchSessionData());
        navigate("/");
      } else {
        showError("user be registered");
      }
    } catch (error) {
      console.log(error);
      showError("user cannot be registered");
    }
  }

  return (
    <div className="w-full min-h-screen h-full flex flex-none justify-center items-center p-5">
      <div className="max-w-[400px] 2xl:max-w-[800px] w-full border-gray-100 border p-5 shadow-lg !bg-transparent flex flex-col gap-2 2xl:gap-7">
        <p className="text-customBlue mb-1 text-5xl font-semibold">Login!</p>
        <p className="text-customInputText text-base font-normal">
          Sign in to start your session.
        </p>
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
            {/* {error && <ErrorText error={error} />} */}
          </div>
          <div className="w-full flex justify-between">
            <Checkbox label="Remember me" name="rememberme" />
            <a href="/">Forgot Password?</a>
          </div>
          <Button type="submit" className="w-full text-lg">
            Sign in
          </Button>
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
