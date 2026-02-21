import React from 'react';
import ayushi from './assets/ayushi.jpg';
import ariya from './assets/ariya.jpg';
import ruihan from './assets/ruihan.jpg';

const DeveloperCard = ({ img, name, role, description }) => {
    return (
        <div className="developerCard">
            <img src={img} alt={name+"'s picture"} />
            <h3>{name}</h3>
            <h4>{role}</h4>
            <p>{description}</p>
        </div>
    );
}

const developmentTeam = [
    { img: ariya, name: "Ariya Mouthapong", role: "Frontend Developer", description: "temp description" },
    { img: ayushi, name: "Ayushi Srivastava", role: "Backend Developer", description: "temp description" },
    { img: ruihan, name: "Ruihan Weng", role: "Full Stack Developer", description: "temp description" }
];

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
        <div className="homepage">
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
            <hr></hr>
            <div className="meetTheTeam">
                <h2>Meet Our Team!</h2>
                <div className="developerCardsContainer">
                    {developmentTeam.map((dev, index) => (
                        <DeveloperCard 
                            key={index}
                            img={dev.img}
                            name={dev.name}
                            role={dev.role}
                            description={dev.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}