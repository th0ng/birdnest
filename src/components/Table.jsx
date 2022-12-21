import React from 'react';
import { useState } from 'react';
import birdnestService from '../services/birdnest';

//constructor for data to show in the table
const dataConstructor = (serialNumber, positionX, positionY ) => {
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
  const [tableData, setTableData] = useState([]);

  return (
    <div>Table</div>
  )
};

export default Table;