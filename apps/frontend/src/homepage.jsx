import React from 'react';
export const Homepage = () => {
    const [isFlippedLeft, setIsFlippedLeft] = React.useState(false);
    const [isFlippedRight, setIsFlippedRight] = React.useState(false);
    function flipCardLeft(){
        setIsFlippedLeft(!isFlippedLeft);
    }
    function flipCardRight(){
        setIsFlippedRight(!isFlippedRight);
    }
    return (
        <div>
            <div className="title">
                <h1>Learn how to elevate your studying!</h1>
                <hr></hr>
                <h2>What do we offer?</h2>
            </div>
            <div className="features">
                <div className={`leftcard ${isFlippedLeft ? 'flipped' : ''}`}
                    onClick={flipCardLeft}>
                    <div className="innercard">
                    <div className="cardtopleft">
                        <p>Click here to uncover!</p>
                    </div>

                    <div className="cardbottomleft">
                        <p>
                        Memolyzer allows you to submit any image with text and analyze
                        the contents of the page to create flash cards for users to study from!
                        </p>
                    </div>
                    </div>
                </div>
                <div className={`rightcard ${isFlippedRight ? 'flipped' : ''}`}
                    onClick={flipCardRight}>
                    <div className="rightinnercard">
                    <div className="cardtopright">
                        <p>Click here to uncover!</p>
                    </div>

                    <div className="cardbottomright">
                        <p>
                        It also allows you to generate a 
                        library for yourself that stores all of your past flashcards!
                        </p>
                    </div>
                    </div>
                </div>
            </div>
    </div>
    )
}