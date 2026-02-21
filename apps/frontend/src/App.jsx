import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Header, Footer } from './headfooter'
import { Homepage } from './homepage'
import './App.css'
import './index.css'
import './homepage.css'


function App() {
  return (
    <>
      <Header />
      <Homepage />
      <Footer />
    </>
  )
}

export default App
