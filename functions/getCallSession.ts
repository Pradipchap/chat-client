export default function getCallSession() {
  const callDetails = localStorage.getItem("callDetails");
  const { userId } = JSON.parse(callDetails || "");
  return { userId };
}
