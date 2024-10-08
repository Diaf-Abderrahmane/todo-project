import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useNavigate} from 'react-router-dom'
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import TodosPage from './pages/TodosPage';
import NotFoundPage from './pages/NotFoundPage';
import TodoDetailPage, { todoLoader } from './pages/TodoDetailPage';
import { jobLoader } from '../../react-crash-course/src/pages/JobPage';
import AddTodoPage from './pages/AddTodoPage';



const App = () => {

  const addTodo = async (newTodo) => {
    
    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-Type' : 'Application/json'
      },
      body: JSON.stringify(newTodo),

    });
    if (!res.ok) {
      throw new Error(`Failed to create todo: ${res.status} ${res.statusText}`);
    }
    const data = await res.json()    
    console.log(data);
    
    return data
  }


  const deleteTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: 'DELETE'
    });
    return
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
    <Route index element={<HomePage/>}/>
    <Route path='/todos' element={<TodosPage/>}/>
    <Route path='/todos/:id' element={<TodoDetailPage deleteTodoMethod={deleteTodo}/>} loader={todoLoader}/>
    <Route path='/add-todo' element={<AddTodoPage addTodoSubmit={addTodo}/>} />
    <Route path='*' element={<NotFoundPage/>}/>
      {/* <Route path='*' element={<NotFoundPage/>}/> */}
    </Route>
  )
  );

  return <RouterProvider router={router}/>;
};

export default App


