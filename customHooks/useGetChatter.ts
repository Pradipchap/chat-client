import { useLocation } from "react-router-dom";

export default function useGetChatter() {
  const secondaryChatter = useLocation().pathname.split("/")[2] || null;
  return secondaryChatter;
}
