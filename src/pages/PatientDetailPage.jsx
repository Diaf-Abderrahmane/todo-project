import React, { useState, useEffect } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const PatientDetailPage = () => {
  const { id } = useParams();
  const patient = useLoaderData(); // Data loaded using react-router's loader
  const navigate = useNavigate();
  const [implant, setImplant] = useState(null);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem('role'); // Retrieve role from local storage
  const userId = localStorage.getItem('userId'); // Retrieve the patient ID from localStorage



  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await fetch('http://localhost:8080/devices');
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

        setImplant(filteredEvents);
        console.log(filteredEvents);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [userId]); // Add userId as a dependency for useEffect

  return (
    <>
      {/* Back Button */}
      <section>
        <div className="container m-auto py-6 px-6">
          {role === 'practitioner' && (
            <Link
              to="/patients"
              className="text-indigo-500 hover:text-indigo-600 flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              Back to Patients Listings
            </Link>
          )}
        </div>
      </section>

      {/* Patient Details Section */}
      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[70%,30%] gap-6">
            {/* Main Section */}
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <h1 className="text-3xl font-bold mb-4">
                  {patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}
                </h1>
                <p className="text-gray-500 mb-4">
                  Gender: {patient.gender || 'Not Specified'}
                </p>
                <p className="text-gray-700">
                  Date of Birth: {patient.birthDate || 'Not Provided'}
                </p>

                <div className="mt-4">
                  <h4 className="text-gray-700 font-bold">Contact Information:</h4>
                  {patient.telecom?.map((contact, index) => (
                    <p key={index} className="text-gray-500">
                      {contact.system}: {contact.value}
                    </p>
                  ))}
                </div>
              </div>

              {/* General Practitioner Details */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-700 text-lg font-bold mb-4">
                  General Practitioner
                </h3>
                <p className="font-bold text-md">
                  Dr. {patient.generalPractitioner?.[0]?.display || 'Unknown'}
                </p>
                {patient.generalPractitioner?.[0]?.identifier?.value && (
                  <p className="text-gray-500">
                    ID: {patient.generalPractitioner[0].identifier.value}
                  </p>
                )}
              </div>
            </main>

            {/* Sidebar */}
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Patient ID</h3>
                <p className="my-2 bg-red-100 p-2 font-bold rounded-xl">
                  {patient.id}
                </p>

                {/* Implant Details */}
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
                  {loading ? (
                    <p>Loading implant details...</p>
                  ) : implant ? (
                    <>
                      <img
                        src={
                          implant.imageUrl ||
                          'https://assets.cochlear.com/api/public/content/5fe02d403a42453db48d01ef1c6269a1?v=277a9014'
                        }
                        alt="Implant"
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h4 className="text-lg font-bold mb-2">Implant Details</h4>
                      <ul className="text-gray-700">
                        <li>
                          <span className="font-bold">Status:</span>{' '}
                          {implant.status || 'Unknown'}
                        </li>
                        <li>
                          <span className="font-bold">Model Number:</span>{' '}
                          {implant.modelNumber || 'Not Provided'}
                        </li>
                        <li>
                          <span className="font-bold">Serial Number:</span>{' '}
                          {implant.serialNumber || 'Not Provided'}
                        </li>
                      </ul>
                    </>
                  ) : (
                    <p>No implant details available.</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const patientLoader = async ({ params }) => {
  const response = await fetch(`http://localhost:8080/api/patients/${params.id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch patient data');
  }
  const data = await response.json();
  return data;
};

export { PatientDetailPage as default, patientLoader };
