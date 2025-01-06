import axios from "axios"
import stations from '../assets/stations.json'

const baseUrl = 'https://rata.digitraffic.fi/api/v1/'

const getLiveTrainsByStation = (stationCode) => {
  const request = axios.get(`${baseUrl}live-trains/station/${stationCode}`)
  return request.then(response => {
      return response.data
    })
}

const getTrainsByDate = (date) => {
  const request = axios.get(`${baseUrl}trains/${date}`)
  return request.then(response => {
      return response.data
    })
}

const getTrainsByDateAndStation = async (date, station) => {
  const allTrains = await getTrainsByDate(date)
  const filteredTrains = allTrains.filter(train => {
    if (train.trainCategory === 'Cargo') return false
    const stopsAtSelectedStation = train.timeTableRows.reduce(
      (stops, row) => stops || (row.stationShortCode === station.stationShortCode)
    , false)
    if (!stopsAtSelectedStation) return false
    return true
  })

  console.log('trains', filteredTrains);
  return filteredTrains
}

const getPassengerStations = () => stations.filter(station => station.passengerTraffic)

const getTrain = (train) =>{
  const request = axios.get(`${baseUrl}/trains/${train.departureDate}/${train.trainNumber}`)
  return request.then(response => {
    return response.data[0]
  })
}

export default {getLiveTrainsByStation,
                getTrain,
                getTrainsByDate,
                getTrainsByDateAndStation,
                getPassengerStations
              }