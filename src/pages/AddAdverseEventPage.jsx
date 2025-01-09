import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddAdverseEventPage = ({ addAdverseEventSubmit }) => {
  const [category, setCategory] = useState('');
  const [occurrenceDateTime, setOccurrenceDateTime] = useState('');
  const [seriousness, setSeriousness] = useState('');
  const [outcome, setOutcome] = useState(''); // New field for outcome
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId'); // Get userId from localStorage

  // Get the patient data from location state
  console.log("user id is" + userId);
  
  const submitForm = async (e) => {
    e.preventDefault();
    
    // Fetch patient data using userId
    const response = await fetch(`http://localhost:8080/api/patients/${userId}`);
    const patientData = await response.json();
    console.log(patientData);
    
    
    // Set the patient's name to the display field
    const patientName = `${patientData.name?.[0]?.given?.[0]} ${patientData.name?.[0]?.family}`;
    console.log(patientName);
    
  
    const newAdverseEvent = {
      resourceType: 'AdverseEvent',
      category: [createCodeableConcept(category)],
      occurrenceDateTime,
      seriousness: createCodeableConcept(seriousness),
      outcome: [createCodeableConcept(outcome)],
      subject: {
        reference: `Patient/${userId}`,
        type: 'Patient',
        identifier: {
          system: 'http://example.com/patient-identifier',
          value: userId,
        },
        display: patientName, // Use the fetched patient's name here
      },
    };
  
    // Call the addAdverseEventSubmit function to submit the new adverse event
    const createdAdverseEvent = await addAdverseEventSubmit(newAdverseEvent);
    toast.success('Adverse Event Added Successfully');
    console.log(createdAdverseEvent);
  
    // Optionally navigate to the new event details page
    // return navigate(`/adverseevents/${createdAdverseEvent.id}`);
  };

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            <h2 className="text-3xl text-center font-semibold mb-6">Add Adverse Event</h2>


            {/* Category */}
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
              <input
                type="text"
                id="category"
                name="category"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="e.g., Infection"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>


            {/* Occurrence Date */}
            <div className="mb-4">
              <label htmlFor="occurrenceDateTime" className="block text-gray-700 font-bold mb-2">Occurrence Date</label>
              <input
                type="datetime-local"
                id="occurrenceDateTime"
                name="occurrenceDateTime"
                className="border rounded w-full py-2 px-3 mb-2"
                value={occurrenceDateTime}
                onChange={(e) => setOccurrenceDateTime(e.target.value)}
                required
              />
            </div>

            {/* Seriousness */}
            <div className="mb-4">
              <label htmlFor="seriousness" className="block text-gray-700 font-bold mb-2">Seriousness</label>
              <select
                id="seriousness"
                name="seriousness"
                className="border rounded w-full py-2 px-3"
                value={seriousness}
                onChange={(e) => setSeriousness(e.target.value)}
                required
              >
                <option value="Serious">Serious</option>
                <option value="Non-serious">Non-serious</option>
              </select>
            </div>

            {/* Outcome */}
            <div className="mb-4">
              <label htmlFor="outcome" className="block text-gray-700 font-bold mb-2">Outcome</label>
              <input
                type="text"
                id="outcome"
                name="outcome"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Describe the outcome"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Adverse Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const createCodeableConcept = (value) => {
  return {
    coding: [
      {
        system: 'http://example.com', // You can adjust this to the appropriate coding system (e.g., SNOMED, ICD)
        code: value,
        display: value, // You can also add display name here
      },
    ],
    text: value,
  };
};


export default AddAdverseEventPage;
