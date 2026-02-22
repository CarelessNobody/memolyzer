import { StrictMode, useState, useCallback } from 'react'
import { createRoot } from 'react-dom/client'
import { Header, Footer } from './headfooter'
import { useDropzone } from 'react-dropzone';
import { useFetchWithFile } from './utils'
import React from 'react';
import './index.css'
import './library.css'
import close from './assets/close.webp'
import edit from './assets/edit.webp'

const SortingBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPublic, setShowPublic] = useState(true);
  const [showPrivate, setShowPrivate] = useState(true);

  const handleSearchChange = (event) => {
    //TODO: Implement search functionality
    setSearchTerm(event.target.value);
    console.log("Search term:", event.target.value);
  };

  const handlePublicChange = () => {
    //TODO: Implement public/private filter functionality
    setShowPublic(!showPublic);
    console.log("Show public:", !showPublic);
  };

  const handlePrivateChange = () => {
    //TODO: Implement public/private filter functionality
    setShowPrivate(!showPrivate);
    console.log("Show private:", !showPrivate);
  };

    return (
      <>
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
      </>
    );
}

const AddCardButton = ({ onAdd }) => {
  const handleAdd = () => {
    const front = prompt("Enter front text:");
    const back = prompt("Enter back text:");
    if (front !== null && back !== null) {
      onAdd(front, back);
    }
  };

  return (
    <button className="addCardButton" onClick={handleAdd}>
      Add Flashcard
    </button>
  )
}

function FlashCardsMaker({ id, cardback, cardfront, onDelete, onEdit }) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  function flipCard(){
    setIsFlipped(!isFlipped);
  }
  function handleDelete(e){
    e.stopPropagation(); //Tops card flipping
    if (onDelete) onDelete(id);
  }
  function handleEdit(e){
    e.stopPropagation();
    //Temp testing
    const newFront = prompt("Enter new front text:", cardfront);
    const newBack = prompt("Enter new back text:", cardback);

    if (newFront !== null && newBack !== null && onEdit) {
      onEdit(id, newFront, newBack);
    }
  }

  const frontText = cardfront || '';
  const backText = cardback || '';
  return(
    <div className={`card ${isFlipped ? 'flipped' : ''}`} 
    onClick={flipCard}> 
      <div className="innercard"> 
          <div className="top">
              <img className="editIcon" src={edit} alt="Edit" onClick={handleEdit}/>
              <img className="deleteIcon" src={close} alt="Delete" onClick={handleDelete}/>
              <p>{frontText}</p>
            </div>
            <div className="bottom">
              <img className="editIcon" src={edit} alt="Edit" onClick={handleEdit}/>
              <img className="deleteIcon" src={close} alt="Delete" onClick={handleDelete}/>
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
        {isDragActive ? <p>Drop files here...</p> : <p>Drag & drop, or click to add a new flashcard!</p>}
      </div>
    </div>
  );
}

const FlashCardSet = ({flashcardData}) => {
    const [cards, setCards] = useState(flashcardData);

    const removeCard = (id) => {
      //Should also delete from database, temp for now
      setCards(prev => prev.filter(c => c.id !== id));
    };

    const editCard = (id, newFront, newBack) => {
      //Should also update database, temp for now
      setCards(prev => prev.map(c => c.id === id ? { ...c, question: newFront, answer: newBack } : c));
    };

    const addCard = (front, back) => {
      //Should also add to database, temp for now
      const newCard = { id: Date.now(), question: front, answer: back };
      setCards(prev => [...prev, newCard]);
    }

    return (    
    <div>
      <div className="sortingBar">
        <SortingBar />
        <AddCardButton onAdd={addCard} />
      </div>
      <FileDropzone />
      <header>
        <div className= "cardbox">
          <div className = "descBox">
            <div className = "flashcardName">
              <input type="text" placeholder="Enter Flashcard Name"/>
            </div>
            <div className = "flashcardDesc">
              <textarea id = "message" name = "message" rows="10" cols="90">
              </textarea>
            </div>
          </div>
          {cards.map(flashcard => 
            <FlashCardsMaker 
              key={flashcard.id} 
              id={flashcard.id}
              cardfront={flashcard.question} 
              cardback={flashcard.answer}
              onDelete={removeCard}
              onEdit={editCard} />
            )}
        </div>
      </header>
    </div>
    );
};

const Library = () => {
  //Should fetch from database at first, temp data for now
  const flashcardData = {
    "cardSets": [
      [{   id:1, question: "What is the capital of France?", answer: "Paris"}, 
      {   id:2, question: "What is the capital of Germany?", answer: "Berlin"},
      {   id:3, question: "What is the capital of Italy?", answer: "Rome"}],

      [{   id:4, question: "Does this work?", answer: "YES!"}, 
      {   id:5, question: "Are we good?", answer: "YES!"},
      {   id:6, question: "Are we sane?", answer: "NO!"}]
    ],
    "message": "hello"
  };

  return (
    <div>
    {flashcardData.cardSets.map(
        (flashCardSets, index) => (
          <FlashCardSet key={index} flashcardData={flashCardSets}/>
        )
      )}
    </div>
  )
}

//TODO: Add way to add flashcards

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Library />
    <Footer />
  </StrictMode>,
)


