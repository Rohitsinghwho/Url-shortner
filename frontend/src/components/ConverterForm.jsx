import React from 'react'

const ConverterForm = () => {
  return (
    <div className='m-5 shadow shadow-olive-500 rounded-xl p-2'>
        <form className='flex flex-col p-5 gap-3'>
            <label className='text-xl font-semibold'>Long URL <span className='text-red-600'>*</span></label>
            <input className='border text-md p-2 rounded-md' type='text'/>

            <input className='border text-md p-2 rounded-md' type='text' disabled/>

            <button  className='border border-amber-200 text-xl bg-green-500 p-2 text-white rounded-md hover:bg-blue-400 cursor-pointer'>Shorten Link</button>
        </form>
        <p className='text-xs text-center text-gray-500'>By Clicking Shorten Link you agree with our Use of Cookies</p>
    </div>
  )
}

export default ConverterForm