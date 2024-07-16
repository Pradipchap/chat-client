import classNames from "../../../utils/classNames";
import { ChangeEvent, useRef, useState } from "react";
import Icon from "../Icon";

interface props {
  className?: string;
  defaultImage?: string;
  shape?: "circle" | "square";
  required?: boolean;
}

export default function ImageUpload({
  className,
  defaultImage,
  shape = "square",
  required = false,
}: props) {
  const [urlImage, seturlImage] = useState<string>(null!);
  const previewImageRef = useRef<HTMLImageElement>(null!);
  function getImageForPreview(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const dataUrl = URL.createObjectURL(file);
      seturlImage(dataUrl);
    }
  }
  return (
    <div>
      <label
        htmlFor="image"
        className={classNames(
          `relative group bg-gray-200  ${
            shape === "square" ? "rounded-sm" : "rounded-full"
          } border border-gray-300 h-64 w-72 flex justify-center items-center`,
          className
        )}
      >
        {urlImage || defaultImage ? (
          <>
            <div
              className={`h-full group-hover:flex justify-center items-center hidden w-full absolute bg-gray-600/60 ${
                shape === "square" ? "rounded-sm" : "rounded-full"
              }`}
            >
              <Icon name="write" className=" h-10 " />
            </div>
            <img
              height={100}
              width={100}
              alt="preview image"
              src={urlImage || defaultImage || ""}
              ref={previewImageRef}
              className={`h-full w-full object-cover ${
                shape === "square" ? "rounded-sm" : "rounded-full"
              } `}
            />
          </>
        ) : (
          <p className="text-gray-600">Upload an Image for preview</p>
        )}

        <input
          type="file"
          name="image"
          id="image"
          className="hidden"
          onChange={getImageForPreview}
          required={required}
        />
      </label>
    </div>
  );
}
