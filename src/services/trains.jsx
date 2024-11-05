import axios from "axios"

const baseUrl = 'https://rata.digitraffic.fi/api/v1/'

const getTrains = (stationCode) => {
  const request = axios.get(`${baseUrl}live-trains/station/${stationCode}`)
  return request.then(response => {
      return response.data
    })
}

const getTrain = (train) =>{
  const request = axios.get(`${baseUrl}/trains/${train.departureDate}/${train.trainNumber}`)
  return request.then(response => {
    return response.data[0]
  })
}

export default {getTrains, getTrain}