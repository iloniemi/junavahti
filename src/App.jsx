import { useState } from 'react'
import './App.css'
import trainService from './services/trains'
import TrainInfo from './components/TrainInfo'
import StationSelector from './components/StationSelector'
import TrainsSelector from './components/TrainsSelector'
import TrainsSelectorButtons from './components/TrainsSelectorButtons'

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
  const [appStatus, setAppSatus] = useState('start') // start, trains
  const [date, setDate] = useState(dateToInputFormat(new Date()))

  const handleStationChange = async ( event ) => {
    const selectedStationName = event.target.value
    if (selectedStationName === '') return
    const selectedStation = stations.find(station => station.name === selectedStationName)
    setStation(selectedStation)
    setTrain(undefined)
    const newTrains = await trainService.getLiveTrainsByStation(selectedStation.stationCode)
    const filteredTrains = newTrains.filter(train => train.departureDate === date)
                                    .filter(train => train.trainCategory !== 'Cargo')
    
    setTrains(filteredTrains)
    setAppSatus('trains')
  }

  const handleTrainChange = event => {
    const newData = event.target.value
    
    if (newData === '') return
    const [newTrainNumber, departureDate] = newData.split(' ')

    const selectedTrain = trains.find(train => 
      train.trainNumber.toString() === newTrainNumber && train.departureDate === departureDate
    )

    setTrain(selectedTrain)
    console.log('Train:', selectedTrain)
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

  if (appStatus == 'start') {
    const maxDate = new Date()
    maxDate.setDate(new Date().getDate() + 1)
    
    const minDate = new Date()
    minDate.setDate(new Date().getDate() - 1)
    

    return <>
      <StationSelector stations={stations} handleChange={handleStationChange} />
      <div>
        <h1>Date</h1>
        <input type="date"
               onChange={handleDateChange}
               value={date}
               max={dateToInputFormat(maxDate)}
               min={dateToInputFormat(minDate)}
        ></input>
      </div>
    </>
  }

  if (appStatus == 'trains') {
    return <>
      <div className='container'>
         <div className='container'>
                      <h2>{station.name} - {date}</h2>
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
