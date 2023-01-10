import React, { useState, useEffect } from "react";
import { Header, Body, Footer } from "./components";
import birdnestService from "./services/birdnest";

const App = () => {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await birdnestService.getdronesPosition();
        setDrones(data);
      } catch (error) {
        throw new Error(error);
      }
    }, 2000); // this will run the effect every 2 seconds

    return () => clearInterval(interval); // this will clear the interval when the component unmounts
  }, []);

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
