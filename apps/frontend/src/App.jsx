import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Footer } from './footer'
import { Header } from './header'
import { Homepage } from './homepage'
import ReactCardFlip from 'react-card-flip'
import './App.css'
import './header.css'
import './footer.css'
import './homepage.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Homepage />
      <Footer />
    </>
  )
}

export default App
