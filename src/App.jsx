import { useState } from 'react'
import './App.css'
import trainService from './services/trains'
import TrainInfo from './components/TrainInfo'
import StationSelector from './components/StationSelector'
import TrainsSelectorButtons from './components/TrainsSelectorButtons'
import StationMap from './components/StationMap'
import StationSelectorButtons from './components/StationSelectorButtons'
import TrainTypeSelector from './components/TrainTypeSelector'


const dateToInputFormat = (date) => {
  const year = date.getFullYear()
  const monthNumber = date.getMonth() + 1 // returns month index, so + 1
  const month = monthNumber > 9 ? monthNumber : '0'.concat(monthNumber)
  const day = date.getDate() > 9 ? date.getDate() : '0'.concat(date.getDate())
  return `${year}-${month}-${day}`
}

function App() {
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
  
  const [trains, setTrains] = useState([])
  const [train, setTrain] = useState(undefined)
  const [station, setStation] = useState('')
  const [appStatus, setAppStatus] = useState('start') // start, trains
  const [date, setDate] = useState(dateToInputFormat(new Date()))
  const [searchPoint, setSearchPoint]= useState({longitude: 24.064036, latitude: 62.553265})
  const [stationsToShow, setStationsToShow] = useState(stations)
  const [trainType, setTrainType] = useState(undefined)
  
  const filteredTrains = trains.filter(train => {
    if (trainType === undefined) return true
    return train.trainType === trainType
  })

  const handleStationChange = async ( event ) => {
    const selectedStationName = event.target.value
    if (selectedStationName === '') return
    const selectedStation = trainService.getPassengerStations().find(station => station.stationName === selectedStationName)
    

    await switchToTrainsOfStationView(selectedStation)
    /*
    setStation(selectedStation)
    setTrain(undefined)

    const newTrains = await trainService.getTrainsByDateAndStation(date, selectedStation)

    setTrains(newTrains)
    setAppStatus('trains')
    */
  }

  const handleStationChangeButton = (station) => async () => {
    await switchToTrainsOfStationView(station)
  }

  const switchToTrainsOfStationView = async (selectedStation) => {
    setStation(selectedStation)
    setTrain(undefined)

    const newTrains = await trainService.getTrainsByDateAndStation(date, selectedStation)

    setTrains(newTrains)
    setAppStatus('trains')
  }

  const handleTrainChangeButtonClick = (train) => () => {
    setTrain(train)
    console.log('Train:', train)
  }

  const handleStationReset = () => {
    setStation('')
    setTrains([])
    setTrain(undefined)
    setTrainType(undefined)
    setAppStatus('start')
  }

  const handleDateChange = (event) => {
    const dateString = event.target.value
    setDate(dateString)
  }

  const handleTestButton = (event) => {
    const allStations = trainService.getPassengerStations()
    console.log('all stations', allStations);
  }

  const handleCanvasClick = (event, point, filteredStations) => {
    setSearchPoint(point)
    setStationsToShow(filteredStations)
  }

  if (appStatus == 'start') {
    const maxDate = new Date()
    maxDate.setDate(new Date().getDate() + 1)
    
    const minDate = new Date()
    minDate.setDate(new Date().getDate() - 1)
    
    
    return <div>
    <div className='container'>
      <h1 className='container'>Stations</h1>
      <div className='station-map-selection'>
        <StationMap handleClick={handleCanvasClick} searchPoint={searchPoint} />
        <StationSelectorButtons stations={stationsToShow} handleClick={handleStationChangeButton} />
      </div>
    </div>
      <div className='container date-selection'>
      <h2>Select date</h2>
        <input type="date"
               onChange={handleDateChange}
               value={date}
               ></input>
        </div>
      </div>
  }

  if (appStatus == 'trains') {
    return <>
      <div className='container'>
         <div className='container'>
                      <div onClick={handleStationReset} className='styled-button'>
                      ◀◀ Station & date selection
                      </div>
                      <h2>{station.stationName} - {date}</h2>
                    </div>
        <TrainTypeSelector trains={trains} handleSelect={setTrainType} selectedTrainType={trainType} />
        <TrainsSelectorButtons trains={filteredTrains}
                               handleClick={handleTrainChangeButtonClick}
                               selectedTrain={train}
                               selectedStation={station}
        />
        <TrainInfo train={train} station={station} />
      </div>
    </>
  }
}

export default App
