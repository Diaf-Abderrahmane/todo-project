import React, { useEffect, useState } from 'react'
import PatientsListings from '../components/PatientsListings';


const PatientsPage = () => {
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
    <PatientsListings/>
)
}

export default PatientsPage