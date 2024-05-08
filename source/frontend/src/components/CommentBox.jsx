import React from 'react'

function CommentBox({author, file, text}) {
  return (
    <div className='w-full  border  rounded-xl mt-4' style={{backgroundColor:'#EEF2FC'}}>
        <div className="flex justify-between px-4 pt-4">
            <div className=' flex gap-2'>
               <h1 className='font-light'> Author:</h1> 
               <h1 className='font-extralight'>{author}</h1>
            </div>
            <div className='font-extralight flex gap-2'>
                <h1 className='font-light'> File Name:</h1> 
               <h1 className='font-extralight'>{file}</h1>
            </div>
        </div>
        <div className='px-4 py-4 text-slate-500	italic'>
            {text}
        </div>
    </div>
  )
}

export default CommentBox