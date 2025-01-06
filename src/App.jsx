import { useState } from 'react'
import './App.css'
import trainService from './services/trains'
import TrainInfo from './components/TrainInfo'
import StationSelector from './components/StationSelector'
import TrainsSelector from './components/TrainsSelector'
import TrainsSelectorButtons from './components/TrainsSelectorButtons'
import StationMap from './components/StationMap'
import { all } from 'axios'
import StationSelectorButtons from './components/StationSelectorButtons'


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
  const [appStatus, setAppSatus] = useState('start') // start, trains
  const [date, setDate] = useState(dateToInputFormat(new Date()))
  const [searchPoint, setSearchPoint]= useState({longitude: 24.064036, latitude: 62.553265})
  const [stationsToShow, setStationsToShow] = useState(stations)

  const handleStationChange = async ( event ) => {
    const selectedStationName = event.target.value
    if (selectedStationName === '') return
    const selectedStation = stations.find(station => station.stationName === selectedStationName)
    setStation(selectedStation)
    setTrain(undefined)

    const newTrains = await trainService.getTrainsByDateAndStation(date, selectedStation)
    /*
    const newTrains = await trainService.getLiveTrainsByStation(selectedStation.stationCode)
    const filteredTrains = newTrains.filter(train => train.departureDate === date)
    .filter(train => train.trainCategory !== 'Cargo')
    
    */
    setTrains(newTrains)
    setAppSatus('trains')
  }

  const handleTrainChangeButtonClick = (train) => () => {
    setTrain(train)
    console.log('Train:', train)
  }

  const handleStationReset = () => {
    setStation('')
    setTrains([])
    setTrain(undefined)
    setAppSatus('start')
  }

  const handleDateChange = (event) => {
    const dateString = event.target.value
    setDate(dateString)
  }

  const handleTestButton = (event) => {
    const allStations = trainService.getPassengerStations()
    console.log('all stations', allStations);
  }

  const handleTestImgClick = (event) => {
    console.log('event', event)
    console.log('client', event.clientX, event.clientY)
    console.log('screen', event.screenX, event.screenY);
    console.log('page', event.pageX, event.pageY);
    const rect = event.target.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    console.log('calculated', x, y);
  
  }

  const handleCanvasClick = (event, point, filteredStations) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY
    //console.log('click', event);
    //console.log(x,y, point);
    setSearchPoint(point)
    //console.log('filteredStationsAtAppClickHandle', filteredStations);
    //console.log('stationsToShowAtApp', stationsToShow);
    
    
    setStationsToShow(filteredStations)
  }

  if (appStatus == 'start') {
    const maxDate = new Date()
    maxDate.setDate(new Date().getDate() + 1)
    
    const minDate = new Date()
    minDate.setDate(new Date().getDate() - 1)
    
    
    return <>
      <h1>Stations</h1>
      <StationMap handleClick={handleCanvasClick} searchPoint={searchPoint} />
      <button onClick={handleTestButton}>TEST</button>
      <StationSelectorButtons stations={stationsToShow} />
      <StationSelector stations={stations} handleChange={handleStationChange} />
      <div>
        <h1>Date</h1>
        <input type="date"
               onChange={handleDateChange}
               value={date}

        ></input>
      </div>
    </>
  }

  if (appStatus == 'trains') {
    return <>
      <div className='container'>
         <div className='container'>
                      <h2>{station.stationName} - {date}</h2>
                      <div onClick={handleStationReset} className='styled-button'>
                        Change station / date
                      </div>
                    </div>
        <TrainsSelectorButtons trains={trains} handleClick={handleTrainChangeButtonClick} selectedTrain={train} />
        <TrainInfo train={train} station={station} />
      </div>
    </>
  }
}

export default App
