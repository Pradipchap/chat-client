import { SUBMIT_STATUS } from "./../utils/constants";
import { SERVER_BASE_URL } from "./../utils/constants";
interface props {
  setrequestStatus: (arg0: SUBMIT_STATUS) => void;
  accessToken: string;
  apiString: string;
  requestData: object;
}
async function friendController({
  accessToken,
  apiString,
  requestData,
  setrequestStatus,
}: props) {
  try {
    setrequestStatus(SUBMIT_STATUS.LOADING);
    const response = await fetch(SERVER_BASE_URL + "/api" + apiString, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + " " + accessToken,
      },
      body: JSON.stringify(requestData),
    });
    if (response.ok) {
      setrequestStatus(SUBMIT_STATUS.SUCCESS);
      return response.json();
    } else {
      throw new Error();
    }
  } catch (error) {
    setrequestStatus(SUBMIT_STATUS.FAILED);
    setTimeout(() => {
      setrequestStatus(SUBMIT_STATUS.IDLE);
    }, 5000);
    throw "";
  }
}

export default friendController;
