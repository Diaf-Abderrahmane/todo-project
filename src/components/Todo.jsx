import React from 'react'
import Card from './Card'
import { Link } from 'react-router-dom'
import { FaCheck, FaTimes } from 'react-icons/fa';




const Todo = ({todo}) => {
  return (
    <>
    <Card bg='bg-white'>
            <h2 className='text-2xl font-bold'>{todo.title}</h2>
            <p className='mt-2'>
              {todo.description}
            </p>
            <div>{ todo.isCompleted?<>
                 <FaCheck className='text-green-700 mr-1 mt-1'/> 
                 <p className="text-green-700"> Completed </p> </> 
                 : <><FaTimes className='text-orange-700 mr-1 mt-1'/>
                  <p className="text-orange-700"> Uncompleted </p> </> }</div>
            <div>{todo.priority}</div>
            <div className='mb-5'>{todo.dueDate}</div>
            <Link
              to={`/todos/${todo.id}`}
              className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
            >
              Read More
            </Link>
        </Card>
    </>
  )
}

export default Todo