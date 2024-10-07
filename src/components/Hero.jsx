import React from 'react'

const Hero = ({title = 'Better life with TODOs', subtitle='Get all your tasks done. '}) => {
    return (
        <>
            <section className='bg-indigo-700 text-center items-center font-extrabold p-20 text-white'>
                <div className='text-6xl'>
                    {title}
                </div>
                <div className='mt-5'>
                    {subtitle}
                </div>
            </section>
        </>
      )
}

export default Hero