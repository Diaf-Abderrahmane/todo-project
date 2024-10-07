import React, { useEffect, useState } from 'react'
import Todo from './Todo'

const TodosListings = ({isHome= false}) => {

    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [todosForToday, setTodosForToday] = useState([]);

    useEffect(() => {
        const fetchTodos= async () => {
            // const apiUrl = isToday? 
            // // /api ==> http://localhost:8000 ( changed in the vite.config.js )
            // '/api/jobs?_limit=3'
            // :'/api/jobs';
            try {
                const res = await fetch('http://localhost:5000/todos');
                const data = await res.json();
                setTodos(data);    
                console.log(data);
                
            } catch (error) {
                console.log('Error fetching data', error);
                
            } finally {
                setLoading(false);
            }
            
        }

        fetchTodos();
    }, []);

    useEffect(() => {
        // Step 2: Get today's date in 'YYYY-MM-DD' format
    const today = new Date().toISOString().split('T')[0];

    // Step 3: Filter todos where `dueDate` equals today's date
    const filteredTodos = todos.filter(todo => todo.dueDate === today);

    setTodosForToday(filteredTodos);
    }, [todos]);

  return (
    <> 
    
    <section className='bg-blue-50 py-10'>
        <div className='container-xl lg:container m-auto'>
        <div className='text-center text-3xl font-bold text-indigo-500'>{isHome? 'Today\'s Todos': 'Your Todos'}</div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-lg'>
            {/* shadow like elevation ( md = medium ) */}
            {isHome? todosForToday.map((todo)=> (
                    //needs to have a key for every item of the list
                      <Todo key={todo.id} todo={todo}/>
                     )): todos.map((todo)=> (
                        //needs to have a key for every item of the list
                          <Todo key={todo.id} todo={todo}/>
                         ))}
           
         

         
        </div>
      </div>
      </section>
    </>
  )
}

export default TodosListings