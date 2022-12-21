import React from 'react';
import { useState } from 'react';
import birdnestService from '../services/birdnest';

//constructor for data to show in the table
function dataConstructor(serialNumber, positionX, positionY ) {
  this.serialNumber = serialNumber;
  this.positionX = positionX;
  this.positionY = positionY;
  this.distance = Math.hypot(positionX, positionY);
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
  // const [tableData, setTableData] = useState([]);
  const tableData = [];

  for (const x of data) {
    const found = tableData.find(e => e.serialNumber === x.serialNumber);
    if (found) {
      console.log(found);
      found.time = Date.now();
      //implement the function to replace later
    } else {
      const newData = new dataConstructor(
        x.children[0].value,
        x.children[8].value,
        x.children[7].value,
      );
      console.log(newData);
      push(tableData, newData);
    }
  }

  return (
    <div>Table</div>
  )
};

export default Table;