import axios from "axios";
import XMLParser from "react-xml-parser";

//request to the database and get back xml data
const getdronesPosition = async () => {
  const response = await axios.get("/drones", {
    "Content-Type": "application/xml; charset=utf-8",
  });
  const jsonData = new XMLParser().parseFromString(response.data);
  return jsonData;
};

//function to get pilot information by serial number
const getPilotInformation = async (serialNumber) => {
  const response = await axios.get(`/pilots/${serialNumber}`, {
    "Content-Type": "application/json",
  });
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getdronesPosition, getPilotInformation };
