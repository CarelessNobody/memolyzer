import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Header, Footer } from './headfooter'
import './index.css'
import './stats.css'

function Stats() {
    const statsData = {
        flashcardsMade: 120,
        publicFlashcards: 45,
        privateFlashcards: 75
    }
    return (
        <div className="stats-page">
            <h1>Stats Page</h1>
            <div className="stats-content">
                <p>Here you can view your study statistics and progress over time!</p>
                <p>Flashcards Made: {statsData.flashcardsMade}</p>
                <p>Public Flashcards: {statsData.publicFlashcards}</p>
                <p>Private Flashcards: {statsData.privateFlashcards}</p>
            </div>
        </div>
    );
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Header />
        <Stats />
        <Footer />
    </StrictMode>,
)