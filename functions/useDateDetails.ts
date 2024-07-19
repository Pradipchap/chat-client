import { useEffect, useState } from "react";
import returnMonth from "../functions/getMonth";

export default function useDateDetails(dateString: string) {
  const [timePassed, setTimePassed] = useState(getTime());

  function getTime() {
    if (dateString === "") {
      return "";
    }
    const datetime = new Date(dateString);
    const givenDateTime = datetime.getTime();
    const currentDateTime = new Date().getTime();

    const differenceInSeconds = (currentDateTime - givenDateTime) / 1000;
    if (differenceInSeconds < 30) {
      return "Just now";
    } else if (differenceInSeconds < 60) {
      return "1 min ago";
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} min ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = datetime.getHours();
      const minutes = datetime.getMinutes();
      const finalTime =
        hours <= 12
          ? `${hours}:${minutes.toString().padStart(2, "0")} AM`
          : `${hours - 12}:${minutes.toString().padStart(2, "0")} PM`;
      return finalTime;
    } else if (differenceInSeconds < 31560000) {
      const month = returnMonth(datetime.getMonth() + 1);
      const day = datetime.getDate();
      return `${month} ${day}`;
    } else {
      const year = Math.floor(differenceInSeconds / 31560000);
      return `${year} ago`;
    }
  }

  useEffect(() => {
    setTimePassed(getTime());
  }, [dateString]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      function setTime() {
        const x = getTime();
        setTimePassed(x);
        // setDateTime(x);
      }
      setTime();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return timePassed;
}
