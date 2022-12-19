import axios from "axios";
import XMLParser from "react-xml-parser";
const baseUrl = "/drones";

//request to the database and get back xml data
const getdronesPosition = async () => {
  const response = await axios.get(baseUrl, {
    "Content-Type": "application/xml; charset=utf-8",
  });
  const jsonData = new XMLParser().parseFromString(response.data);
  return jsonData;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getdronesPosition };
