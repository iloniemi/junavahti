const TrainTypeSelector = ({trains, handleSelect, selectedTrainType}) => {
  const  trainTypes = trains.map(train => train.trainType)
  .filter(
    (trainType, index, allTrainTypes) => index === allTrainTypes.indexOf(trainType)
  )
  return (
    <div className='container traintype-buttons'>Train type:
      <div 
        className={ selectedTrainType === undefined ? 'styled-button chosen' : 'styled-button' } 
        onClick={() => handleSelect(undefined)}
      >
        All
      </div>
      { trainTypes.map(trainType => (
        <div 
          key={trainType}
          onClick={ () => handleSelect(trainType) }
          className={trainType === selectedTrainType ? 'styled-button chosen' : 'styled-button' }
        >
          {trainType}
        </div>
      )) }
    </div>
  )
}

export default TrainTypeSelector