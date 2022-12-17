import axios from "axios";

const baseUrl = "assignments.reaktor.com/birdnest/drones";

const getdronesPosition = async () => {
  const response = await axios.get(baseUrl);
  return response.xml().content;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getdronesPosition };
