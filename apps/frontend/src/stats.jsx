import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeadFooter } from './headfooter';
import './index.css'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <HeadFooter />
        <h1>Stats Page</h1>
    </StrictMode>,
)