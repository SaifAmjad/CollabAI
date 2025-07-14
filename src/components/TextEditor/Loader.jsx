import React from 'react'

const Loader = () => {
  return (
    <div>
        <div className="absolute inset-0 z-10 bg-white bg-opacity-70 flex flex-col gap-2 p-4">
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse" />
        </div>
    </div>
  )
}

export default Loader