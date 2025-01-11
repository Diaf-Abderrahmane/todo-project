import React from 'react';
import Card from './Card';  // Your Card component
import { Link } from 'react-router-dom';  // For navigating to the patient's detailed page
import { FaUser, FaBirthdayCake, FaMedkit } from 'react-icons/fa';  // Icons for display
import { FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';

const   MyAdverseEventCard = ({ adverseEvent }) => {
  
  /// Destructure subject details with fallback values
const status = adverseEvent?.status || 'Not Specified';
const actuality = adverseEvent?.actuality || 'Not Specified';
const occurrenceDateTime = adverseEvent?.occurrenceDateTime || 'Not Provided';
// const seriousness = adverseEvent?.seriousness || 'Not Provided';

const patientName =
  adverseEvent?.subject?.identifier?.display || 
  adverseEvent?.subject?.display || 
  'Unknown Adverse Event';

const categoryDisplay =
  adverseEvent?.category?.[0]?.display|| 'Uncategorized';


  return (
    <div className="bg-white shadow-md rounded-lg p-5">
      {/* <div className="mb-2">
        <FaExclamationTriangle className="inline-block mr-2 text-yellow-500" />
        <span className="font-semibold">Status:</span> {status}
      </div> */}
      <div className="mb-2">
        <FaCalendarAlt className="inline-block mr-2 text-green-500" />
        <span className="font-semibold">Occurrence Date:</span> {new Date(occurrenceDateTime).toLocaleString()}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Category:</span> {categoryDisplay}
      </div>
      <Link
        to={`/adverseevents/${adverseEvent.id}`}  // Link to the patient's detail page
        className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
      >
                  View Details
      </Link>
    </div>
  );
};

export default MyAdverseEventCard;

