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
      <div className="container px-5 py-10 mx-auto">
        { drones.length === 0 ? <div className='flex flex-col text-center font-mono font-bold text-2xl'>Loading...</div> : <Body drones={drones} />}
      </div>
      <Footer />
    </>
  );
};

export default App;
