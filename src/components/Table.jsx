import React from 'react';
import { useState } from 'react';
import birdnestService from '../services/birdnest';

const dataConstructor = (serialNumber, positionX, positionY ) => {
  this.serialNumber = serialNumber;
  this.positionX = positionX;
  this.positionY = positionY;
  this.distance = Math.hypot(positionX, positionY);
}

const Table = ({ data }) => {
  const [tableData, setTableData] = useState([]);
  return (
    <div>Table</div>
  )
}

export default Table