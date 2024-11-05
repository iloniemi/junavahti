const TrainsSelector = ({trains, handleChange}) => {
  if (trains.length === 0) return <></>
  return <div>
    <h1>Trains</h1>
      <select onChange={handleChange} defaultValue=''>
      <option value='' disabled>Select train</option>
        {
          trains.map(train => (
            <option key={train.trainNumber+train.departureDate} value={`${train.trainNumber} ${train.departureDate}`}>
              {`${train.trainNumber} ${train.departureDate}`}
            </option>
          ))
        }
      </select>
  </div>
}


export default TrainsSelector