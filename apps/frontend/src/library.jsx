import { StrictMode, useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { Header, Footer } from './headfooter'
import { useDropzone } from 'react-dropzone';
import { useFetchWithFile } from './utils'
import React from 'react';
import './index.css'
import './library.css'

const flashcardData = [
    {    question: "What is the capital of France?", answer: "Paris"}, 
    {    question: "What is the capital of Germany?", answer: "Berlin"},
    {    question: "What is the capital of Italy?", answer: "Rome"}
  ];

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
            <div className = "sortGroup">
              <div className="sortOption">
                <label htmlFor="publicFilter" className="sortLabel">Public</label>
                <input id="publicFilter" type="checkBox" checked={showPublic} onChange={handlePublicChange}></input>
              </div>
              <div className="sortOption">
                <label htmlFor="privateFilter" className="sortLabel">Private</label>
                <input id="privateFilter" type="checkBox" checked={showPrivate} onChange={handlePrivateChange}></input>
              </div>
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

  return (
    <div className="flashcardContainer">
      {flashcardData.map((flashcard) => 
        <CreateFlashcard key={flashcard.question} question={flashcard.question} answer={flashcard.answer} />)
      }
    </div>
  );
}

function FlashCardsMaker({cardback, cardfront, testfront, testback}){
  const [isFlipped, setIsFlipped] = React.useState(false);
  function flipCard(){
    setIsFlipped(!isFlipped);
  }
  const frontText = cardfront || testfront || '';
  const backText = cardback || testback || '';
  return(
    <div className={`card ${isFlipped ? 'flipped' : ''}`} 
    onClick={flipCard}> 
      <div className="innercard"> 
          <div className="top">
              <p>{frontText}</p>
            </div>
            <div className="bottom">
              <p>{backText}</p>
            </div>
      </div> 
    </div>
  )
}

function FileDropzone() {
  const {fetchUrl, data, isLoading, error } = useFetchWithFile();
  const onDrop = useCallback(async acceptedFiles => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("uploadFile", file);

    await fetchUrl({
      url: '/flashcard/uploadGemini', 
      method: 'POST', 
      body: formData 
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    if (data) {
      console.log("File upload successful:", data);
    } else if (error) {
      console.error("File upload error:", error);
    }

  return (
    <div className="dropzoneContainer">
      <div className="fileDropzone" {...getRootProps()} style={{ border: isDragActive ? "2px solid #00e676" : "2px dashed #ccc", padding: "40px" }}>
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
    <div className= "cardbox">
    <FlashCardsMaker testfront={"front"} testback={"back"}/>
    <FlashCardsMaker testfront={"front"} testback={"back"}/>
    <FlashCardsMaker testfront={"front"} testback={"back"}/>
    <FlashCardsMaker testfront={"front"} testback={"back"}/>
    {/* <FlashCardsMaker testfront={"front"} testback={"back"}/>
    <FlashCardsMaker testfront={"front"} testback={"back"}/>
    <FlashCardsMaker testfront={"front"} testback={"back"}/>
    <FlashCardsMaker testfront={"front"} testback={"back"}/> */}
    </div>
    <FileDropzone />
    <Footer />
  </StrictMode>,
)


