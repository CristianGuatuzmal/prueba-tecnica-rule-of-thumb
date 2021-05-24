import { useEffect, useState } from 'react';
import { data } from '../../assets/data.json'
import { PersonalityCard } from "../personality-card/personality-card";
import './cards-container.css';

export function CardsContainer() {
  const displayableData = data;
  const [ windowDimensions, setWindowDimensions ] = useState(getWindowDimensions());
  const [ displayClass, setDisplayClass ] = useState('grid-display');

  const handleSelectChange = (value) => setDisplayClass(value.target.value);
  
  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  return (
    <div>
      <div>
        <h3>Previous Rulings</h3>
        {
          windowDimensions.width > 500 &&
          (
            <select onChange={handleSelectChange} value={displayClass}>
              <option value="grid-display">Grid</option>
              <option value="list-display">List</option>
            </select>
          )
        }
      </div>
      <ul className={windowDimensions <= 500 ? 'mobile-grid-display' : displayClass }>
        { displayableData.map((data, index) => <PersonalityCard key={index} personalityData={data}/>) }
      </ul>
    </div>
  )
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}