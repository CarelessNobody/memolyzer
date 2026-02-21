import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Header, Footer } from './headfooter'
import './index.css'
import './stats.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Header />
        <h1>Stats Page</h1>
        <Footer />
    </StrictMode>,
)