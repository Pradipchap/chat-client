import { useEffect, useState } from "react";
import RoutingMachine from "../components/RoutingMachine";
import { useMap } from "react-leaflet";

export default function Hello() {
  const [position, setPostion] = useState(null);
  const map = useMap();
  // const { location } = useGetLocaion(setPostion);

  useEffect(() => {
    console.log(position);
  }, [position]);
  const betweenPoints = [
    {
      latitude: 27.712465,
      longitude: 85.317792,
    },
    {
      latitude: 27.712949,
      longitude: 85.317824,
    },
    {
      latitude: 27.713187,
      longitude: 85.317888,
    },
    {
      latitude: 27.71331,
      longitude: 85.317588,
    },
    {
      latitude: 27.713975,
      longitude: 85.315549,
    },
    {
      latitude: 27.714792,
      longitude: 85.315678,
    },
    {
      latitude: 27.715827,
      longitude: 85.315925,
    },
  ];

  useEffect(() => {
    let a = 0;
    const interval = setInterval(() => {
      a = a + 1;
      console.log(a);
      if (a >= betweenPoints.length - 1) {
        clearInterval(interval);
        return;
      }
      // map.setView(([betweenPoints[x.current].latitude,betweenPoints[x.current].longitude]))
      setPostion(betweenPoints[a]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const waypoints = [
    { latitude: 27.712949, longitude: 85.317824 },
    {
      latitude: 27.7119,
      longitude: 85.3181,
    },
  ];
  if (waypoints && position) {
    RoutingMachine({ waypoints, map });
  }
  return <></>;
}
