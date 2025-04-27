//import './App.css'
import StationSelector from './components/StationSelector'
import { Link, Route, Routes } from 'react-router-dom'
import TrainsSelector from './components/TrainsSelector'
import SingleTrain from './components/SingleTrain'
import theme from './theme';
import NavigationBar from './components/NavigationBar';
import styled from 'styled-components';

document.body.style.backgroundColor = theme.colors.background;
document.body.style.fontFamily = theme.fontFamily;

function App() {
  return (
    <AppContainer>
      <NavigationBar/>
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
    </AppContainer>
  );
}

const AppContainer = styled.div`
  max-width: 100%;
  padding: 12px;
`;

export default App
