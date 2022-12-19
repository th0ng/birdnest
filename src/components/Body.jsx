import React from 'react';

const Body = ({ drones }) => {
  console.log(drones);
  return (
    <div className='container px-5 py-24 mx-auto'>
      { drones.length === 0 ? <div className='flex flex-col text-center font-mono font-bold text-2xl'>Loading...</div> :
        <div className='fex flex-col w-full mb-20'>
          <p className='font-mono font-bold text-lg'>Device Used:</p>
          <p className='font-mono font-medium text-base'>
            Device ID: {drones.children[0].attributes.deviceId}
            <br />
            Started Time: {drones.children[0].children[1].value}
          </p>
        </div>
      }
    </div>
  );
}

export default Body;