import { useState } from 'react';
import './voting-component.css';

export function VotingComponent(props) {

  const [hasVoted, setHasVoted] = useState(false);
  const [thumbSelected, setThumbSelected] = useState(false);
  const [positiveVote, setPositiveVote] = useState(false);
  const [negativeVote, setNegativeVote] = useState(false);

  const submitVote = () => {
    let objectToSave = JSON.parse(localStorage.getItem(props.personalityName));
    if(positiveVote) {
      objectToSave.positive += 1;
    } else if(negativeVote) {
      objectToSave.negative += 1;
    }
    localStorage.setItem(props.personalityName, JSON.stringify(objectToSave));
    window.dispatchEvent(new StorageEvent('storage'));
    setHasVoted(true);
  }

  const handlePositiveVoteSelection = () => {
    setPositiveVote(true);
    setNegativeVote(false);
    setThumbSelected(true)
  }

  const handleNegativeVoteSelection = () => {
    setNegativeVote(true);
    setPositiveVote(false);
    setThumbSelected(true)
  }

  return(
    <div className="wrapping-container">
      <div className="vote-info-container">
        { hasVoted ? 'Thanks for your vote!' : `${determineTextBasedOnTimeElapsed(props.lastUpdated, Date.now())} ago in ${props.category}` }
        <div className={`vote-buttons-container ${!props.squareTile && 'list-buttons-container'}`}>
          { !hasVoted &&
            <button className={`${props.squareTile ? 'voting-thumb' : 'voting-thumb list-voting-thumb'} ${positiveVote && 'selected'}`}
                    aria-label="thumbs up"
                    onClick={() => handlePositiveVoteSelection('positive')}
            >
              <img src="assets/img/thumbs-up.svg" alt="thumbs up" />
            </button>
          }
          {!hasVoted &&
            <button className={`${props.squareTile ? 'voting-thumb' : 'voting-thumb list-voting-thumb'} ${negativeVote && 'selected'}`}
                    aria-label="thumbs down"
                    onClick={() => handleNegativeVoteSelection('negative')}
            >
              <img src="assets/img/thumbs-down.svg" alt="thumbs down" />
            </button>
          }
          { hasVoted ?
            <button className="vote-submit-button big-button">Vote Again</button> :
            <button className="vote-submit-button" disabled={!thumbSelected} onClick={() => submitVote()}>Vote Now</button>
          }
        </div>
      </div>
    </div>
  )
}

function determineTextBasedOnTimeElapsed(initialTime, finalTime) {
  const daysElapsed = parseInt((new Date(finalTime).getTime() - new Date(initialTime).getTime()) / 86400000);
  
    if (daysElapsed < 30) {
      return `${daysElapsed} days`;
    } else if (daysElapsed < 365) {
      return `${parseInt(daysElapsed / 30)} months`;
    } else if (daysElapsed >= 365) {
      return `${parseInt(daysElapsed / 365)} years`;
    } else {
      return '';
    }
}