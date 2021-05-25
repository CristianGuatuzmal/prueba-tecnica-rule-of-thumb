import './gauge-bar.css'

export function GaugeBar(props) {
  const [ percentagePositive, percentageNegative ] = obtainPercentages(props.positiveVotes, props.negativeVotes);

  return (
    <div className="container">
      <span className="positive-votes percentage-bar" style={{width: `${percentagePositive}%`, height: props.barHeigth}}>
        <img src="assets/img/thumbs-up.svg" alt="thumbs up" /> {`${percentagePositive}%`}
      </span>
      <span className="negative-votes percentage-bar" style={{width: `${percentageNegative}%`, height: props.barHeigth}}>
        <img src="assets/img/thumbs-down.svg" alt="thumbs down" /> {`${percentageNegative}%`}
      </span>
    </div>
  )
}

function obtainPercentages(valOne, valTwo) {
  const totalVal = valOne + valTwo;

  const percentageOne = valOne / totalVal * 100;
  const percentageTwo = valTwo / totalVal * 100;

  return [ percentageOne.toFixed(1), percentageTwo.toFixed(1) ];
}