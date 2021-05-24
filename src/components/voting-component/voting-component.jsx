import { useState } from 'react';
import {ReactComponent as ThumbsUp } from '../../assets/img/thumbs-up.svg';
import {ReactComponent as ThumbsDown } from '../../assets/img/thumbs-up.svg';

export function VotingComponent(props) {

  const [hasVoted, setHasVoted] = useState(false);
  const [thumbSelected, setThumbSelected] = useState('');

  const submitVote = (state) => {
    // logic to submit vote
    setHasVoted(true);
  }

  return(
    <div>
      { hasVoted ? 'Thanks for your vote!' : `${determineTextBasedOnTimeElapsed(props.lastUpdated, performance.now())} ago in ${props.category}` }
      <div>
        <button className="icon-button votation-button" aria-label="thumbs up" onClick={() => setThumbSelected('positive')}>
          <img src="assets/img/thumbs-up.svg" alt="thumbs up" />
        </button>
        <button className="icon-button votation-button" aria-label="thumbs down" onClick={() => setThumbSelected('negative')}>
          <img src="assets/img/thumbs-down.svg" alt="thumbs down" />
        </button>

        { hasVoted ? <button>Vote Again</button> : <button disabled={thumbSelected === ''} onClick={() => submitVote(thumbSelected)}>Vote Now</button> }
      </div>
    </div>
  )
}

function determineTextBasedOnTimeElapsed(initialTime, finalTime) {
  const daysElapsed = (finalTime - initialTime) / 86400000;

  switch (daysElapsed) {
    case daysElapsed < 30:
      return `${daysElapsed} days`;
    case daysElapsed < 365:
      return `${parseInt(daysElapsed / 30)} months`;
    case daysElapsed >= 365:
      return `${parseInt(daysElapsed / 365)} years`;
    default:
      return '';
  }
}