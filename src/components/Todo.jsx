// import React from 'react'
// import Card from './Card'
// import { Link } from 'react-router-dom'
// import { FaCheck, FaTimes } from 'react-icons/fa';




// const Todo = ({todo}) => {
//   return (
//     <>
//     <Card bg='bg-white'>
//             <h2 className='text-2xl font-bold'>{todo.title}</h2>
//             <p className='mt-2'>
//               {todo.description}
//             </p>
//             <div>{ todo.isCompleted?<>
//                  <FaCheck className='text-green-700 mr-1 mt-1'/> 
//                  <p className="text-green-700"> Completed </p> </> 
//                  : <><FaTimes className='text-orange-700 mr-1 mt-1'/>
//                   <p className="text-orange-700"> Uncompleted </p> </> }</div>
//             <div>{todo.priority}</div>
//             <div className='mb-5'>{todo.dueDate}</div>
//             <Link
//               to={`/todos/${todo.id}`}
//               className='inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700'
//             >
//               Read More
//             </Link>
//         </Card>
//     </>
//   )
// }

// export default Todo

// ****************************************************************

import React from 'react';
import Card from './Card';  // Your Card component
import { Link } from 'react-router-dom';  // For navigating to the todo's detailed page
import { FaUser, FaBirthdayCake, FaTransgender } from 'react-icons/fa';  // Icons for display

const Todo = ({ todo }) => {
  console.log(todo);  // For debugging purposes

  // Destructure first name, last name, etc., with fallback to 'Unknown' if not available
  const firstName = todo?.name?.[0]?.given?.[0] || 'Unknown';
  const lastName = todo?.name?.[0]?.family || 'Unknown';

  return (
    <>
      <Card bg="bg-white">
        <h2 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h2>

        <div className="mt-2 flex items-center">
          <FaUser className="mr-2" />
          <p>{todo?.gender || 'Not Specified'}</p>
        </div>

        <div className="mt-2 flex items-center">
          <FaBirthdayCake className="mr-2" />
          <p>{todo?.birthDate || 'Not Provided'}</p>
        </div>

        <div className="mt-2 flex items-center">
          <FaTransgender className="mr-2" />
          <p>{todo?.resourceType || 'Not Specified'}</p>
        </div>

        <div className="mb-5 mt-3">
          {todo?.id ? (
            <Link
              to={`/todos/${todo.id}`}  // Link to the todo's detail page
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              View Details
            </Link>
          ) : (
            <p className="text-red-500">todo ID not available</p>
          )}
        </div>
      </Card>
    </>
  );
};

export default Todo;
