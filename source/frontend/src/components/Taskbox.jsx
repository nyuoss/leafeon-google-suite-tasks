import React from 'react'

function TaskBox({title, note}) {
  return (
    <div className='w-full  border  rounded-xl mt-4' style={{backgroundColor:'#FFF6EB'}}>
        <div className="flex justify-between px-4 pt-4">
            <div className=' flex gap-2'>
               <h1 className='font-light'> Title:</h1> 
               <h1 className='font-extralight'>{title}</h1>
            </div>
            
        </div>
        <div className='px-4 py-4 text-slate-500	italic'>
            {note}
        </div>
    </div>
  )
}

export default TaskBox