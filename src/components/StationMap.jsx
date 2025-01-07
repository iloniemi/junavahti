import suomi from '../assets/suomi2.png'
import { useRef, useEffect } from 'react'
import trainService from '../services/trains'

const mapWidth = 150
const mapHeight = 300
const searchRangePixels = 10

const mapEdges = {
  north: 70.0753 * 1.01,//70.09103107761716, >1 ylhaalta alas
  south: 59.8112 * 0.996,//59.8078399317853, <1 nostaa alareunasta 
  east: 31.5695 * 1.02,//31.586799425443846, >1 oikealta keskemmalle
  west: 20.6232 * 0.95,//20.547778 <1 vasemmalta keskelle
}
const xDegreeToPixels = mapWidth / (mapEdges.east - mapEdges.west)
const yDegreeToPixels = mapHeight / (mapEdges.north - mapEdges.south)

const ainola = {
  latitude: 60.455619,
  longitude: 25.101895
}


const StationMap = ({handleClick, searchPoint}) => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height)
    

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const dotRadius = 1
    
    //const pointX = xDegreeToPixels * (ainola.longitude - mapEdges.west) 
    //const pointY = yDegreeToPixels * (mapEdges.north - ainola.latitude)
    //console.log('point', pointX, pointY);
    
    trainService.getPassengerStations().filter(station => station.passengerTraffic)
    //.slice(0,10)
            .map(station => {
              const pointX = xDegreeToPixels * (station.longitude - mapEdges.west)
              const pointY = yDegreeToPixels * (mapEdges.north - station.latitude)
              context.beginPath()
              context.arc(pointX, pointY, dotRadius, 0, Math.PI * 2)
              context.fillStyle = '#cffcff'//'#34ebc0'
              context.fill()
            })
            
    context.lineWidth = 2
    context.strokeStyle = '#34ebc0'
    const pointX = xDegreeToPixels * (searchPoint.longitude - mapEdges.west)
    const pointY = yDegreeToPixels * (mapEdges.north - searchPoint.latitude)
    context.strokeRect(pointX - searchRangePixels,
                       pointY - searchRangePixels,
                       searchRangePixels*2,
                       searchRangePixels*2)
    
  }, [searchPoint])
  
  const handleClickEvent = (event) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY
    const clickCoordinates = {
                    latitude: mapEdges.north - (y / yDegreeToPixels),
                    longitude: mapEdges.west + (x / xDegreeToPixels)
                  }

    
    const limitNorth = clickCoordinates.latitude + (searchRangePixels / yDegreeToPixels)
    const limitSouth = clickCoordinates.latitude - (searchRangePixels / yDegreeToPixels)
    const limitWest = clickCoordinates.longitude - (searchRangePixels / xDegreeToPixels)
    const limitEast = clickCoordinates.longitude + (searchRangePixels / xDegreeToPixels)

    console.log(clickCoordinates, limitNorth, limitSouth, limitEast, limitWest);
    
    const filteredStations = trainService.getPassengerStations().filter(({latitude, longitude}) => {
      const inSearchArea = latitude < limitNorth &&
                           latitude > limitSouth &&
                           longitude > limitWest &&
                           longitude < limitEast
      return inSearchArea
    })

    handleClick(event, clickCoordinates, filteredStations)
  }


  return <canvas
  style={canvasStyle}
    onClick={handleClickEvent}
    ref={canvasRef}
    width={mapWidth}
    height={mapHeight}
    className='station-map container'
    />
  }
  
const canvasStyle = {
  //height: `${mapHeight}px`,
  //width: `${mapWidth}px`,
  backgroundColor: '#0a2b24',
  backgroundImage: `url(${suomi})`,
  backgroundSize: '100% 100%', // Adjust to fit the canvas
  backgroundPosition: 'center', // Center the image
}

export default StationMap