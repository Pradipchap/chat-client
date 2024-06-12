import OTP from "../components/Otp";
import Button from "../components/Button";
import { FormEvent } from "react";
import useToast from "../../customHooks/useToast";
import { useNavigate } from "react-router-dom";
import getFormElementValues from "../../functions/getFormElementValues";
import { SERVER_BASE_URL } from "../../utils/constants";

export default function EmailVerification({ email }: { email: string }) {
  const { showError, showLoading, showSuccess } = useToast();
  const navigate = useNavigate();

  async function EmailVerificationHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const otps: { [key: string]: string } = getFormElementValues(event) as {
      [key: string]: string;
    };
    let otp = "";

    for (const key in otps) {
      if (Object.hasOwnProperty.call(otps, key)) {
        otp += otps[key];
      }
    }
    //console.log(Number(otp));
    showLoading("loading");
    const requestData = { email, code: Number(otp) };

    try {
      const response = await fetch(
        SERVER_BASE_URL + "/api/verifyemail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );
      if (await response.ok) {
        showSuccess("User successfully verified");
        navigate("/login");
      } else {
        showError("user cannot be verified");
      }
    } catch (error) {
      showError("user cannot be verified");
    }
  }
  return (
    <form
      className="flex flex-col gap-4 p-5"
      onSubmit={EmailVerificationHandler}
    >
      <OTP
        title="Email verification"
        handleResend={() => {}}
        onchange={() => {}}
        subtitle="Enter verification code sent to your mail"
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
