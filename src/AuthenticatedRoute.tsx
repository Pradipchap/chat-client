import { Navigate } from "react-router-dom";
import getProjectCookieValue from "../functions/getCookieValue";
import Front from "./sections/Front";

export default function AuthenticatedRoute() {
  const userDetails = getProjectCookieValue();
  if (userDetails === null) {
    return <Navigate to="/login" />;
  } else return <Front />;
}
