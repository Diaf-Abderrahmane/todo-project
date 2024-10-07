import React, { useEffect, useState } from 'react'
import TodosListings from '../components/TodosListings';


const TodosPage = () => {
  // const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       const res = await fetch('http://localhost:5000/todos');
  //       const data = await res.json;
  //       setTodos(data);
  //     } catch (error) {
  //       console.log('Error fetching data', error);
  //     }
  //   }
  //   fetchTodos
  // }, []);


  return (
    <TodosListings/>
)
}

export default TodosPage