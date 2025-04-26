import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import trainService from '../services/trains';
import TrainTypeSelector from "./TrainTypeSelector";
import TrainsSelectorButtons from "./TrainsSelectorButtons";
import TrainInfo from "./TrainInfo";
import { dateToInputFormat } from '../utils'



const TrainsSelector = () => {
  const stationShortCode = useParams().stationShortCode;
  const station = trainService.getStation(stationShortCode);
  const [trains, setTrains] = useState([]);
  const [trainType, setTrainType] = useState(undefined)
  const navigate = useNavigate();

  useEffect(() => {
    console.log('stationShortCode from params', stationShortCode);
    console.log('station', station.stationName);
    
    const date = dateToInputFormat(new Date());
    const fetchAndSetTrains = async () => {
      const newTrains = await trainService.getTrainsByDateAndStation(date, station);
      console.log('newTrains', newTrains);
      
      setTrains(newTrains);
    };
    fetchAndSetTrains();
  },[]);

  if (trains.length === 0) return <><div>Loading</div></>

  const filteredTrains = trains.filter(train => {
    if (trainType === undefined) return true
    return train.trainType === trainType
  });

  const handleTrainSelect = (train) => () => {
    navigate(`/stations/${stationShortCode}/trains/${train.trainNumber}`);
  };

  return (
    <>
      <div className='container'>
         <div className='container'>
          <h2>{station.stationName}</h2>
        </div>
        <TrainTypeSelector trains={trains} handleSelect={setTrainType} selectedTrainType={trainType} />
        <TrainsSelectorButtons
          handleClick={handleTrainSelect}
          trains={filteredTrains}
          selectedStation={station}
        /> 
        <TrainInfo train={trains[0]} station={station} />
      </div>
    </>
  );
}


export default TrainsSelector