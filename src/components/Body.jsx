import React from 'react';
import { useState, useEffect } from 'react';
import birdnestService from '../services/birdnest';

//construction for drone data
function droneConstructor(serialNumber, positionX, positionY, closestDistance, pilotInformation ) {
  this.serialNumber = serialNumber;
  this.positionX = positionX;
  this.positionY = positionY;
  this.closestDistance = closestDistance;
  this.pilotInformation = pilotInformation;
};

//Body
const Body = ({ drones }) => {
  //device data, stay static
  const device = drones.children[0];
  //drones data, updated every 2 seconds
  const dronesData = drones.children[1].children;

  //array to store the data
  const [violatingDrones, setViolatingDrones] = useState([]);
  useEffect(() => {
    //Looping through the data
  for (const drone of dronesData) {
    //Check if the position is in the no-fly zone
    const distance = Math.hypot(Math.abs(drone.children[8].value - 250000), Math.abs(drone.children[7].value - 250000))
    if (distance < 100000 ) {
      //Check if there's already that drone in the array, if so update the timestamp, else update the array with the new drone
      const found = violatingDrones.find(obj => obj.data.serialNumber === drone.children[0].value);
      if (found) {
        const updatedClosestDistance = distance < found.data.distance ? distance : found.data.distance;
        //Define the updated piece of data
        const updatedDroneData = new droneConstructor(
          found.data.serialNumber,
          drone.children[8].value,
          drone.children[7].value,
          updatedClosestDistance,
          found.data.pilotInformation,
        )
        const updatedDrone = {
          data: updatedDroneData,
          time: Date.now()
        };
        const updatedDronesArray = violatingDrones.map(drone => drone.data.serialNumber === updatedDrone.data.serialNumber ? updatedDrone : drone );
        setViolatingDrones(updatedDronesArray);
      } else {
        //If there's not the drone in the array, get the pilot information and make a new data by constructor, after that add new data to the array and update the array
        birdnestService
          .getPilotInformation(drone.children[0].value)
          .then((pilotInformation) => {
            const newViolatingDrone = {
              data: new droneConstructor(
                drone.children[0].value,
                drone.children[8].value,
                drone.children[7].value,
                distance,
                pilotInformation,
              ),
              time: Date.now()
            };
            setViolatingDrones([newViolatingDrone, ...violatingDrones]);
          });
      }
    }
  };
  },[drones, dronesData, violatingDrones])

  //check for outtimed data every 1 minute.
  useEffect(() => {
    const interval = setInterval(() => {
      var time = Date.now();
    var updatedDronesArray = violatingDrones.filter(d =>
      d.time + 600000 > time);
    setViolatingDrones(updatedDronesArray);
    }, 60000); // this will run the effect every 1 minute
    return () => clearInterval(interval); // this will clear the interval when the component unmounts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='flex w-full mb-5 font-mono'>
        <div className='flex flex-col w-1/2'>
          <h2 className='font-bold text-xl text-indigo-500'>Device:</h2>
          <p className='font-medium text-base'>
          Device ID: {device.attributes.deviceId}
          <br />
          Started Time: {
            new Date(device.children[1].value).toTimeString()
            + ' on '
            + new Date(device.children[1].value).toLocaleDateString()
          }
          </p>
        </div>
        <div className='flex w-1/2'>

        </div>
      </div>
      <div className='flex w-full mt-5 font-mono'>
        <table>
          <thead>
            <th>Serial number</th>
            <th>Closest distance</th>
            <th>Pilot</th>
          </thead>
          <tbody>
            {violatingDrones.map((drone) =>
              <tr>
                <td>{drone.data.serialNumber}</td>
                <td>{drone.data.closestDistance}</td>
                <td>{drone.data.pilotInformation}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Body;
