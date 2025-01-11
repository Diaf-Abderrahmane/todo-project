import React, { useEffect, useState } from 'react'
import PatientCard from './PatientCard'; // Assuming you have this component
import Navbar from './Navbar';
import NoTodos from './NoTodos';
import AdverseEventCard from './AdverseEventCard';
import MyAdverseEventCard from './MyAdverseEventCard';

const MyAdverseEventsListings = () => {

    const [myAdverseEvents, setMyAdverseEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem('userId'); // Retrieve the patient ID from localStorage

    useEffect(() => {
      const fetchMyAdverseEvents = async () => {
        try {
          const res = await fetch('http://localhost:8080/api/adverseevents');
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
  
          // Filter adverse events by userId
          const filteredEvents = data.filter(
            (event) =>
              event.subject?.identifier?.value === userId || // Matches the identifier value
              event.subject?.reference?.split('/')[1] === userId // Matches the reference ID
          );
  
          setMyAdverseEvents(filteredEvents);
          console.log(filteredEvents);
        } catch (error) {
          console.error('Error fetching data', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchMyAdverseEvents();
    }, [userId]); // Add userId as a dependency for useEffect

    

  return (
    <> 
      <section className='bg-blue-50 py-10'>
        <div className='container-xl lg:container m-auto'>
          <div className='text-center text-3xl font-bold text-indigo-500'>My Adverse Events</div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-lg'>
            {/* Render the list of patients */}
            {loading ? (
              <p className="text-center text-lg text-gray-500">Loading...</p>
            ) : myAdverseEvents.length === 0 ? (
              <NoTodos /> // Display the NoPatients component if no patients
            ) : (
              myAdverseEvents.map((adverseevent) => (
                <MyAdverseEventCard key={adverseevent.id} adverseEvent={adverseevent} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default MyAdverseEventsListings;
