import React from 'react';
import { useState } from 'react';
import Radar from './Radar';

const Body = ({ drones }) => {
  console.log(drones)
  const [device, setDevice] = useState(drones.children[0]);
   const positionsData = drones.children[1].children;

  return (
    <div className='flex w-full mb-5'>
      <div className='flex flex-col w-1/2'>
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
      <div className='flex w-1/2'>
        <Radar data={positionsData}/>
      </div>
    </div>
  );
}

export default Body;