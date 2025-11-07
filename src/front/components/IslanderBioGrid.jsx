import React from "react";
import { IslanderBioCell } from "./IslanderBioCell.jsx"; // Import the individual cell
import "../css/islanderbiogrid.css"; // Styles for the container

/**
 * IslanderBioGrid: Displays a list of islanders using the large bio cell format.
 * @param {Array} list - Array of islander objects.
 * @param {string} gender - 'male' or 'female' to determine the grid styling.
 */


export const IslanderBioGrid = ({ list, gender }) => {
    return (
        <div className={`bio-grid ${gender}-grid`}>
            {/* Map over the list and render a large bio cell for each islander */}
            {list.map((islander) => (
                <IslanderBioCell 
                    key={islander.id || islander.name} // Use a unique key
                    islander={islander} 
                    gender={gender} 
                />
            ))}
        </div>
    );
};