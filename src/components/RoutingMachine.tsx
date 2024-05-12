import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Routing({map, waypoints }) {

  // useEffect(() => {
  if (!map) return;

  const routingControl = L.Routing.control({
    waypoints: waypoints.map(({ latitude, longitude }, index) => {
      console.log([latitude, longitude]);
      return L.latLng(latitude, longitude);
    }),
    routeWhileDragging: true,
    lineOptions: {
      styles: [{ color: "blue", opacity: 1, weight: 5 }],
    },
  }).addTo(map);

  //   return () => map.removeControl(routingControl);
  // }, []);

  // return null;
}
