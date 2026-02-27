import React from 'react'

const RecentLinks = () => {
  return (
    <div className='m-5 flex flex-col gap-3'>
        <h3 className='text-xl font-semibold'>Your Recent Links:</h3>
        {/* recent links */}
        <div className='flex flex-col gap-3'>
        <div className='flex shadow shadow-gray-400 rounded-xl justify-center'>
            <div className='flex items-center justify-center p-5'>img</div>
            <div className='flex flex-col flex-1 py-2 px-1'>
                <div className='flex flex-col'>
                    <span className='text-md font-semibold text-blue-500'>https://shortyfy.com/5481cs</span>
                    <span className='text-xs text-gray-500'>https://github.com/notification</span>
                </div>
                <button className="border border-amber-200 text-md bg-blue-600 p-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">Copy</button>
            </div>
        </div>
        <div className='flex shadow shadow-gray-400 rounded-xl justify-center'>
            <div className='flex items-center justify-center p-5'>img</div>
            <div className='flex flex-col flex-1 py-2 px-1'>
                <div className='flex flex-col'>
                    <span className='text-md font-semibold text-blue-500'>https://shortyfy.com/5481cs</span>
                    <span className='text-xs text-gray-500'>https://github.com/notification</span>
                </div>
                <button className="border border-amber-200 text-md bg-blue-600 p-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">Copy</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default RecentLinks