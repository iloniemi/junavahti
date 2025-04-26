import { useParams } from "react-router-dom"
import TimetableRow from "./TimetableRow"
import { useEffect, useState } from "react";
import trainService from '../services/trains';
import { dateToInputFormat } from "../utils";

const SingleTrain = () => {
  const  params = useParams();
  const trainNumber = params.trainNumber;
  const stationShortCode = params.stationShortCode;
  const [train, setTrain] = useState(undefined);
  const [tracking, setTracking] = useState(undefined);
  const [trackingTimeoutID, setTrackingTimeoutID] = useState(undefined);
  const [timer, setTimer] = useState(0);
  const trackingInterval = 120000;
  const [intervalID, setIntervalID] = useState(undefined);
  
  const fetchAndSetTrain = async () => {
    const date = dateToInputFormat(new Date());
    const newTrain = await trainService.getTrainByDateAndNumber(date, trainNumber);
    setTrain(newTrain);
  };

  useEffect(() => {
    fetchAndSetTrain();
  },[]);
  
  const notificationsSupported = "Notification" in window;
  if (!notificationsSupported) {
    console.log("Browser does not support desktop notification");
  } else {
    //console.log("Notifications are supported");
    Notification.requestPermission();
  }

  const rows = train
    ? train.timeTableRows.filter(row => row.stationShortCode == stationShortCode)
    : undefined;
  
  useEffect(() => {
    if (tracking) {
      console.log('tracking', tracking);
      const row = rows.find(row => row.type === tracking);
      if (row && row.differenceInMinutes > 1) {
        const date = new Date().toString();
        new Notification('Late', { body: date });
      }
      const timeoutID = setTimeout(() => {
        console.log('tracking useEffect refetch');
        fetchAndSetTrain();
      }, trackingInterval);
      setTrackingTimeoutID(timeoutID);
      stopTimer();
      startTimer();
    };
  }, [train]);

  const notify = () => {
    new Notification('Hello');
  };

  const startTracking = (target) => {
    console.log('starting tracking', target);
    setTracking(target);
    const timeoutID = setTimeout(() => {
      console.log('tracking start refetch');
      fetchAndSetTrain();
    }, trackingInterval);
    setTrackingTimeoutID(timeoutID);

    stopTimer();
    startTimer();
  };

  const stopTracking = () => {
    console.log('stopping tracking');
    setTracking(undefined);
    clearTimeout(trackingTimeoutID);
    stopTimer();
  };

  const startTimer = () => {
    const start = Date.now();
    const newIntervalID = setInterval(() => {
      setTimer(Date.now() - start);
    }, 500);
    console.log('starting timer', newIntervalID);
    setIntervalID(newIntervalID);
    setTimeout(() => {
      clearInterval(newIntervalID);
      setTimer(0);
    }, trackingInterval);
  };

  const stopTimer = () => {
    console.log('stopping timer', intervalID);
    setTimer(0);
    clearInterval(intervalID);
  };

  if (!train) return <div>Loading</div>

  const timeTillRefresh = Math.round((trackingInterval - timer)/1000);
  const timePercentage = timer/trackingInterval*100;

  return (
    <div>
      <div className='data'>
        <div><b>{`${train.trainType} ${train.trainNumber}`}</b></div>
        {rows.map(row => <TimetableRow key={row.stationShortCode + row.commercialTrack + row.scheduledTime} 
                                      row={row}/>)}
      </div>
      <div>

      {tracking && <div>
        <div>Tracking {tracking}</div>
        <div>Refresh in {timeTillRefresh}</div>
        <progress id="refreshTimer" value={timePercentage} max="100"></progress>
        <div className='styled-button' onClick={ stopTracking } >Stop tracking</div>
      </div>}
      {!tracking && <div>
        <div className='styled-button' onClick={ () => startTracking('DEPARTURE') } >Track departure</div>
        <div className='styled-button' onClick={ () => startTracking('ARRIVAL') } >Track arrival</div>
      </div>}
        <div className='styled-button' onClick={ fetchAndSetTrain }>Update train info</div>
      </div>
        <div>Nofications {Notification.permission}</div>
        <div className='styled-button' onClick={ notify }>Test notification</div>
    </div>
  );
}

export default SingleTrain