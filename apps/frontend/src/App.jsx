import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import FetchPosts from './fetchTest'
import { Footer } from './footer'
import { Header } from './header'
import './App.css'
import './header.css'
import './footer.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <FetchPosts />
      <Footer />
    </>
  )
}

export default App
