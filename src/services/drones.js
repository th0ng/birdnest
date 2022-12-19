import axios from "axios";

const baseUrl = "/drones";

const getdronesPosition = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getdronesPosition };
