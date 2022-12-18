import axios from "axios";

const baseUrl = "assignments.reaktor.com/birdnest/pilosts/";

const getPilotInformation = async ({ pilotId }) => {
  const response = await axios.get(baseUrl + pilotId);
  return response.json();
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getPilotInformation };
