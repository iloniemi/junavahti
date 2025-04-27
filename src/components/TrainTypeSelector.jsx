import Button from "./Button"
import Container from "./Container"

const TrainTypeSelector = ({trains, handleSelect, selectedTrainType}) => {
  const  trainTypes = trains.map(train => train.trainType)
  .filter(
    (trainType, index, allTrainTypes) => index === allTrainTypes.indexOf(trainType)
  )
  return (
    <Container>Train type:
      <Button 
        className={ selectedTrainType === undefined ? 'styled-button chosen' : 'styled-button' } 
        onClick={() => handleSelect(undefined)}
      >
        All
      </Button>
      { trainTypes.map(trainType => (
        <Button
          key={trainType}
          onClick={ () => handleSelect(trainType) }
          className={trainType === selectedTrainType ? 'styled-button chosen' : 'styled-button' }
        >
          {trainType}
        </Button>
      )) }
    </Container>
  )
}

export default TrainTypeSelector