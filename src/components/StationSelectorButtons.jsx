const StationSelectorButtons = ({stations, handleClick}) => {
  console.log('stations', stations);
  return <div className="container station-buttons">
        {
          stations.map(station => (
            <div key={station.stationShortCode}
                 onClick={handleClick(station)}
                 className="styled-button"
            >
              {station.stationName}
            </div>
          ))
        }
  </div>
}

export default StationSelectorButtons