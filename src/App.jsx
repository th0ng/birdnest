import React from "react";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Header, Body, Footer } from "./components";
import droneService from "./services/drones";

const App = () => {
  const [dronesPosition, setDronesPosition] = useState([]);
  const hook = () => {
    droneService.getdronesPosition().then((data) => {
      setDronesPosition(data);
    }).catch((error) => console.log(error));
  };
  useEffect(hook, []);
  // setInterval(() => {
  //   hook();
  // }, 5000);

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
