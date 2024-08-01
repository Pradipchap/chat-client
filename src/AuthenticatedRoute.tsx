import { Navigate, useLocation } from "react-router-dom";
import getProjectCookieValue from "../functions/getCookieValue";
import Front from "./sections/Front";
import Setting from "./components/Setting";

export default function AuthenticatedRoute() {
  const userDetails = getProjectCookieValue();
  const pathName = useLocation();
  if (userDetails === null) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div className="flex min-h-screen">
        <Setting />
        <div className="flex-grow">
          {pathName.pathname === "/" ? <Navigate to="/chat" /> : <Front />}
        </div>
      </div>
    );
  }
}
