import { useState } from "react"


const TrainsSelectorButtons = ({trains, handleClick, selectedTrain, selectedStation}) => {

  return <div className='sidebar'>
    { trains.map(train => {
      let elementClass = 'styled-button'
      if (selectedTrain && selectedTrain.trainNumber == train.trainNumber
        && selectedTrain.departureDate == train.departureDate) {
          elementClass = elementClass.concat(' chosen') 
      }

      const rows = train.timeTableRows
      const rowsFiltered = rows.filter(row => row.stationShortCode === selectedStation.stationShortCode)
      const delay = rowsFiltered.reduce((biggestDelay, row) => {
        if (row.differenceInMinutes === undefined) return biggestDelay
        return biggestDelay > row.differenceInMinutes ? biggestDelay : row.differenceInMinutes
      }, undefined)

      return <div key={train.trainNumber+train.departureDate}
              onClick={handleClick(train)}
              className={elementClass}
             > 
              {`${train.trainType} ${train.trainNumber} ${delay > 0 ? '⏱️' :''}`}
             </div>
    })}
  </div>
}


export default TrainsSelectorButtons