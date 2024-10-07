import React, { useEffect } from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




const AddTodoPage = ({ addTodoSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setType] = useState('Abdou');
    const [priority, setPriority] = useState('Low');
    const navigate = useNavigate();

    const submitForm = (e) => {
      const today = new Date().toISOString().split('T')[0];
      e.preventDefault();
      const newTodo = {
        title,
        description,
        isCompleted : false,
        priority,
        dueDate : today,
        createdAt : today,
        updatedAt : today,
        tags : '',
        assignedTo,
      }

      
      const resultTodo = addTodoSubmit(newTodo);
      toast.success('Todo Added Successfully')

      return navigate('/todos')

    }


  return (
    <section className="bg-indigo-50">
  <div className="container m-auto max-w-2xl py-24">
    <div
      className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
    >
      <form onSubmit={submitForm}>
        <h2 className="text-3xl text-center font-semibold mb-6">Add Todo</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2"
            >Todo title 
            </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="eg. Do dishes"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Assign To */}
        <div className="mb-4">
          <label htmlFor="assignedTo" className="block text-gray-700 font-bold mb-2"
            >Assign To
          </label>
          <select
            id="assignedTo"
            name="assignedTo"
            className="border rounded w-full py-2 px-3"
            required
            value={assignedTo}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Abdou">Abdou</option>
            <option value="Nour">Nour</option>
            <option value="Moussa">Moussa</option>
            <option value="Khaled">Khaled</option>
          </select>
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label htmlFor="priority" className="block text-gray-700 font-bold mb-2"
            >Priority
          </label>
          <select
            id="priority"
            name="priority"
            className="border rounded w-full py-2 px-3"
            required
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
            >Description</label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows="4"
            placeholder="Add any job duties, expectations, requirements, etc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Button */}
        <div>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Todo
          </button>
        </div>
        
      </form>
    </div>
  </div>
</section>
  )
}

export default AddTodoPage