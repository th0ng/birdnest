import axios from "axios";

const baseUrl = "/pilosts/";

const getPilotInformation = async ({ serialNumber }) => {
  const response = await axios.get(baseUrl + serialNumber);
  return response.json();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getPilotInformation };
