import {ReactComponent as ThumbsUp } from '../../assets/img/thumbs-up.svg';
import {ReactComponent as ThumbsDown } from '../../assets/img/thumbs-up.svg';
import { VotingComponent } from '../voting-component/voting-component';

export function PersonalityCard(props) {

  return (
    <div className="main-card" style={{
      backgroundImage: 'https://www.w3schools.com/howto/img_avatar.png',
    }}>
      { props.personalityData?.votes?.positives > props.personalityData?.votes?.negatives ? <ThumbsUp className='most-received'/> : <ThumbsDown className='most-received'/> }
      <h4>{props.personalityData?.name}</h4>
      <p>{props.personalityData?.description}</p>
      <VotingComponent lastUpdated={props.personalityData?.lastUpdated} category={props.personalityData?.category}/>
    </div>
  )
}