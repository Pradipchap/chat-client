import { Navigate, useLocation } from "react-router-dom";
import getProjectCookieValue from "../functions/getCookieValue";
import Front from "./sections/Front";

export default function AuthenticatedRoute() {
  const userDetails = getProjectCookieValue();
  const pathName = useLocation();
  if (userDetails === null) {
    return <Navigate to="/login" />;
  } else {
    if (pathName.pathname === "/") {
      console.log("first");
      return <Navigate to={"/chat"} />;
    } else return <Front />;
  }
}
