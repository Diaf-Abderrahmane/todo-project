import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import TodosPage from './pages/TodosPage';
import NotFoundPage from './pages/NotFoundPage';
import TodoDetailPage, { todoLoader } from './pages/TodoDetailPage';
import { jobLoader } from '../../react-crash-course/src/pages/JobPage';



const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
    <Route index element={<HomePage/>}/>
    <Route path='/todos' element={<TodosPage/>}/>
    <Route path='/todos/:id' element={<TodoDetailPage/>} loader={todoLoader}/>
    <Route path='*' element={<NotFoundPage/>}/>
      {/* <Route path='*' element={<NotFoundPage/>}/> */}
    </Route>
  )
  );

  return <RouterProvider router={router}/>;
};

export default App


