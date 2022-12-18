import React from "react";
import { useState, useEffect } from "react";
import { Header, Footer } from "./components";
import droneService from "./services/drones";
import pilotService from "./services/pilots";

const App = () => {
  const [drones, setDrones] = useState([]);
  const hook = () => {
    droneService.getdronesPosition().then((information) => setDrones(information)).catch((error) => console.log(error));
  }
  useEffect(hook, []);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default App;
