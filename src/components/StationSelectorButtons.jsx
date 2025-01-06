const StationSelectorButtons = ({stations}) => {
  console.log('stations', stations);
  return <div className="container">
        {
          stations.map(station => (
            <div key={station.stationShortCode}>{station.stationName}</div>
          ))
        }
  </div>
}

export default StationSelectorButtons