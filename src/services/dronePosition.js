import axios from "axios";

const baseUrl = "assignments.reaktor.com/birdnest/drones";

const getdronesPosition = async () => {
  const response = await axios.get(baseUrl);
  return response.json();
};

export default { getdronesPosition };
