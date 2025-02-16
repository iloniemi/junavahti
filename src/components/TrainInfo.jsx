import TimetableRow from "./TimetableRow"

const TrainInfo = ({train, station}) => {
  if (!train) return <></>
  const rows = train.timeTableRows.filter(row => row.stationShortCode == station.stationShortCode)

  return <div className='data'>
    <div><b>{`${train.trainType} ${train.trainNumber}`}</b></div>
    {rows.map(row => <TimetableRow key={row.stationShortCode + row.commercialTrack + row.scheduledTime} 
                                   row={row}/>)}
  </div>
}

export default TrainInfo