import React from "react";
import { useState, useEffect } from "react";
import { Header, Body, Footer } from "./components";
import birdnestService from "./services/birdnest";

const App = () => {
  const [drones, setDrones] = useState([]);
  const hook = () => {
    birdnestService.getdronesPosition().then((data) => {
      setDrones(data);
    }).catch((error) => console.log(error));
  };
  setInterval(() => {
    hook();
  }, 2000);

  return (
    <>
      <Header />
      <div className="container px-5 py-10 mx-auto">
        { drones.length === 0 ? <div className='flex flex-col text-center font-mono font-bold text-2xl'>Loading...</div> : <Body drones={drones} />}
      </div>
      <Footer />
    </>
  );
};

export default App;
