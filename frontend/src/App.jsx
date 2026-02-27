import React from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import ConverterForm from './components/ConverterForm'
import RecentLinks from './components/RecentLinks'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <ConverterForm/>
      <RecentLinks/>
      <Footer/>
    </div>
  )
}

export default App