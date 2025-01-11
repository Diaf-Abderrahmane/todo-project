import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AdverseEventDetailPage = () => {
  const { id } = useParams();
  const adverseEvent = useLoaderData();
  const navigate = useNavigate();

  const role = localStorage.getItem('role');
  const [appointments, setAppointments] = useState([
    { date: '2023-12-01', description: 'Follow-up Appointment' },
    { date: '2023-12-10', description: 'Routine Check-up' },
  ]); // Example initial data
  const [selectedDate, setSelectedDate] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState(null);

  // Function to handle date selection
  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setSelectedDate(formattedDate);

    // Check if the date is already confirmed
    const appointment = appointments.find((appt) => appt.date === formattedDate);
    if (appointment) {
      setAppointmentDetails(appointment);
    } else {
      setAppointmentDetails(null);
    }
  };

  // Function to handle appointment confirmation
  const handleConfirmAppointment = async () => {
    if (!selectedDate) return;

    // Check if the date is already in appointments
    const isDateAlreadyBooked = appointments.some((appt) => appt.date === selectedDate);
    if (isDateAlreadyBooked) {
      setNotificationMessage('This date is already booked.');
      return;
    }

    // Send a request to confirm the appointment (mocked API call)
    try {
      const response = await fetch('http://localhost:8080/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientId: adverseEvent.subject?.reference, // Use patient reference
          start: selectedDate,
          description: 'New Appointment', // Example description
          subject: {
            reference: `Patient/${adverseEvent.subject?.reference}`,
            type: 'Patient',
            identifier: {
              system: 'http://example.com/patient-identifier',
              value: adverseEvent.subject.reference.split('/')[1],
            },
            display: adverseEvent.subject?.display, // Use the fetched patient's name here
          },
        }),
      });

      if (response.ok) {
        // setNotificationMessage(Appointment confirmed for ${selectedDate}.);
        // Add the new appointment to the state
        setAppointments([
          ...appointments,
          { date: selectedDate, description: 'New Appointment' },
        ]);
        setSelectedDate(null); // Reset selected date after confirmation
      } else {
        setNotificationMessage('Failed to confirm appointment.');
      }
    } catch (error) {
      setNotificationMessage('An error occurred while confirming appointment.');
      console.error('Error:', error);
    }
  };

  // Function to disable already confirmed dates
  const tileDisabled = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    return appointments.some((appt) => appt.date === formattedDate);
  };

  // Function to display content on calendar tiles
  const tileContent = ({ date }) => {
    const formattedDate = date.toISOString().split('T')[0];
    const appointment = appointments.find((appt) => appt.date === formattedDate);
    if (appointment) {
      return (
        <div className="bg-indigo-200 text-indigo-700 text-sm rounded-md p-1">
          {appointment.description}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      {/* Back to Adverse Events Listings */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/adverseevents"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            {role === 'practitioner' && (
              <button className="flex items-center text-indigo-700">
                <FaArrowLeft className="mr-2" />
                Back to Adverse Events Listings
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
                  <div className="text-gray-500 mb-4">Adverse Event ID: {adverseEvent.id}</div>
                  <h1 className="text-3xl font-bold mb-4">
                    {'Categorie : ' + adverseEvent?.category?.[0]?.display || 'Uncategorized'}
                  </h1>
                  <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                    <p className="text-gray-700">
                      Seriousness: {adverseEvent.seriousness?.display || 'Not Specified'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Occurrence Date: {adverseEvent.occurrenceDateTime || 'Not Provided'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Outcome: {adverseEvent.outcome?.[0]?.display || 'Not Specified'}
                    </p>
                  </div>
                </div>

              {/* Calendar Component for Appointments
              {role === 'practitioner' && (
                                <>
                                <NavLink to={`/patients`} className={linkClass}>
                                  Patients
                                </NavLink>
                                <NavLink to={`/adverseevents`} className={linkClass}>
                                  Adverse Events
                                </NavLink>
                                </>
                              )} */}
              
              {role === 'practitioner' && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-700 text-lg font-bold mb-6">Patient Appointments</h3>
                <Calendar
                  className="bg-gray-100 rounded-lg shadow-md p-4"
                  onChange={handleDateChange}
                  tileDisabled={tileDisabled}
                  tileContent={tileContent}
                  tileClassName="text-center"
                />
                {selectedDate && !appointmentDetails && (
                  <div className="mt-4">
                    <p className="text-gray-700">
                      Selected Date: <span className="font-bold">{selectedDate}</span>
                    </p>
                    <button
                      onClick={handleConfirmAppointment}
                      className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                      Confirm Appointment
                    </button>
                  </div>
                )}
                {appointmentDetails && (
                  <div className="mt-4 p-4 bg-indigo-100 rounded-lg">
                    <h4 className="text-indigo-700 font-bold">Appointment Details</h4>
                    <p>Date: {appointmentDetails.date}</p>
                    <p>Description: {appointmentDetails.description}</p>
                  </div>
                )}
                {notificationMessage && (
                  <p className="mt-4 text-green-500 font-bold">{notificationMessage}</p>
                )}
              </div>)}
            </main>

            {/* Sidebar */}
            <aside>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Adverse Event ID</h3>
                <p className="my-2 bg-red-100 p-2 font-bold rounded-xl">{adverseEvent.id}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-indigo-700 text-lg font-bold mb-6">Patient</h3>
              <div className="text-gray-500">
                    Reference: {adverseEvent.subject?.reference || 'No Reference'}
                  </div>
                  <div className="text-gray-500">
                    Display: {adverseEvent.subject?.display || 'No Display'}
                  </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const adverseeventLoader = async ({ params }) => {
  const res = await fetch(`http://localhost:8080/api/adverseevents/${params.id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch adverse event details');
  }
  const data = await res.json();
  return data;
};

export { AdverseEventDetailPage as default, adverseeventLoader };