import React from 'react';
import { useState } from 'react';
import birdnestService from '../services/birdnest';

//construction for drone data
function droneConstructor(serialNumber, positionX, positionY, closestDistance, pilotInformation ) {
  this.serialNumber = serialNumber;
  this.positionX = positionX;
  this.positionY = positionY;
  this.closestDistance = closestDistance;
  this.pilotInformation = pilotInformation;
};


const Body = ({ drones }) => {
  //device data
  const device = drones.children[0];
  //drones data
  const dronesData = drones.children[1].children;

  const [violatingDrones, setViolatingDrones] = useState([]);

  //Looping through the data
  for (const drone of dronesData) {
    //Check if the position is in the no-fly zone
    const distance = Math.hypot(Math.abs(drone.children[8].value - 250000), Math.abs(drone.children[7].value - 250000))
    if (distance < 100000 ) {
      //Check if there's already that drone in the array, if so update the timestamp, else update the array with the new drone
      const found = violatingDrones.find(e => e.serialNumber === drone.children[0].value);
      if (found) {
        const index = violatingDrones.indexOf(found);

        const updatedClosestDistance = distance < found.data.distance ? distance : found.data.distance;

        const updatedDrone = {
          data: new droneConstructor(found.serialNumber, drone.children[8].value, drone.chldren[7].value, updatedClosestDistance, found.pilotInformation),
          time: Date.now()
        };
        setViolatingDrones(...violatingDrones.slice(0, index), updatedDrone, ...violatingDrones.slice(index + 1));
      } else {
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
            setViolatingDrones([newViolatingDrone].concat(violatingDrones));
          });
      }
    }
  };

  console.log(violatingDrones);

  setInterval(() => {
    var time = Date.now();
    var updatedDronesArray = violatingDrones.filter(d =>
      d.time + 600000 > time);
    setViolatingDrones(updatedDronesArray);
  }, 1000);

  console.log(violatingDrones);
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
            <th>Time</th>
            <th>Serial number</th>
            <th>Closest distance</th>
            <th>Pilot</th>
          </thead>
          <tbody>
            {violatingDrones.map((drone) =>
              <tr>
                <td>{drone.time.toLocaleDateString}</td>
                <td>{drone.data.serialNumber}</td>
                <td>{drone.data.distance}</td>
                <td>Pilot's informatin here</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Body;
