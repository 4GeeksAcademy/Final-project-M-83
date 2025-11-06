import React, { useState, useEffect } from "react";
import "../css/contestant-card.css";

export const ContestantCard = ({ islander, onVote, onFavorite, showVotes = false, displayBio = false }) => {
  if (!islander) return null;
  const { id, name, age, photo_url, hometown,occupation, votes = 0, is_favorite = false} = islander;
  const [voted, setVoted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(is_favorite);

  useEffect(() => setVoted(false), [id]);
  useEffect(() => {
    setIsFavorite(is_favorite)
  }, [is_favorite]);


  const handleVote = async () => {
    if (onVote) {
      const success = await onVote(islander);
      if (success) setVoted(true);
  };
};

  const handleFavorite = async (e) => {
    e.stopPropagation();
    if (onFavorite) {
      setIsFavorite(!isFavorite);
      const success = await onFavorite(islander);
      if (!success) {
        setIsFavorite(islander.is_favorite);
        alert("Failed to update favorite status. Please try again.")
      }
    }
  }

  return (
    <div className={`contestant-card ${voted ? "voted" : ""}`}>
      <button 
        className={`favorite-button ${isFavorite ? "favorited" : ""}`} 
        onClick={handleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        {/* You will need CSS to style this content as a heart icon */}
        {isFavorite ? '❤️' : '🤍'} 
      </button>
      <div className="contestant-image-container">
        <img src={photo_url} alt={name} className="contestant-image" />
      </div>

      <div className="contestant-info">
        <h3 className="contestant-name">{name}</h3>

            <ul className="contestant-meta">
              {age && (
                <li className="meta">
                  <span className="meta-label">Age</span>
                  <span className="meta-value">{age} yrs</span>
                </li>
              )}

         {displayBio && (
                <>
                  {hometown && (
                    <li className="meta">
                      <span className="meta-label">Hometown</span>
                      <span className="meta-value">{hometown}</span>
                    </li>
                  )}
                  {occupation && (
                    <li className="meta">
                      <span className="meta-label">Occupation</span>
                      <span className="meta-value">{occupation}</span>
                    </li>
                  )}
                </>
              )}
            </ul>

        {showVotes && (
          <div className="vote-counter">
            <span className="vote-number">{votes}</span>
            <span className="vote-label">votes</span>
          </div>
        )}

     {onVote && (
          <button
            className={`vote-button ${voted ? "voted-button" : ""}`}
            onClick={handleVote}
            disabled={voted}
          >
            {voted ? "VOTED 💘" : "VOTE"}
          </button>
        )}
      </div>
    </div>
  );
};

export const ContestantGrid = ({ list = [], onVote, onFavorite, showVotes = false, displayBio = false }) => (
  <div className="contestant-grid">
    {list.map((islander, i) => (
      <ContestantCard
        key={islander.id ?? i}
        islander={islander}
        onVote={onVote}
        onFavorite={onFavorite}
        showVotes={showVotes}
        displayBio={displayBio}
      />
    ))}
  </div>
);
