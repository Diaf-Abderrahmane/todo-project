import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import Card from '../components/Card';


const TodoDetailPage = () => {

    const {id} = useParams();
    const todo = useLoaderData();

  return (
    <section className='bg-blue-50 px-40 py-10'>
        <Card bg='bg-white'>
            <div>{todo.title}</div>
        </Card>
    </section>
  )
}

const todoLoader = async ({params}) => {
    const res = await fetch(`http://localhost:5000/todos/${params.id}`);
    const data = await res.json();
    return data
};

export {TodoDetailPage as default, todoLoader }