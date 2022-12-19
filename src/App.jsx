import React from "react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Header, Footer } from "./components";
import droneService from "./services/drones";
import pilotService from "./services/pilots";

const App = () => {
  const [drones, setDrones] = useState([]);
  const hook = () => {
    droneService.getdronesPosition().then((information) => {setDrones(information);
    }).catch((error) => console.log(error));
  }
  setInterval(() => {
    hook();
    console.log(drones);
  }, 3000);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Birdnest</title>
      </Helmet>
      <Header />
      <Footer />
    </>
  );
};

export default App;
