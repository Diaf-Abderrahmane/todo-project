import React, { useEffect, useState } from 'react'
import PatientCard from './PatientCard'; // Assuming you have this component
import Navbar from './Navbar';
import NoTodos from './NoTodos';
import AppointmentCard from './AppointmentCard';

const AppointmentsListings = () => {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            
            try {
                const res = await fetch('http://localhost:8080/api/appointments');
                const data = await res.json();
                setAppointments(data);  // Corrected variable name
                console.log(data);
                
            } catch (error) {
                console.log('Error fetching data', error);
                
            } finally {
                setLoading(false);
            }
            
        }

        fetchAppointments();
    }, []);

    

  return (
    <> 
      <section className='bg-blue-50 py-10'>
        <div className='container-xl lg:container m-auto'>
          <div className='text-center text-3xl font-bold text-indigo-500'>Appointments</div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-lg'>
            {/* Render the list of appointments */}
            {loading ? (
              <p className="text-center text-lg text-gray-500">Loading...</p>
            ) : appointments.length === 0 ? (
              <NoTodos /> // Display the NoPatients component if no patients
            ) : (
              appointments.map((appointment) => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AppointmentsListings;
