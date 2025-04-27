import Button from "./Button";
import Container from "./Container";

const StationSelectorButtons = ({stations, handleClick}) => {
  console.log('stations', stations);
  return <Container>
        {
          stations.map(station => (
            <Button key={station.stationShortCode}
                 onClick={handleClick(station)}
            >
              {station.stationName}
            </Button>
          ))
        }
  </Container>
}



export default StationSelectorButtons