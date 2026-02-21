import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeadFooter } from './headfooter';
import './index.css'

const CreateFlashcard = ({question, answer}) => {
    return (
        <div className="flashcard">
            <h1>TEMP Flashcard</h1>
            <input type="text" placeholder="Question" value={question} />
            <input type="text" placeholder="Answer" value={answer} />
        </div>
    );
};

//TEMP!!!
const flashcardData = [
  {    question: "What is the capital of France?", answer: "Paris"}, 
  {    question: "What is the capital of Germany?", answer: "Berlin"},
  {    question: "What is the capital of Italy?", answer: "Rome"}
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeadFooter />
    <div className="flashcard-container">
      {flashcardData.map((flashcard) => 
        <CreateFlashcard key={flashcard.question} question={flashcard.question} answer={flashcard.answer} />)
      }
    </div>
  </StrictMode>,
)

