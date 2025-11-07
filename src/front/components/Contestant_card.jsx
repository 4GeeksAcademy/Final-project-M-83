import React, { useState, useEffect } from "react";
import "../css/contestant-card.css";

export const ContestantCard = ({ islander, onVote, onFavorite, showVotes = false, showFavoriteButton = false }) => {
  if (!islander) return null;
  const { id, name, age, photo_url, hometown, occupation, votes = 0 } = islander;
  const [voted, setVoted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(islander.is_favorite || false);

  useEffect(() => setVoted(false), [id]);

  const handleVote = async () => {
    if (!onVote) return;
    const success = await onVote(islander);
    if (success) setVoted(true);
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
     {showFavoriteButton && (
        <button
          className={`favorite-button ${isFavorite ? "favorited" : ""}`}
          onClick={handleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      )}
      <div className="contestant-image-container">
        {showVotes && (
          <div className="vote-badge" aria-label="total votes">
            <span className="vote-badge-number">{votes}</span>
            <span className="vote-badge-label">votes</span>
          </div>
        )}
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
        </ul>
        {onVote && (
          <button
            className={`vote-button ${voted ? "voted-button" : ""}`}
            onClick={handleVote}
            disabled={voted}>
            {voted ? "VOTED 💘" : "VOTE"}
          </button>
        )}
      </div>
    </div>
  );
};

export const ContestantGrid = ({ list = [], onVote, onFavorite, showVotes = false, hideVoteButton = false, showFavoriteButton = false }) => (
  <div className="contestant-grid">
    {list.map((islander, i) => (
      <ContestantCard
        key={islander.id ?? i}
        islander={islander}
        onVote={onVote}
        onFavorite= {onFavorite}
        showVotes={showVotes}
        hideVoteButton={hideVoteButton}
        showFavoriteButton={showFavoriteButton}
      />
    ))}
  </div>
);

// import React, { useState, useEffect } from "react";
// import "../css/contestant-card.css";

// export const ContestantCard = ({ islander, onVote, showVotes = false, hideVoteButton = false }) => {
//   if (!islander) return null;
//   const { id, name, age, photo_url, hometown, occupation, votes = 0 } = islander;
//   const [voted, setVoted] = useState(false);

//   useEffect(() => setVoted(false), [id]);

//   const handleVote = async () => {
//     if (!onVote) return;
//     const success = await onVote(islander);
//     if (success) setVoted(true);
//   };

//   return (
//     <div className={`contestant-card ${voted ? "voted" : ""}`}>
//       <div className="contestant-image-container">
//         {showVotes && (
//           <div className="vote-badge" aria-label="total votes">
//             <span className="vote-badge-number">{votes}</span>
//             <span className="vote-badge-label">votes</span>
//           </div>
//         )}
//         <img src={photo_url} alt={name} className="contestant-image" />
//       </div>

//       <div className="contestant-info">
//         <h3 className="contestant-name">{name}</h3>

//         <ul className="contestant-meta">
//           {age && (
//             <li className="meta">
//               <span className="meta-label">Age</span>
//               <span className="meta-value">{age} yrs</span>
//             </li>
//           )}
//           {hometown && (
//             <li className="meta">
//               <span className="meta-label">Hometown</span>
//               <span className="meta-value">{hometown}</span>
//             </li>
//           )}
//           {occupation && (
//             <li className="meta">
//               <span className="meta-label">Occupation</span>
//               <span className="meta-value">{occupation}</span>
//             </li>
//           )}
//         </ul>

//         {!hideVoteButton && (
//           <button
//             className={`vote-button ${voted ? "voted-button" : ""}`}
//             onClick={handleVote}
//             disabled={voted}
//           >
//             {voted ? "VOTED 💘" : "VOTE"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export const ContestantGrid = ({ list = [], onVote, showVotes = false, hideVoteButton = false }) => (
//   <div className="contestant-grid">
//     {list.map((islander, i) => (
//       <ContestantCard
//         key={islander.id ?? i}
//         islander={islander}
//         onVote={onVote}
//         showVotes={showVotes}
//         hideVoteButton={hideVoteButton}
//       />
//     ))}
//   </div>
// );