import React from 'react';
import Card from './Card';  // Your Card component
import { Link } from 'react-router-dom';  // For navigating to the patient's detailed page
import { FaUser, FaBirthdayCake, FaMedkit } from 'react-icons/fa';  // Icons for display
import { FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

const   AdverseEventCard = ({ adverseEvent }) => {
  
  /// Destructure subject details with fallback values
const status = adverseEvent?.status || 'Not Specified';
const actuality = adverseEvent?.actuality || 'Not Specified';
const occurrenceDateTime = adverseEvent?.occurrenceDateTime || 'Not Provided';
// const seriousness = adverseEvent?.seriousness || 'Not Provided';

const patientName =
  adverseEvent?.subject?.identifier?.display || 
  adverseEvent?.subject?.display || 
  'Unknown Patient';

const categoryDisplay =
  adverseEvent?.category?.[0]?.display|| 'Uncategorized';


  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      {/* <div className="mb-2">
        <FaExclamationTriangle className="inline-block mr-2 text-yellow-500" />
        <span className="font-semibold">Status:</span> {status}
      </div> */}
      <div className="mb-2">
        <FaUser className="inline-block mr-2 text-blue-500" />
        <span className="font-semibold">Patient ID:</span> {patientName}
      </div>
      <div className="mb-2">
        <FaCalendarAlt className="inline-block mr-2 text-green-500" />
        <span className="font-semibold">Occurrence Date:</span> {new Date(occurrenceDateTime).toLocaleString()}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Category:</span> {categoryDisplay}
      </div>
      {/* <div className="mb-2">
        <span className="font-semibold">Seriousness:</span> {seriousness}
      </div> */}
      {/* <div className="mt-4">
        {subject?.reference ? (
          <Link
            to={`/${subject.reference}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            View Patient Details
          </Link>
        ) : (
          <p className="text-red-500">No patient details available</p>
        )}
      </div> */}
    </div>
  );
};

export default AdverseEventCard;

