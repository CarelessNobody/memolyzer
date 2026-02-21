import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import { Header, Footer } from './headfooter'
import './index.css'
import './explore.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Footer />
  </StrictMode>,
)

