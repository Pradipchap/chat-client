import { store } from "../redux/store";

export default function setCallSession() {
  const { secondaryChatter, secondaryChatterName, secondaryChatterImage } =
    store.getState().call;
  //console.log(secondaryChatter, secondaryChatterImage, secondaryChatterName);
  const callDetails = JSON.stringify({
    name: secondaryChatterName,
    image: secondaryChatterImage,
    userId: secondaryChatter,
  });
  localStorage.setItem("callDetails", callDetails);
}
