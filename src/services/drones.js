import axios from "axios";

const baseUrl = "/drones";

//request to the database and get back xml data
const getdronesPosition = async () => {
  const response = await axios.get(baseUrl);
  let parser = new DOMParser();
  return parser.parseFromString(response.data, "application/xml");
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getdronesPosition };
