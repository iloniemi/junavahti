const TrainInfo = ({train, timeTableRow}) => {
  if (!timeTableRow) return <></> 
  return <div>
    <h1>Train info</h1>
    <div>Train number: {train.trainNumber}</div>
    <div>Scheduled time: {timeTableRow.scheduledTime}</div>
    <div>Actual time: {timeTableRow.actualTime}</div>
    <div>Difference in minutes: {timeTableRow.differenceInMinutes}</div>
  </div>
}

export default TrainInfo