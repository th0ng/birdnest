import React from 'react';
import { useState } from 'react';

const Body = ({ drones }) => {
  console.log(drones)
  const [device, setDevice] = useState(drones.children[0]);
  return (
    <div className='flex flex-col w-full mb-5'>
      <h2 className='font-bold font-mono text-xl text-indigo-500'>Device:</h2>
      <p className='font-mono font-medium text-base'>
            Device ID: {device.attributes.deviceId}
            <br />
            Started Time: {
            new Date(device.children[1].value).toTimeString()
            + ' on '
            + new Date(device.children[1].value).toLocaleDateString()
            }
          </p>
    </div>
  );
}

export default Body;