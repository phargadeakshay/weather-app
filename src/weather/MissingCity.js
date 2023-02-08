import React from 'react'

const MissingCity = () => {
  return (
    <div className="md:col-start-2 md:col-end-3 2xl:col-end-4 md:col-span-2 text-white font-semibold">

    <div className='flex flex-col items-center h-96 justify-center gap-5'>
              <span role="img" className='text-5xl'>💻</span>
              <h2 className='text-2xl font-bold'>Missing Card items?</h2>
              <p className='text-lg'>Select City to see the items you added</p>
              <span className="w-36 px-8 py-2 text-center text-white bg-pink-500 rounded-md shadow border hover:bg-gray-800">Thank You</span>
          </div>
              </div>
  )
}

export default MissingCity