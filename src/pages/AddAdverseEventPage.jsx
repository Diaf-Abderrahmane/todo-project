import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddAdverseEventPage = ({ addAdverseEventSubmit }) => {
  const [category, setCategory] = useState('');
  const [occurrenceDateTime, setOccurrenceDateTime] = useState('');
  const [seriousness, setSeriousness] = useState('');
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    
    const newAdverseEvent = {
      resourceType: 'AdverseEvent',
      // Map the category as a list of CodeableConcepts
      category: [createCodeableConcept(category)], // Assuming category is a single string. If multiple categories
      occurrenceDateTime,
      // Map the seriousness as a CodeableConcept
      seriousness: createCodeableConcept(seriousness),

    
    };

    const createdAdverseEvent = await addAdverseEventSubmit(newAdverseEvent);
    toast.success('Adverse Event Added Successfully');
    console.log(createdAdverseEvent);

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
