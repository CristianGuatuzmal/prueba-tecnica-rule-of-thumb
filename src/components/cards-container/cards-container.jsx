import { useEffect, useState } from 'react';
import { data } from '../../assets/data.json'
import { PersonalityCard } from "../personality-card/personality-card";
import './cards-container.css';

export function CardsContainer() {
  const displayableData = data;
  const [ windowDimensions, setWindowDimensions ] = useState(getWindowDimensions());
  const [ displayClass, setDisplayClass ] = useState(windowDimensions.width > 500 ? 'grid-display' : 'mobile-list-display');
  const [ oldDisplayClass, setOldDisplayClass ] = useState(null)

  const handleSelectChange = (value) => {
    setOldDisplayClass(displayClass);
    setDisplayClass(value.target.value);
  }
  
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions);
      if(windowDimensions.width < 500) {
        displayClass !== 'mobile-list-display' && setOldDisplayClass(displayClass);
        setDisplayClass('mobile-list-display')
      }
      if(windowDimensions.width > 500 && displayClass === 'mobile-list-display') {
        oldDisplayClass ? setDisplayClass(oldDisplayClass) : setDisplayClass('grid-display');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  return (
    <div>
      <div className="rulings-header">
        <h3>Previous Rulings</h3>
        <span className="separator"></span>
        {
          windowDimensions.width > 500 &&
          (
            <select className="displaying-select" onChange={handleSelectChange} value={displayClass}>
              <option value="grid-display">Grid</option>
              <option value="list-display">List</option>
            </select>
          )
        }
      </div>
      <ul className={windowDimensions.width <= 500 ? 'mobile-grid-display' : displayClass }>
        {
          displayableData.map(
            (data, index) => (
              <PersonalityCard key={index}
                               personalityData={data}
                               squareTile={displayClass === "grid-display" || displayClass === 'mobile-list-display'? true : false }
                               actualWidth={windowDimensions.width}
              />
            )
          )
        }
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