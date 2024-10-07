import React from 'react'
import Hero from '../components/Hero'
import HomeCards from '../components/HomeCards'
import TodosListings from '../components/TodosListings'

const HomePage = () => {
  return (
    <>
       <Hero/>
       <HomeCards/>
       <TodosListings isHome='true'/>
    </>
  )
}

export default HomePage