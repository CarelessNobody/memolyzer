import { StrictMode, useState, useCallback, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { Header, Footer } from './headfooter'
import { useDropzone } from 'react-dropzone';
import { getUserId, useFetch, useFetchWithFile } from './utils'
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

const AddFlashcardSetButton = ({ onAdd }) => {
  return (
    <button className="addCardButton" onClick={onAdd}>
      Add a Flashcard set!
    </button>
  )
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
      Add a Flashcard!
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
              <img className="editIcon" src={edit} alt="Edit flashcard" onClick={handleEdit}/>
              <img className="deleteIcon" src={close} alt="Delete flashcard" onClick={handleDelete}/>
              <p>{frontText}</p>
            </div>
            <div className="bottom">
              <img className="editIcon" src={edit} alt="Edit flashcard" onClick={handleEdit}/>
              <img className="deleteIcon" src={close} alt="Delete" onClick={handleDelete}/>
              <p>{backText}</p>
            </div>
      </div> 
    </div>
  )
}

function FileDropzone({fetchUrl}) {
  const onDrop = useCallback(async acceptedFiles => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append("uploadFile", file);
    formData.append("title", "My Flashcard Set");
    formData.append("description", "Some description");

    const userId = getUserId();
    if (!userId) return alert("Please sign in!");

    await fetchUrl({
      url: '/flashcard/uploadGemini/' + userId, 
      method: 'POST', 
      body: formData 
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="dropzoneContainer">
      <div className="fileDropzone" {...getRootProps()} style={{ border: isDragActive ? "2px solid #00e676" : "2px dashed #ccc", padding: "40px" }}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop files here...</p> : <p>Drag & drop, or click to make a flashcard set based on the pdf!</p>}
      </div>
    </div>
  );
}

const FlashCardSet = ({flashcardData, studysetId}) => {
    const [cards, setCards] = useState(flashcardData);
    const {fetchUrl, data, isLoading, error, resetState} = useFetch();

  // Helper: sync entire card array to backend
  const syncToBackend = async (updatedCards) => {
    const userId = getUserId();
    await fetchUrl({
      url: `/flashcard/${userId}/${studysetId}`,
      method: 'PUT',
      body: {
        flashcards: updatedCards.map(c => ({
          question: c.question,
          answer: c.answer
        }))
      }
    });
  };

  const removeCard = async (id) => {
    const updated = cards.filter(c => c.id !== id);
    setCards(updated);
    await syncToBackend(updated);
  };

  const editCard = async (id, newFront, newBack) => {
    const updated = cards.map(c =>
      c.id === id
        ? { ...c, question: newFront, answer: newBack }
        : c
    );

    setCards(updated);
    await syncToBackend(updated);
  };

  const addCard = async (front, back) => {
    const newCard = {
      id: Date.now().toString(),
      question: front,
      answer: back
    };

    const updated = [...cards, newCard];
    setCards(updated);
    await syncToBackend(updated);
  };

    return (    
    <div className="flashcardSet">
      <header>
        <div className= "cardbox">
          <div className = "descBox">
            <div className="leftDescBox">
              <div className = "flashcardName">
                <input type="text" placeholder="Enter Flashcard Name"/>
              </div>
              <AddCardButton onAdd={addCard} />
            </div>
            <div className = "flashcardDesc">
              <textarea id = "message" name = "message" rows="10" cols="90">
              </textarea>
            </div>
          </div>
          
        {cards.map(card => (
          <FlashCardsMaker
            key={card.id}
            id={card.id}
            cardfront={card.question}
            cardback={card.answer}
            onDelete={removeCard}
            onEdit={editCard}
          />
        ))}

        </div>
      </header>
    </div>
    );
};

const useLoadFlashcardSets = () => {
  const { fetchUrl } = useFetch();
  const [flashcardData, setFlashcardData] = useState({
    cardSets: [],
  });

  useEffect(() => {
    const loadStudySets = async () => {
      const userId = getUserId();
      if (!userId) return;

      try {
        const result = await fetchUrl({
          url: `/flashcard/${userId}`,
          method: 'GET',
        });

        const studysets = Array.isArray(result?.studysets)
          ? result.studysets
          : [];

        const cardSets = studysets.map(set => ({
          studysetId: set._id,
          cards: (Array.isArray(set.flashcards) ? set.flashcards : []).map((c, i) => ({
            id: `${set._id}_${i}`,
            question: c.question,
            answer: c.answer,
          }))
        }));

        setFlashcardData({ cardSets });

      } catch (err) {
        console.error('Failed to load studysets', err);
      }
    };

    loadStudySets();
  }, []);

  return { flashcardData, setFlashcardData };
};


const Library = () => {
  const {fileFetchUrl, fileData, fileIsLoading, fileError, fileResetState } = useFetchWithFile(); //For drag & drop
  const {fetchUrl, data, isLoading, error, resetState} = useFetch();
  const {flashcardData, setFlashcardData} = useLoadFlashcardSets();

  const handleAddingFlashcardSet = useCallback(async () => {
    const userId = getUserId();

    if (!userId) {
      alert("PLEASE SIGN IN FOR FUNCTIONALITY");
      return;
    }

    try {
      const result = await fetchUrl({
        url: '/flashcard/' + userId,
        method: 'POST',
      });

      // Result contains `studyset` and `user`
      const studyset = result?.studyset;
      const cards = Array.isArray(studyset?.flashcards) ? studyset.flashcards : [];

      const mapped = cards.map((c, i) => ({ id: `${studyset._id}_${i}`, question: c.question, answer: c.answer }));

      setFlashcardData(prev => ({
        ...prev,
        cardSets: [
          ...prev.cardSets,
          {
            studysetId: studyset._id,
            cards: mapped
          }
        ]
      }));
    } catch (err) {
      console.error('Failed to add studyset', err);
      alert('Failed to add studyset');
    }
  }, []);

  const handleRemovingFlashcardSet = async () => {
    //TODO remove flashcard set & fetch

  }

  if (fileError) {
    console.error("Error fetching flashcard data:", fileError);
    fileResetState(); // Reset state to allow for retrying
  } else if (fileData) {
    console.log("Fetched flashcard data:", fileData);
    fileResetState(); // Clear data after successful fetch to prevent repeated updates
  }

  if (error) {
    console.error("Error fetching user flashcard sets");
    resetState();
  } else if (data) {
    console.log("Fetched user flashcard sets successfully" + data?.studyset);
    resetState();
  }

  return (
    <div>
      <div className="sortingBar">
        <SortingBar />
        <AddFlashcardSetButton onAdd={handleAddingFlashcardSet} />
      </div>
      <FileDropzone fetchUrl={fileFetchUrl}/>
    {flashcardData.cardSets.map(
        (flashCardSets, index) => (
          <FlashCardSet key={index} flashcardData={flashCardSets.cards} studysetId={flashCardSets.studysetId}/>
        )
      )}
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Library />
    <Footer />
  </StrictMode>,
)


