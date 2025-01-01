const TrainsSelectorButtons = ({trains, handleClick, selectedTrain}) => {
  if (trains.length === 0) return <></>
  return <div className='sidebar'>
    { trains.map(train => {
      let elementClass = 'styled-button'
      if (selectedTrain && selectedTrain.trainNumber == train.trainNumber
        && selectedTrain.departureDate == train.departureDate) {
          elementClass = elementClass.concat(' chosen') 
        }
      

      return <div key={train.trainNumber+train.departureDate}
              onClick={handleClick(train)}
              className={elementClass}
             > 
              {`${train.trainType} ${train.trainNumber}`}
             </div>
    })}
  </div>
}


export default TrainsSelectorButtons