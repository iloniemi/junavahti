import './App.css'
import StationSelector from './components/StationSelector'
import { Link, Route, Routes } from 'react-router-dom'
import TrainsSelector from './components/TrainsSelector'
import SingleTrain from './components/SingleTrain'


function App() {
  return (
    <>
      <div>
        <Link to='//'>
          <div className='styled-button'>
            Station selection
          </div>
        </Link>
      </div>
      <Routes>
        <Route path='/' 
          element={<StationSelector/>}
        />
        <Route path='stations/:stationShortCode'
          element={<TrainsSelector />}
        />
        <Route path='stations/:stationShortCode/trains/:trainNumber'
          element={<SingleTrain />}
        />
      </Routes>
    </>
  );
}

export default App
