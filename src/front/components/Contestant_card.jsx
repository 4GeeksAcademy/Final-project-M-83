import React, { useState, useEffect } from "react";
import "../css/contestant-card.css";

export const ContestantCard = ({ islander, onVote, showVotes = false }) => {
  if (!islander) return null;
  const { id, name, age, image, bio, votes = 0 } = islander;
  const [voted, setVoted] = useState(false);

  useEffect(() => setVoted(false), [id]);

  const handleVote = async () => {
    if (onVote) {
      const success = await onVote(islander);
      if (success) setVoted(true);
  }
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

        {showVotes && (
          <div className="vote-counter">
            <span className="vote-number">{votes}</span>
            <span className="vote-label">votes</span>
          </div>
        )}

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

export const ContestantGrid = ({ list = [], onVote, showVotes = false }) => (
  <div className="contestant-grid">
    {list.map((islander, i) => (
      <ContestantCard
        key={islander.id ?? i}
        islander={islander}
        onVote={onVote}
        showVotes={showVotes}
      />
    ))}
  </div>
);
