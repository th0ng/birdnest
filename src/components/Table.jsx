import React from 'react';
import birdnestService from '../services/birdnest';
import { useState, useEffect } from 'react';

//constructor for data to show in the table
function dataConstructor(serialNumber, positionX, positionY, pilotInformation ) {
  this.serialNumber = serialNumber;
  this.positionX = positionX;
  this.positionY = positionY;
  this.distance = Math.hypot(positionX, positionY);
  this.pilotInformation = pilotInformation;
};

//table function to be exported
const Table = ({ data }) => {
  const [dataArray, setDataArray] = useState([]);
  for (const drone of data) {
    birdnestService
      .getPilotInformation(drone.children[0].value)
      .then((pilotInformation) => {
        const newData = new dataConstructor(
          drone.children[0].value,
          drone.children[8].value,
          drone.children[7].value,
          pilotInformation,
        );
        setDataArray([{data: newData, time: Date.now()}].concat(dataArray));
      }).catch((error) => {console.error(error)});
  }

  return (
    <table>
      <thead>
      <tr>
        <th>Serial Number</th>
        <th>Distance</th>
      </tr>
      </thead>
      <tbody>
      {dataArray.map((item) =>
      <tr>
        <td>{item.data.serialNumber}</td>
        <td>{item.data.distance}</td>
      </tr>
      )}
      </tbody>
    </table>
  )
};

export default Table;