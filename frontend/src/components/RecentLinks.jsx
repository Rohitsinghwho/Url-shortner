import React, { useState } from 'react'
import Cookies from 'js-cookie';
import { useUrlHistory } from '../hooks/useUrlHistory';
const RecentLinks = () => {
 const {history}=useUrlHistory();
 const [copiedUrl,setCopiedUrl]=useState('');
 const copyToClipboard=async(text)=>{
    try {
        await navigator.clipboard.writeText(text)
        setCopiedUrl(text);
        alert("Copied Url to Clipboard ",copiedUrl);
    } catch (error) {
        console.error('Failed to Copy: ',error)
    }
 }
  return (
    <div className='m-5 flex flex-col gap-3'>
        <h3 className='text-xl font-semibold'>Your Recent Links:</h3>
        {/* recent links */}
        <div className='flex flex-col gap-3'>
        {history.length>0?(
            history.map((val)=>(
                <div className='flex shadow shadow-gray-400 rounded-xl justify-center' key={val.id}>
                    <div className='flex items-center justify-center p-5'>img</div>
                    <div className='flex flex-col flex-1 py-2 px-1'>
                        <div className='flex flex-col'>
                            <span className='text-md font-semibold text-blue-500'><a href={val.shortUrl} target='_blank'>{val.shortUrl}</a></span>
                            <span className='text-xs text-gray-500'>{val.longUrl}</span>
                        </div>
                        <button onClick={()=>copyToClipboard(val.shortUrl)} className="border border-amber-200 text-md bg-blue-600 p-2 text-white rounded-md hover:bg-blue-400 cursor-pointer">Copy</button>
                    </div>
                </div>
            ))
        ):(
            <p>You don't have any URLs</p>
        )}
        </div>
    </div>
  )
}

export default RecentLinks