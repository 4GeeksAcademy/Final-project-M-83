import React from "react";


/**
 * IslanderBioCell: Displays a single islander's large bio card.
 * @param {Object} islander - The islander data object.
 * @param {string} gender - 'male' or 'female' for theme colors.
 */


export const IslanderBioCell = ({ islander, gender }) => {
    // Destructure properties from the islander object
    const { name, age, height, occupation, bio, photo_url } = islander;

    // Determine the class for border and background colors
    const genderClass = gender === "female" ? "pink-theme" : "blue-theme";
    
    // Fallback image path
    const defaultImageUrl = "/assets/placeholder.jpg"; 

    return (
        <article className={`bio-cell ${genderClass}`}>
            
            {/* Left Side: Image and Name Overlay */}
            <div className="image-side">
                <img 
                    src={photo_url || defaultImageUrl} // Use photo_url from your data
                    alt={`Image of ${name}`} 
                    className="islander-image-lg" 
                />
                
                {/* Name overlay visible on desktop */}
                <div className="name-overlay-lg">
                    {name}
                </div>
            </div>

            {/* Right Side: Bio Details */}
            <div className="bio-side">
                {/* Name displayed on mobile only */}
                <h3 className="islander-name-mobile">{name}</h3>
                
                <div className="details-list">
                    <p><strong>Age:</strong> {age || 'Unknown'}</p>
                    <p><strong>Occupation:</strong> {occupation || 'Not Listed'}</p>
                    {/* Assuming your islander objects have a 'height' property */}
                    <p><strong>Height:</strong> {height || 'N/A'}</p> 
                </div>

                <div className="full-bio">
                    <h4>My Love Island Journey:</h4>
                    <p>
                        {/* Display the full bio text */}
                        {bio || 
                         `This islander is keeping their cards close to their chest! 
                          They are here for love and ready to shake things up in the villa. 
                          Check back soon for more juicy details about their past relationships and what they look for in a partner.`}
                    </p>
                </div>
                
                {/* You can add dynamic elements here, like current couple status */}
                <div className="status-badge">
                    Currently: Paired Up
                </div>
            </div>
        </article>
    );
};