import styled from 'styled-components';
import { useMatch, useNavigate } from 'react-router-dom';
import Button from './Button';
import Container from './Container';
import theme from '../theme';

const NavigationBar = () => {
  const matchWithTrain = useMatch('/stations/:stationShortCode/trains/:trainNumber');
  const stationShortCode = matchWithTrain?.params?.stationShortCode;

  const navigate = useNavigate();
  

  return (
    <div>
      <NavigationBarContainer>
        <Button onClick={() => navigate('//')}>Station selection</Button>
        {stationShortCode && <Button onClick={() => navigate(`/stations/${stationShortCode}`)}>
          {stationShortCode}
        </Button>}
      </NavigationBarContainer>
      <Line />
    </div>
  );
};

const Line = styled.hr`
  color: ${theme.colors.primary};
  border: 1px, solid, ${theme.colors.primary};
  box-shadow: 0px 0px 2px 1px, 0px 0px 2px 1px inset;
`;

const NavigationBarContainer = styled(Container)`
  flex-wrap: nowrap;
  display: flex;
  width: fit-content;
  border: none;
  box-shadow: none;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
`;

export default NavigationBar;