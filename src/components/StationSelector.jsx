const StationSelector = ({stations, handleChange}) => {
  return <div>
    <h1>Stations</h1>
      <select onChange={handleChange}>
      <option value="" disabled>Select station</option>
        {
          stations.map(station => (
            <option key={station.stationCode} value={station.name}>{station.name}</option>
          ))
        }
      </select>
  </div>
}

export default StationSelector