import React from 'react'
import CommentBox from './CommentBox'
import { useGoogleDocs } from '../GoogleDocsContext';

function Comments() {
    const { comments, tasks, moveCommentToTasks } = useGoogleDocs();
    
    const handleCreateTask = (index) => {
        moveCommentToTasks(index);
      };

    return (
        <div>
            <div className=''>
                <h1 className='mb-6 font-light text-2xl justify-center text-center' style={{color:'#14367B'}} > Assigned Comments</h1>
                <div className='px-6 '>
                    {/* Ensure comments is an array before using map */}
                    {Array.isArray(comments) && comments.map((comment, index) => (
                                        <div className='flex  gap-4'>
                                        <CommentBox  key={index} author={comment.author} file={comment.fileName} text={comment.content} />
                                        <div className=' flex justify-between items-center   pt-4 w-1/5'>
                                            <button className='font-light text-sm hover:text-slate-500 text-blue-800' onClick={() => handleCreateTask(index)}>Create Task +</button>                                        </div>
                                        </div>

                                    ))}
                </div>
               
            </div>
        </div>
    )
}

export default Comments
