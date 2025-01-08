import React, { useEffect, useState } from 'react'
import PatientCard from './PatientCard'; // Assuming you have this component
import Navbar from './Navbar';
import NoTodos from './NoTodos';

const PatientsListings = () => {

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPatients = async () => {
            
            try {
                const res = await fetch('http://localhost:8080/api/patients');
                const data = await res.json();
                setPatients(data);  // Corrected variable name
                console.log(data);
                
            } catch (error) {
                console.log('Error fetching data', error);
                
            } finally {
                setLoading(false);
            }
            
        }

        fetchPatients();
    }, []);

    

  return (
    <> 
      <section className='bg-blue-50 py-10'>
        <div className='container-xl lg:container m-auto'>
          <div className='text-center text-3xl font-bold text-indigo-500'>Patients</div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-lg'>
            {/* Render the list of patients */}
            {loading ? (
              <p className="text-center text-lg text-gray-500">Loading...</p>
            ) : patients.length === 0 ? (
              <NoTodos /> // Display the NoPatients component if no patients
            ) : (
              patients.map((patient) => (
                <PatientCard key={patient._id} patient={patient} />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default PatientsListings;
