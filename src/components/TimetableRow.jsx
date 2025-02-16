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
  const hours = date.getHours() > 9 ? date.getHours() : '0'.concat(date.getHours())
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0'.concat(date.getMinutes())
  return `${hours}:${minutes}`
}

export default TimetableRow