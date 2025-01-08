import React from 'react';
import Card from './Card';  // Your Card component
import { Link } from 'react-router-dom';  // For navigating to the patient's detailed page
import { FaUser, FaBirthdayCake, FaMedkit } from 'react-icons/fa';  // Icons for display

const PatientCard = ({ patient }) => {
  console.log(patient);  // For debugging purposes

  // Destructure first name, last name, etc., with fallback to 'Unknown' if not available
  const firstName = patient?.name?.[0]?.given?.[0] || 'Unknown';
  const lastName = patient?.name?.[0]?.family || 'Unknown';
  const gender = patient?.gender || 'Not Specified';
  const birthDate = patient?.birthDate || 'Not Provided';
  const generalPractitioner = patient?.generalPractitioner?.[0]?.display || 'Not Assigned';

  return (
    <Card bg="bg-white">
      <h2 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h2>

      <div className="mt-2 flex items-center">
        <FaUser className="mr-2" />
        <p>{gender}</p>
      </div>

      <div className="mt-2 flex items-center">
        <FaBirthdayCake className="mr-2" />
        <p>{birthDate}</p>
      </div>

      <div className="mt-2 flex items-center">
        <FaMedkit className="mr-2" />
        <p>{generalPractitioner}</p>
      </div>

      <div className="mb-5 mt-3">
        {patient?.id ? (
          <Link
            to={`/patients/${patient.id}`}  // Link to the patient's detail page
            className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            View Details
          </Link>
        ) : (
          <p className="text-red-500">Patient ID not available</p>
        )}
      </div>
    </Card>
  );
};

export default PatientCard;
