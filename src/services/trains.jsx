import axios from "axios"
import stations from '../assets/stations.json'

const baseUrl = 'https://rata.digitraffic.fi/api/v1/'
// of possibly passengercategory trains
const nonPassengerTrainTypes = ["VEV", "VET", "W", "TYO", "SAA", "PAI", "PAR", "RJ", "HV", "V", "MV", "LIV", "MUV"];
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
    if (train.trainCategory === 'Cargo' || nonPassengerTrainTypes.find(type => type === train.trainType)) return false
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

const getTrainByDateAndNumber = (date, trainNumber) =>{
  const request = axios.get(`${baseUrl}/trains/${date}/${trainNumber}`)
  return request.then(response => {
    return response.data[0]
  })
}

const getStation = (stationShortCode) => stations.find(station => station.stationShortCode === stationShortCode);

export default {
  getLiveTrainsByStation,
  getTrain,
  getTrainByDateAndNumber,
  getTrainsByDate,
  getTrainsByDateAndStation,
  getPassengerStations,
  getStation,
}