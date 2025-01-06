const StationSelector = ({stations, handleChange}) => {
  return <div>
    <h1>Stations</h1>
      <select onChange={handleChange} defaultValue={''} >
      <option value='' disabled>Select station</option>
        {
          stations.map(station => (
            <option key={station.stationShortCode} value={station.stationName}>{station.stationName}</option>
          ))
        }
      </select>
  </div>
}

export default StationSelector