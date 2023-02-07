import React from 'react'
import { Link } from 'react-router-dom'
const MissingCity = () => {
  return (
    <div className='flex flex-col items-center h-96 justify-center gap-5'>
        <span role="img" aria-label="smile" className='text-5xl'>💻</span>
        <h2 className='text-2xl font-bold'>Missing Cart items?</h2>
        <p className='text-lg'>Login to see the items you added previously</p>
        <Link className="w-24 px-8 py-2 text-center text-white bg-pink-500 rounded-md shadow hover:bg-gray-800" to="">Login</Link>
    </div>
  )
}

export default MissingCity