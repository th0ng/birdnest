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

//function to push the data into array, with timestamp
const push = (array, value) => {
  array.push({
     value: value,
     time: Date.now()
  });
};

//table function to be exported
const Table = ({ data }) => {

  const tableData = [];

  for (const x of data) {
    console.log(x);
    // birdnestService
    //   .getPilotInformation(x.children[0].value)
    //   .then((data) => {
    //     let newData = new dataConstructor(
    //       x.children[0].value,
    //       x.children[8].value,
    //       x.children[7].value,
    //       data,
    //     );
    //     push(tableData, newData);
    //   })
      let newData = new dataConstructor(
        x.children[0].value,
        x.children[8].value,
        x.children[7].value,
        data,
      );
      push(tableData, newData);
  }

  // delete data after 10 minutes
  setInterval(() => {
    let time = Date.now();
    for (const item of tableData) {
      if (time > item.time + 6000) {
        tableData.splice(tableData.indexOf(item), 1);
      }
    };
  }, 6000);


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
      {tableData.map((item, i) =>
      <tr>
        <td>{i}</td>
        <td>{item.value.serialNumber}</td>
        <td>{item.value.distance}</td>
      </tr>
      )}
      </tbody>
    </table>
  )
};

export default Table;