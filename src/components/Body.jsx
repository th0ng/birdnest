import React from 'react';
import { useState, useEffect } from 'react';

const Body = ({ dronesPosition }) => {
  const [device, setDevice] = useState([]);

  console.log(dronesPosition);
  if (dronesPosition.length !== 0) {
    setDevice(dronesPosition.children[0]);
    console.log(device);
  }

  return (
    <div>
      data displayed here
    </div>
  )

}

export default Body