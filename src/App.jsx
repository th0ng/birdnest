import React from "react";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Header, Body, Footer } from "./components";
import droneService from "./services/drones";

const App = () => {
  const [drones, setDrones] = useState([]);
  const hook = () => {
    droneService.getdronesPosition().then((data) => {
      setDrones(data);
    }).catch((error) => console.log(error));
  };
  useEffect(hook, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Birdnest</title>
      </Helmet>
      <Header />
      <Body drones={drones} />
      <Footer />
    </>
  );
};

export default App;
