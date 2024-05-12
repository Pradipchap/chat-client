import GoogleLogo from "../assets/google.svg";
import Input from "../components/Inputs/Input";
import Button from "../components/Button";
import { FormEvent, useState } from "react";
import useToast from "../../customHooks/useToast";
import EmailVerification from "./EmailVerification";
import getFormElementValues from "../../functions/getFormElementValues";
import { SERVER_BASE_URL } from "../../utils/constants";
interface stepValues {
  step: number;
  email: string;
}
export default function Signup() {
  const { showError, showLoading, showSuccess } = useToast();
  const [step, setStep] = useState<stepValues>({ step: 0, email: "" });

  async function signUpHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("first");
    const { username, email, password, confirmPassword } = getFormElementValues(
      event
    ) as {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    };
    console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      showError("password must be same ");
      return;
    }
    showLoading("loading");
    const requestData = {
      username,
      email,
      password
    };

    try {
      const response = await fetch(SERVER_BASE_URL+ "/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (await response.ok) {
        showSuccess("User successfully created");
        setStep({ step: 1, email: email });
      } else {
        const output=await response.json()
        showError(output.error.errorMessage);
      }
    } catch (error) {
      showError("user cannot be registered");
    }
  }
  return (
    <div className="w-full min-h-screen h-full flex flex-none justify-center items-center p-5">
      {step.step === 0 ? (
        <div className="max-w-[400px] 2xl:max-w-[800px] w-full border-gray-100 border p-5 shadow-lg !bg-transparent flex flex-col gap-2 2xl:gap-7">
          <p className="text-customBlue mb-1 text-3xl font-semibold">
            Register your account!
          </p>
          <p className="text-customInputText text-base font-normal">
            Register to start using .
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
            <Button type="submit" className="w-full text-lg">
              Sign Up
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
        </div>
      ) : (
        <EmailVerification email={step.email} />
      )}
    </div>
  );
}
