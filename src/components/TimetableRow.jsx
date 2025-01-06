const TimetableRow = ({row}) => {
  const {type,
         scheduledTime,
         liveEstimateTime,
         actualTime,
         differenceInMinutes
  } = row

  return <div>
    {type}<br/>
    Scheduled: {timeFromDateTime(scheduledTime)}<br/>
    {liveEstimateTime ? `Estimated: ${timeFromDateTime(liveEstimateTime)}` : ''}
    {liveEstimateTime ? <br/> : ''}
    {actualTime ? `Actual: ${timeFromDateTime(actualTime)}` : ''}
    {actualTime ? <br/> : ''}
    {(liveEstimateTime || actualTime) ? `Difference: ${differenceInMinutes} minutes` : ''}
  </div>
}

const timeFromDateTime = (dateTime) => {
  const date = new Date(dateTime)
  return `${date.getHours()}:${date.getMinutes()}`
}

export default TimetableRow