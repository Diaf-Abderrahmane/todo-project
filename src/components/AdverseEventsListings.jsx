import React, { useEffect, useState } from 'react'
import PatientCard from './PatientCard'; // Assuming you have this component
import Navbar from './Navbar';
import NoTodos from './NoTodos';
import AdverseEventCard from './AdverseEventCard';

const AdverseEventsListings = () => {

    const [adverseevents, setAdverseEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdverseEvents = async () => {
            
            try {
                const res = await fetch('http://localhost:8080/api/adverseevents');
                const data = await res.json();
                setAdverseEvents(data);  // Corrected variable name
                console.log(data);
                
            } catch (error) {
                console.log('Error fetching data', error);
                
            } finally {
                setLoading(false);
            }
            
        }

        fetchAdverseEvents();
    }, []);

    

  return (
    <> 
      <section className='bg-blue-50 py-10'>
        <div className='container-xl lg:container m-auto'>
          <div className='text-center text-3xl font-bold text-indigo-500'>Adverse Events</div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-lg'>
            {/* Render the list of evetns*/}
            {loading ? (
              <p className="text-center text-lg text-gray-500">Loading...</p>
            ) : adverseevents.length === 0 ? (
              <NoTodos /> // Display the NoPatients component if no patients
            ) : (
              adverseevents.map((adverseevent) => (
                <AdverseEventCard key={adverseevent.id} adverseEvent={adverseevent} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AdverseEventsListings;
