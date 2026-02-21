import { StrictMode, useState} from 'react'
import { createRoot } from 'react-dom/client'
import { Header, Footer } from './headfooter'
import './index.css'
import './library.css'
import "./explore.css"

const SortingBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Search term:", event.target.value);
  };

    return (
        <div className="sortingBar">
            <div className="searchBar">
                <input type="text" className="searchBar" placeholder="Search" onChange={handleSearchChange} />
            </div>
            <div className = "sortGroup">
              
            </div>
        </div>
    );
}

const GlobalLibrary = () => {
    return (
        <div className="globalLibrary">
            <h1>Global Library</h1>
        </div>
    );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <SortingBar />
    <GlobalLibrary />
    <Footer />
  </StrictMode>,
)

