import React from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom'
import Card from '../components/Card';
import { FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';



const TodoDetailPage = () => {

    const {id} = useParams();
    const todo = useLoaderData();

  return (
    <>
    {/* Back to todos */}
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          to="/todos"
          className="text-indigo-500 hover:text-indigo-600 flex items-center"
        >
          <FaArrowLeft className='mr-2'/> Back to todos Listings
        </Link>
      </div>
    </section>

    <section className="bg-indigo-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div className="text-gray-500 mb-4">{todo.title}</div>
              <h1 className="text-3xl font-bold mb-4">
                {todo.title}
              </h1>
              <div
                className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                { todo.isCompleted?<>
                 <FaCheck className='text-green-700 mr-1 mt-1'/> 
                 <p className="text-green-700"> Completed </p> </> 
                 : <><FaTimes className='text-orange-700 mr-1 mt-1'/>
                  <p className="text-orange-700"> Uncompleted </p> </> }
              </div>
              <div>
              {`Priority : ${todo.priority}`}
            </div>
            </div>
            

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-700 text-lg font-bold mb-6"> Description </h3>
              <h3 className=" text-md font-bold mb-6">
                {todo.description}
              </h3>

              <h3 className="text-indigo-800 text-lg font-bold mb-2">{todo.dueDate}</h3>
            </div>
          </main>

          {/* //<!-- Sidebar --> */}
          <aside>
            {/* <!-- Company Info --> */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-6">Creation Date</h3>

              <h2 className="text-2xl">{todo.craetedAt}</h2>

              <p className="my-2 bg-red-100 p-2 font-bold rounded-xl">
                {todo.updatedAt}
              </p>

              <hr className="my-4" />

              <h3 className="text-xl">Updated Date</h3>

              <p className="my-2 bg-red-100 p-2 font-bold rounded-xl">
                {todo.updatedAt}
              </p>

              <h3 className="text-xl font-bold mt-3">Responsible</h3>

              <p className="my-2 bg-red-100 p-2 font-bold rounded-xl">{todo.assignedTo}</p>
            </div>

            {/* <!-- Manage --> */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-bold mb-6">Manage Todo</h3>
              <Link
                to={`/edit-todo/${todo.id}`}
                className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Todo
                </Link>
              <button
                onClick={() => onDeleteClick(job.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Todo
              </button>
            </div>

            
          </aside>

          
        </div>
      </div>
    </section>
    </>
  )
}

const todoLoader = async ({params}) => {
    const res = await fetch(`http://localhost:5000/todos/${params.id}`);
    const data = await res.json();
    return data
};

export {TodoDetailPage as default, todoLoader }