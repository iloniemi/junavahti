import Button from "./Button"
import Container from "./Container"

const TrainsSelectorButtons = ({trains, handleClick, selectedStation}) => {

  return <Container>
    { trains.map(train => {
      let elementClass = 'styled-button'

      const rows = train.timeTableRows
      const rowsFiltered = rows.filter(row => row.stationShortCode === selectedStation.stationShortCode)
      const delay = rowsFiltered.reduce((biggestDelay, row) => {
        if (row.differenceInMinutes === undefined) return biggestDelay
        return biggestDelay > row.differenceInMinutes ? biggestDelay : row.differenceInMinutes
      }, undefined)

      return <Button key={train.trainNumber+train.departureDate}
              onClick={handleClick(train)}
             > 
              {`${train.trainType} ${train.trainNumber} ${delay > 0 ? '⏱️' :''}`}
             </Button>
    })}
  </Container>
}


export default TrainsSelectorButtons