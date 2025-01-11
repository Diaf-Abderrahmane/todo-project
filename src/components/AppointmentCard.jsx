import React from 'react';
import Card from './Card'; // Your Card component
import { Link } from 'react-router-dom'; // For navigating to the patient's detailed page
import { FaCalendarAlt, FaClock, FaUserAlt } from 'react-icons/fa'; // Icons for display

const AppointmentCard = ({ appointment }) => {
  console.log(appointment); // For debugging purposes

  // Extract patientId, date, and description from the appointment structure
  const patientId = appointment.patientId || 'Unknown';
  const date = appointment.start || 'Date not specified';
  const description = appointment.description || 'No description provided';

  return (
    <Card bg="bg-white">
      {/* Appointment Title */}
    

      {/* Appointment Date */}
      <div className="mt-2 flex items-center">
        <FaCalendarAlt className="mr-2" />
        <p>Date: {date}</p>
      </div>

      {/* Appointment Description */}
      <div className="mt-2 flex items-center">
        <FaClock className="mr-2" />
        <p>Description: {description}</p>
      </div>

      {/* View Patient Details Button
      <div className="mb-5 mt-3">
        {patientId !== 'Unknown' ? (
          <Link
            to={`/patients/${patientId.replace('Patient/', '')}`} // Link to the patient's detail page
            className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
          >
            View Patient Details
          </Link>
        ) : (
          <p className="text-red-500">Patient ID not available</p>
        )}
      </div> */}
    </Card>
  );
};

export default AppointmentCard;
