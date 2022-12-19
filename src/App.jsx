import React from "react";
import { useState } from "react";
import { Header, Footer } from "./components";
import droneService from "./services/drones";
import pilotService from "./services/pilots";

const App = () => {
  const [drones, setDrones] = useState([]);
  const hook = () => {
    droneService.getdronesPosition().then((information) => {setDrones(information);
    console.log(information);
    }).catch((error) => console.log(error));
  }
  setInterval(() => {
    hook();
  }, 2000);

  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default App;
