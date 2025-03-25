
import { useState } from 'react';
import './Positions.css';

function Positions() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleDescription = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="positions-container">
      <h2>Purveyor of Fine Goods<span id="colon">:</span></h2>
      <p>
        <span id="more" style={{ display: expandedSections['purveyor'] ? 'inline' : 'none' }}>
          Do you have a passion for luxury items, impeccable taste, and an eye for the finer things in life? We’re seeking a Purveyor of Fine Goods to join our crew and elevate every journey with the finest offerings in hand, whether it's exquisite snacks, rare collectibles, or a selection of artisan knick-knacks. As the go-to source for all things opulent, your role is to provide top-tier service and curate an exclusive experience for crew and passengers alike.
        </span>
      </p>
      <button onClick={() => toggleDescription('purveyor')} id="myBtn">
        {expandedSections['purveyor'] ? 'Close' : 'View Details'}
      </button>

      <h2>Linguist<span id="colon">:</span></h2>
      <p>
        <span id="more" style={{ display: expandedSections['linguist'] ? 'inline' : 'none' }}>
          We are seeking a highly skilled Military Linguist to join our elite crew. The Linguist will serve as the primary expert in language translation, cultural liaison, and communication support across a diverse range of operational environments. This position requires fluency in multiple languages, a keen understanding of military protocols, and the ability to function effectively under pressure, ensuring smooth and secure communication between crew members, allies, and local populations.
        </span>
      </p>
      <button onClick={() => toggleDescription('linguist')} id="myBtn">
        {expandedSections['linguist'] ? 'Close' : 'View Details'}
      </button>

      <h2>Cook<span id="colon">:</span></h2>
      <p>
        <span id="more" style={{ display: expandedSections['cook'] ? 'inline' : 'none' }}>
          You cook and you know things.
        </span>
      </p>
      <button onClick={() => toggleDescription('cook')} id="myBtn">
        {expandedSections['cook'] ? 'Close' : 'View Details'}
      </button>
    </div>
  );
}


export default Positions;
