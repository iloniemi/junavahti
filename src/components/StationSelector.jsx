import { useNavigate } from "react-router-dom"
import StationMap from "./StationMap"
import StationSelectorButtons from "./StationSelectorButtons"
import { useState } from "react"

// TODO useReucer ja context vai redux? 
const stations = [
  {
    stationName: "Jyväskylä",
    stationShortCode: "JY"
  },
  {
    stationName: "Ähtäri",
    stationShortCode: "ÄHT"
  }
]


const StationSelector = () => {

  const [searchPoint, setSearchPoint]= useState({longitude: 24.064036, latitude: 62.553265})
  const [stationsToShow, setStationsToShow] = useState(stations)
  const navigate = useNavigate();
  const handleStationChangeButton = (station) => () => {
    navigate(`/stations/${station.stationShortCode}`);
  }

  const handleCanvasClick = (event, point, filteredStations) => {
    setSearchPoint(point)
    setStationsToShow(filteredStations)
  }


  return <div>
    <div className='container'>
      <h1 className='container'>Stations</h1>
      <div className='station-map-selection'>
        <StationMap handleClick={handleCanvasClick} searchPoint={searchPoint} />
        <StationSelectorButtons stations={stationsToShow} handleClick={handleStationChangeButton} />
      </div>
    </div>
  </div>
}

export default StationSelector