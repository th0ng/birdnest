import React from 'react';
import birdnestService from '../services/birdnest';
import { useEffect } from 'react';

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

  const dataArray = [];
  console.log(typeof dataArray);
  for (const drone of data) {
    birdnestService
      .getPilotInformation(drone.children[0].value)
      .then((information) => {
        const newData = new dataConstructor(
          drone.children[0].value,
          drone.children[8].value,
          drone.children[7].value,
          information,
        );
        dataArray.unshift([{
          data: newData,
          time: Date.now()
        }]);
      }).catch((error) => {console.error(error)});
  }

  // delete data after 10 minutes
  // setInterval(() => {
  //   let time = Date.now();
  //   for (const item of tableData) {
  //     if (time > item.time + 6000) {
  //       tableData.splice(tableData.indexOf(item), 1);
  //     }
  //   };
  // }, 6000);

  return (
    <table>
      <thead>
      <tr>
        <th>Index</th>
        <th>Serial Number</th>
        <th>Distance</th>
      </tr>
      </thead>
      <tbody>
      {dataArray.map((item, index) =>
      <tr>
        <td>{index + 1}</td>
        <td>{item.data.serialNumber}</td>
        <td>{item.data.distance}</td>
      </tr>
      )}
      </tbody>
    </table>
  )
};

export default Table;