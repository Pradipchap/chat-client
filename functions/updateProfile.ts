import { CookieInterface } from "../interfaces/dataInterfaces";
import setCookie from "./setCookie";

export default function updateProfile(
  data: { [name: string]: string },
  expiresIn: string,
  accessToken: string
) {
  const updatedData: CookieInterface = {
    accessToken,
    phone: data.phone,
    expiresIn: expiresIn,
    username: data.username,
    userID: data._id,
    image: data.image,
    email: data.email,
  };
  setCookie("blogit", updatedData, expiresIn);
}
