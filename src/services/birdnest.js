import XMLParser from "react-xml-parser";

const getdronesPosition = async () => {
  const reponse = await fetch(
    "https://assignments.reaktor.com/birdnest/drones",
    {
      method: "GET",
      "Content-Type": "application/xml; charset=utf-8",
    }
  );
  const jsonData = new XMLParser().parseFromString(reponse.data);
  return jsonData;
};

const getPilotInformation = async (serialNumber) => {
  const response = await fetch(
    `https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`,
    {
      method: "GET",
      "Content-Type": "application/json",
    }
  );
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getdronesPosition, getPilotInformation };
