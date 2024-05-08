import React from 'react'
import TaskBox from './Taskbox';
import { useGoogleDocs } from '../GoogleDocsContext';

function Tasks() {

    const { comments, tasks, moveCommentToTasks } = useGoogleDocs();
    
  return (
    <div>
    <div className=''>
        <h1 className='mb-6 font-light text-2xl justify-center text-center' style={{ color: '#8F4F00' }}> Google Tasks</h1>
        <div className='px-6 '>
          {Array.isArray(tasks) && tasks.map((task, index) => (
            <div className='flex  gap-4'>
              <TaskBox key={index} author={task.author} file={task.fileName} text={task.content} />
              {/* Add any additional UI elements for converted tasks here */}
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default Tasks