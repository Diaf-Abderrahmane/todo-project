import React from 'react'
import { Link } from 'react-router-dom'

const ViewAllJobs = () => {
  return (
    <>
    
    <section className='m-auto max-w-lg my-10 px-6'>
        <Link to='/patients' className='block bg-black text-white
        text-center py-4 rounded-xl hover:bg-gray-700'>
            View All patients
        </Link>
    </section>
    
    </>
  )
}

export default ViewAllJobs