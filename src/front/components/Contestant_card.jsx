import React, { useState } from "react";
import "../css/contestant-card.css";

export const ContestantCard = ({ islander }) => {
  if (!islander) return null;
  const { name, age, occupation, hometown, bombshell, image, bio } = islander;
  const [voted, setVoted] = useState(false);

  const handleVote = () => {
    setVoted(!voted);
  };

  return (
    <div className={`contestant-card ${voted ? "voted" : ""}`}>
      <div className="contestant-image-container">
        <img src={image} alt={name} className="contestant-image" />
      </div>

      <div className="contestant-info">
        <h3 className="contestant-name">{name}</h3>
        <p className="contestant-age">{age} years old</p>
        {bio && <p className="contestant-bio">{bio}</p>}
        <button
          className={`vote-button ${voted ? "voted-button" : ""}`}
          onClick={handleVote}
        >
          {voted ? "VOTED 💘" : "VOTE"}
        </button>
      </div>
    </div>
  );
};


export const ContestantGrid = ({ list }) => (
  <div className="contestant-grid">
    {list.map((islander, i) => (
      <ContestantCard key={islander.id ?? i} islander={islander} />
    ))}
  </div>
);

