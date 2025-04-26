import { useState } from "react"


const TrainsSelectorButtons = ({trains, handleClick, selectedStation}) => {

  return <div className='sidebar'>
    { trains.map(train => {
      let elementClass = 'styled-button'

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