import { useState } from 'react'
import './App.css'
import trainService from './services/trains'
import TrainInfo from './components/TrainInfo'
import StationSelector from './components/StationSelector'
import TrainsSelector from './components/TrainsSelector'

function App() {
  const stations = [
    {
      name: "Jyväskylä",
      stationCode: "JY"
    },
    {
      name: "Ähtäri",
      stationCode: "ÄHT"
    }
  ]
  
  const [trains, setTrains] = useState([])
  const [train, setTrain] = useState(undefined)
  const [station, setStation] = useState('')
  const [timeTableRow, setTimeTableRow] = useState(undefined)

  const handleStationChange = async ( event ) => {
    const selectedStationName = event.target.value
    if (selectedStationName === '') return
    const selectedStation = stations.find(station => station.name === selectedStationName)
    setStation(selectedStation)
    const newTrains = await trainService.getTrains(selectedStation.stationCode)
    setTrains(newTrains)
  }

  const handleTrainChange = event => {
    const newData = event.target.value
    if (newData === '') return
    const [newTrainNumber, departureDate] = newData.split(' ')

    const selectedTrain = trains.find(train => 
      train.trainNumber.toString() === newTrainNumber && train.departureDate === departureDate
    )
    const newTimeTableRow = selectedTrain.timeTableRows.find(row => row.stationShortCode === station.stationCode)
    setTrain(selectedTrain)
    setTimeTableRow(newTimeTableRow)
  }

  return (
    <>
      <StationSelector stations={stations} handleChange={handleStationChange} />
      <TrainsSelector trains={trains} handleChange={handleTrainChange} />
      <TrainInfo train={train} timeTableRow={timeTableRow} />
    </>
  )
}



export default App
