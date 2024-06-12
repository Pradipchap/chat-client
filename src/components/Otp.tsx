import { InputHTMLAttributes, KeyboardEvent } from "react";
import { NUMBER_REGEX } from "../../utils/constants";

interface OTPProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  subtitle: string;
  inputs?: string[];
  handleResend: () => void;
  onchange: (e: KeyboardEvent<HTMLInputElement>, input: string) => void;
}

export default function OTP({
  title,
  inputs = ["first", "second", "third", "fourth", "fifth", "sixth"],
  subtitle,
  handleResend,
  onchange,
  ...rest
}: OTPProps) {
  function handleNumkeyInput(event: KeyboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const keyName = event.key;
    const prevElement = event.currentTarget
      .previousElementSibling as HTMLInputElement;
    const nextElement = event.currentTarget
      .nextElementSibling as HTMLInputElement;

    switch (keyName) {
      case "Backspace":
        event.currentTarget.value = "";
        onchange(event, event.currentTarget.value);

        if (prevElement?.tagName === "INPUT") {
          prevElement?.focus();
        }
        break;

      case "ArrowLeft":
        prevElement?.focus();
        break;

      case "ArrowRight":
        nextElement?.focus();
        break;

      default:
        if (!NUMBER_REGEX.test(event.key)) return;

        event.currentTarget.value = event.key;
        onchange(event, event.currentTarget.value);

        if (nextElement?.tagName === "INPUT") {
          nextElement?.focus();
        }
        break;
    }
  }

  return (
    <div className="flex flex-col gap-3 py-5">
      <p className="text-2xl font-medium">{title}</p>
      <p className="text-black/80 text-sm">{subtitle}</p>
      <div className="flex gap-5">
        {inputs.map((input) => (
          <input
            key={input}
            type="number"
            pattern="[0-9]+"
            onKeyDown={handleNumkeyInput}
            onChange={() => {
              //console.log(e.target.value);
            }}
            maxLength={1}
            className="w-14 h-12 appearance-none flex flex-col items-center justify-center text-center px-2 outline-none border rounded-sm border-blue-900 text-lg bg-white ring-blue-700"
            name={input}
            {...rest}
          />
        ))}
      </div>
      <div className="text-customBlue mb-5 mt-2">
        Didn’t receive the code?{" "}
        <button onClick={handleResend} className="font-semibold">
          Re-send
        </button>
      </div>
    </div>
  );
}
