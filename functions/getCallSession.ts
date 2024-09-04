export default function getCallSession() {
  const callDetails = localStorage.getItem("callDetails");
  const parsedData = JSON.parse(callDetails || "{}");
  const userId = parsedData.userId || null;
  return { userId };
}
