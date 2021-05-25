import { useEffect, useState } from 'react';
import { GaugeBar } from '../gauge-bar/gauge-bar';
import { VotingComponent } from '../voting-component/voting-component';
import './personality-card.css';

export function PersonalityCard(props) {
  const [ positiveVotes, setPositiveVotes ] = useState(props.personalityData?.votes?.positive);
  const [ negativeVotes, setNegativeVotes] = useState(props.personalityData?.votes?.negative);

  useEffect(() => {
    const handleStorageChange = (event) => {
      setPositiveVotes(
        localStorage.getItem(props.personalityData?.name) ?
          parseInt(JSON.parse(localStorage.getItem(props.personalityData?.name))['positive']) : 
          props.personalityData?.votes?.positive
      )
      setNegativeVotes(localStorage.getItem(props.personalityData?.name) ?
        parseInt(JSON.parse(localStorage.getItem(props.personalityData?.name))['negative']) : 
        props.personalityData?.votes?.negative
      )
    }

    
    window.addEventListener('storage', (event) => handleStorageChange(event));

    if(!localStorage.getItem(props.personalityData?.name)) {
      localStorage.setItem(props.personalityData?.name, JSON.stringify(props.personalityData?.votes));
    }

    return () => window.removeEventListener('storage', StorageEvent)
  });

  return (
    <div style={{
        background: 'url(https://www.w3schools.com/howto/img_avatar.png), linear-gradient(90deg, rgba(0, 0, 0, 0.0001) 0%, #888888 19.79%, #666666 50%, rgba(51, 51, 51, 0.6) 71.88%)',
      }}
      className={`main-card ${props.squareTile ? 'grid-main-card' : 'list-main-card'}`} 
    >
      <div className={props.squareTile ? 'name-container' : 'list-name-container'}>
        {
          props.personalityData?.votes?.positive > props.personalityData?.votes?.negative ?
          <img className={`${props.squareTile ? 'grid-thumb' : 'list-thumb'} icon-button`}
               aria-label="thumbs up no hover"
               src="assets/img/thumbs-up.svg"
               alt="thumbs up"
          /> :
          <img className={`${props.squareTile ? 'grid-thumb' : 'list-thumb'} icon-button`}
               aria-label="thumbs down no hover"
               src="assets/img/thumbs-down.svg"
               alt="thumbs down"
          />
        }
        <h4>{props.personalityData?.name}</h4>
      </div>
      <div className={ props.squareTile ? 'description-area' : 'list-description-area' }>
        <p className={props.squareTile ? 'description-text' : 'list-description-text'}>{props.personalityData?.description}</p>
        <VotingComponent squareTile={props.squareTile}
                         lastUpdated={props.personalityData?.lastUpdated}
                         category={props.personalityData?.category}
                         personalityName={props.personalityData?.name}
        />
      </div>
      <div className='bottom-bar'>
        <GaugeBar barHeigth={props.squareTile ? '36px' : props.actualWidth > 768 ? '54px' : '36px'}
                  positiveVotes={positiveVotes}
                  negativeVotes={negativeVotes}
        />
      </div>
    </div>
  )
}