import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useNavigate} from 'react-router-dom'
// import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
// import TodosPage from './pages/PatientsPage';
import NotFoundPage from './pages/NotFoundPage';
// import TodoDetailPage, { todoLoader } from './pages/TodoDetailPage';
import AddTodoPage from './pages/AddTodoPage';
import AddAdverseEventPage from './pages/AddAdverseEventPage';
import AdverseEventDetailPage from './pages/AdverseEventDetailPage';
import PatientDetailPage from './pages/PatientDetailPage';
import { patientLoader } from './pages/PatientDetailPage';
import SignInPage from './pages/SignInPage';
import PatientsPage from './pages/PatientsPage';
import AdverseEventsPage from './pages/AdverseEventsPage';
import MyAdverseEventsPage from './pages/MyAdverseEventsPage'
import { adverseeventLoader } from './pages/AdverseEventDetailPage';
import AppointmentsPage from './pages/AppointmentsPage';



const App = () => {

  // const addTodo = async (newTodo) => {
    
  //   const res = await fetch('http://localhost:5000/todos', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type' : 'Application/json'
  //     },
  //     body: JSON.stringify(newTodo),

  //   });
  //   if (!res.ok) {
  //     throw new Error(`Failed to create todo: ${res.status} ${res.statusText}`);
  //   }
  //   const data = await res.json()    
  //   console.log(data);
    
  //   return data
  // }

  const addAdverseevent = async (newAdverseEvent) => {

    try {

      console.log(newAdverseEvent);
  
      // First POST to FHIR server
      const fhirResponse = await fetch('https://hapi.fhir.org/baseR4/AdverseEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAdverseEvent),
      });
  
      if (!fhirResponse.ok) {
        throw new Error('Failed to post AdverseEvent to FHIR server');
      }
  
      const fhirData = await fhirResponse.json(); // Full JSON response from FHIR
      console.log(fhirData);
      
       // Create a new object with the FHIR ID

       const fhirId = fhirData.id; // Extract the FHIR server's ID
       

      const mongoAdverseEvent = {
       ...newAdverseEvent,
       id: fhirId, // Add the FHIR ID for the local MongoDB
      };

      console.log(mongoAdverseEvent);
      

      // Directly POST the JSON response to local MongoDB
      const mongoResponse = await fetch('http://localhost:8080/api/adverseevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mongoAdverseEvent),
      });
  
      if (!mongoResponse.ok) {
        throw new Error('Failed to post AdverseEvent to local MongoDB');
      }
  
      const finalData = await mongoResponse.json();
      // toast.success('AdverseEvent Added Successfully');
      console.log(finalData);
      return finalData;
    } catch (error) {
      console.error(error.message);
      // toast.error(error.message);
    }
  };
  
  


  // const deleteTodo = async (id) => {
  //   const res = await fetch(`http://localhost:5000/todos/${id}`, {
  //     method: 'DELETE'
  //   });
  //   return
  // }

  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>

    <Route index element={<SignInPage/>}/>
    {/* <Route path="/practitioners" element={<HomePage />} /> */}

    <Route path='/patients' element={<PatientsPage/>}/>
    <Route path='/patients/:id' element={<PatientDetailPage />} loader={patientLoader}/>

    <Route path='/adverseevents' element={<AdverseEventsPage/>}/>
    <Route path='/add-adverseevent' element={<AddAdverseEventPage addAdverseEventSubmit={addAdverseevent}/>} />
    <Route path='/adverseevents/:id' element={<AdverseEventDetailPage />} loader={adverseeventLoader}/>


    <Route path='/appointments' element={<AppointmentsPage/>}/>
    <Route path='/my-adverseevents' element={<MyAdverseEventsPage/>}/>


    {/* <Route path='/todos/:id' element={<TodoDetailPage deleteTodoMethod={deleteTodo}/>} loader={todoLoader}/> */}
    {/* <Route path='/add-todo' element={<AddTodoPage addTodoSubmit={addTodo}/>} /> */}
    <Route path='*' element={<NotFoundPage/>}/>
    
    </Route>
  )
  );

  return <RouterProvider router={router}/>;
};

export default App


