import { useNavigate } from "react-router-dom"
import StationMap from "./StationMap"
import StationSelectorButtons from "./StationSelectorButtons"
import { useState } from "react"
import Container from "./Container"
import styled from "styled-components"
import theme from "../theme"

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
    <div>
      <Container>
        <h1>Stations</h1>
      </Container>
      <SelectionContainer>
        <StationMap handleClick={handleCanvasClick} searchPoint={searchPoint} />
        <StationSelectorButtons stations={stationsToShow} handleClick={handleStationChangeButton} />
      </SelectionContainer>
    </div>
  </div>
}

const SelectionContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  color: ${theme.colors.primary};
  background: transparent;
  padding: 4px;
  margin: 4px;
  border: solid;
  border-width: 2px;
  align-content: stretch;

  box-shadow: 0px 0px 2px 1px, 0px 0px 2px 1px inset;
  text-shadow: 0px 0px 2px;

  @media screen and (max-width: 400px) {
    flex-wrap: wrap;
  }
`

export default StationSelector