import TimetableRow from "./TimetableRow"

const TrainInfo = ({train, station}) => {
  if (!train) return <></>
  const rows = train.timeTableRows.filter(row => row.stationShortCode == station.stationCode)

  return <div className='data'>
    {rows.map(row => <TimetableRow key={row.stationShortCode + row.commercialTrack + row.scheduledTime} 
                                   row={row}/>)}
  </div>
}

export default TrainInfo