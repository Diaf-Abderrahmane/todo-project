import React from 'react'
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom'
import Card from '../components/Card';
import { FaArrowLeft } from 'react-icons/fa';

const PatientDetailPage = () => {

    const {id} = useParams();
    const patient = useLoaderData();
    const navigate = useNavigate();

    const role = localStorage.getItem('role');

    return (
        <>
        {/* Back to patient listings */}
        <section>
          <div className="container m-auto py-6 px-6">
            <Link
              to="/patients"
              className="text-indigo-500 hover:text-indigo-600 flex items-center"
            >
              {role === 'practitioner' && (
        <button className='flex items-center text-indigo-700'>
          <FaArrowLeft className='mr-2' />
          Back to Patients Listings
        </button>
        )}
            
            </Link>
          </div>
        </section>

        <section className="bg-indigo-50">
          <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
              <main>
                <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                  <div className="text-gray-500 mb-4">{patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}</div>
                  <h1 className="text-3xl font-bold mb-4">
                    {patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}
                  </h1>
                  <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                    <p className="text-gray-700">Gender: {patient.gender || 'Not Specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-700">Date of Birth: {patient.birthDate || 'Not Provided'}</p>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-700">Contact Information:</p>
                    {patient.telecom?.map((contact, index) => (
                      <div key={index} className="text-gray-500">
                        {contact.system}: {contact.value}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <h3 className="text-indigo-700 text-lg font-bold mb-6">General Practitioner</h3>
                  <div className="text-md mb-4">
                    <p className="font-bold">Dr. {patient.generalPractitioner?.[0]?.display}</p>
                    <p className="text-gray-500">{`ID: ${patient.generalPractitioner?.[0]?.identifier?.value}`}</p>
                  </div>
                </div>

                {/* Add Adverse Event Button */}
              
              </main>

              {/* Sidebar */}
              <aside>
                {/* Creation Date */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-6">Patient ID</h3>
                  <p className="my-2 bg-red-100 p-2 font-bold rounded-xl">{patient.id}</p>
                </div>
              </aside>
            </div>
          </div>
        </section>
        </>
    )
}

const patientLoader = async ({params}) => {
    const res = await fetch(`http://localhost:8080/api/patients/${params.id}`);
    const data = await res.json();
    return data;
};

export { PatientDetailPage as default, patientLoader };
