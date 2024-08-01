export interface props {
  title?: string;
  description?: string;
  primaryImage?: string;
  width?: string;
  secondaryImage?: string;
  secondaryImageClassName?: string;
}
import classNames from "../../utils/classNames";
import vite from "../assets/avatar.svg";
import Secondary from "../assets/google.svg";

export default function LoginIntroduction({
  title = "Chat now",
  description = "Experience unlimited free chatting with our user-friendly and engaging app",
  secondaryImage = Secondary,
  primaryImage = vite,
  secondaryImageClassName = "",
}: props) {
  return (
    <div
      className={`max-h-full w-[60%] hidden md:flex flex-col justify-center items-center px-5 gap-5 py-5 text-center overflow-clip`}
    >
      <p className="z-10 text-customBlue font-semibold text-4xl">{title}</p>
      <p className="z-10 text-base font-normal w-full text-[#0F123F]">
        {description}
      </p>
      <div className="z-10 w-full relative flex justify-center items-center flex-col mb-14 mt-5">
        <img
          src={primaryImage}
          alt="homepage screenshot"
          loading="eager"
          className="w-[70%] h-[90%] rounded-xl shadow-[1px_3px_5px_2px_#4a556860]"
        />

        {secondaryImage && (
          <img
            alt="badge"
            className={classNames(
              "rounded-[4px] absolute -bottom-[10%] left-10 shadow-[0px_2px_4px_3px_#00000024] w-[25%]",
              secondaryImageClassName
            )}
            src={secondaryImage}
            loading="eager"
          />
        )}
      </div>
    </div>
  );
}
