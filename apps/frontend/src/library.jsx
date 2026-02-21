import { StrictMode, useState, useCallback} from 'react'
import { createRoot } from 'react-dom/client'
import { Header, Footer } from './headfooter'
import { useDropzone } from 'react-dropzone';
import './index.css'
import './library.css'

const SortingBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPublic, setShowPublic] = useState(true);
  const [showPrivate, setShowPrivate] = useState(true);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Search term:", event.target.value);
  };

  const handlePublicChange = () => {
    setShowPublic(!showPublic);
    console.log("Show public:", !showPublic);
  };

  const handlePrivateChange = () => {
    setShowPrivate(!showPrivate);
    console.log("Show private:", !showPrivate);
  };

    return (
        <div className="sortingBar">
            <div className="searchBar">
                <input type="text" className="searchBar" placeholder="Search" onChange={handleSearchChange} />
            </div>
            <div className="sortOption">
              <label htmlFor="publicFilter" className="sortLabel">Public</label>
              <input id="publicFilter" type="checkBox" checked={showPublic} onChange={handlePublicChange}></input>
            </div>
            <div className="sortOption">
              <label htmlFor="privateFilter" className="sortLabel">Private</label>
              <input id="privateFilter" type="checkBox" checked={showPrivate} onChange={handlePrivateChange}></input>
            </div>
        </div>
    );
}

const CreateFlashcard = ({question, answer}) => {
    return (
        <div className="flashcard">
            <h1>TEMP Flashcard</h1>
            <p>{question}</p>
            <p>{answer}</p>
        </div>
    );
};

const Flashcards = () => {
  //TEMP!!!
  const flashcardData = [
    {    question: "What is the capital of France?", answer: "Paris"}, 
    {    question: "What is the capital of Germany?", answer: "Berlin"},
    {    question: "What is the capital of Italy?", answer: "Rome"}
  ];

  return (
    <div className="flashcardContainer">
      {flashcardData.map((flashcard) => 
        <CreateFlashcard key={flashcard.question} question={flashcard.question} answer={flashcard.answer} />)
      }
    </div>
  );
}

function FileDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div clasName="dropzoneContainer">
      <div className="fileDropzone"{...getRootProps()} style={{ border: isDragActive ? "2px solid #00e676" : "2px dashed #ccc", padding: "40px" }}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop files here...</p> : <p>Drag & drop, or click</p>}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <SortingBar />
    <Flashcards />
    <FileDropzone />
    <Footer />
  </StrictMode>,
)


