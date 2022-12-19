import React from "react";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Header, Body, Footer } from "./components";
import droneService from "./services/drones";
import pilotService from "./services/pilots";

const App = () => {
  const [dronesPosition, setDronesPosition] = useState([]);
  const hook = () => {
    droneService.getdronesPosition().then((information) => {
      setDronesPosition(information);
      console.log(information);
    }).catch((error) => console.log(error));
  }
  useEffect(hook, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Birdnest</title>
      </Helmet>
      <Header />
      <Body dronesPosition={dronesPosition} />
      <Footer />
    </>
  );
};

export default App;
