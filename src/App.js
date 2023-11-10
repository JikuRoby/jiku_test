import React, { useRef, useEffect, useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import CityDataComponent from './CityDataComponent';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import CheckboxComponent from './CheckboxComponent'; // Import the new CheckboxComponent

function App() {
  const mapRef = useRef(null);
  const [eurostatData, setEurostatData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedCircleData, setClickedCircleData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uniqueLocations, setUniqueLocations] = useState({});
  const [totalCoordinateCount, setTotalCoordinateCount] = useState(0);
  const [uniqueDates, setUniqueDates] = useState([]);
  const [intervalDates, setIntervalDates] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState([0, 0]);
  const [sliderValue, setSliderValue] = useState([0, 0]);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [isMapDataReady, setIsMapDataReady] = useState(false); // New state to track map data readiness

  useEffect(() => {
    if (!mapRef.current && !isLoading) {
      const initialMap = L.map('map', { scrollWheelZoom: false }).setView([51.505, -0.09], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(initialMap);
      mapRef.current = initialMap;
      setIsMapDataReady(true); // Set isMapDataReady to true when map is initialized
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      updateMap();
    }
  }, [eurostatData, selectedTimeRange, isLoading]);

  useEffect(() => {
    createArrays();
  }, [eurostatData]);

  useEffect(() => {
    if (intervalDates.length > 0) {
      setSelectedTimeRange([0, intervalDates.length - 1]);
      setSliderValue([0, intervalDates.length - 1]);
    }
  }, [intervalDates]);

  useEffect(() => {
    // This function runs whenever the eurostatData is updated
    extractAndSetDataKeys();
  }, [eurostatData]);

  // useMemo to only recalculate when eurostatData changes
  const dataKeys = useMemo(() => {
    const keys = new Set();
    Object.values(eurostatData).forEach(({ dates }) => {
      Object.values(dates || {}).forEach((date) => {
        Object.keys(date).forEach(key => keys.add(key));
      });
    });
    return keys;
  }, [eurostatData]);

  // This effect sets the checkbox state when dataKeys changes
  useEffect(() => {
    setCheckboxStates(currentStates => {
      const newStates = { ...currentStates };
      dataKeys.forEach((key) => {
        if (currentStates[key] === undefined) {
          newStates[key] = true; // default new keys to true
        }
      });
      return newStates;
    });
  }, [dataKeys]);

  const extractAndSetDataKeys = () => {
    const allKeys = new Set();
    Object.values(eurostatData).forEach(cityData => {
      Object.values(cityData.dates || {}).forEach(dateData => {
        Object.keys(dateData).forEach(key => {
          allKeys.add(key);
        });
      });
    });

    // Create an object with keys and set them all to true initially
    const initialCheckboxState = {};
    allKeys.forEach(key => {
      initialCheckboxState[key] = true; // Set all checkboxes to checked by default
    });

    setCheckboxStates(initialCheckboxState);
  };

  const handleCheckboxChange = (key) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [key]: !prevStates[key], // Toggle the checkbox state
    }));
  };

  const updateMap = () => {

    if (!mapRef.current || !eurostatData || Object.keys(eurostatData).length === 0) {
      return;
    }

    const bounds = L.latLngBounds([]);
    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Circle) {
        layer.remove();
      }
    });

    Object.entries(eurostatData).forEach(([locationName, cityData]) => {
      const { coordinates, dates } = cityData;

      if (coordinates && dates) {
        Object.entries(dates).forEach(([date, dateData]) => {
          const dateTimestamp = new Date(date).getTime();
          if (
            dateTimestamp >= new Date(intervalDates[selectedTimeRange[0]]).getTime() &&
            dateTimestamp <= new Date(intervalDates[selectedTimeRange[1]]).getTime()
          ) {
            const radius = 10000;
            const circle = L.circle([coordinates.latitude, coordinates.longitude], {
              color: 'blue',
              fillColor: '#f03',
              fillOpacity: 0.5,
              radius: radius,
            }).addTo(mapRef.current);

            bounds.extend([coordinates.latitude, coordinates.longitude]);

            circle.on('click', () => {
              const selectedData = {};
              Object.entries(dates).forEach(([innerDate, dateInfo]) => {
                const innerDateTimestamp = new Date(innerDate).getTime();
                if (
                  innerDateTimestamp >= new Date(intervalDates[selectedTimeRange[0]]).getTime() &&
                  innerDateTimestamp <= new Date(intervalDates[selectedTimeRange[1]]).getTime()
                ) {
                  // Filter data based on checkbox states
                  const filteredDateInfo = Object.keys(dateInfo)
                    .filter(key => checkboxStates[key])
                    .reduce((obj, key) => {
                      obj[key] = dateInfo[key];
                      return obj;
                    }, {});
                  
                  if (Object.keys(filteredDateInfo).length > 0) {
                    selectedData[innerDate] = filteredDateInfo;
                  }
                }
              });

              if (Object.keys(selectedData).length > 0) {
                setClickedCircleData({
                  locationName: locationName,
                  data: selectedData,
                });
                setIsModalOpen(true);
              } else {
                console.warn('No data for selected dates or filters:', intervalDates[selectedTimeRange[0]], '-', intervalDates[selectedTimeRange[1]]);
              }
            });

          }
        });
      }
    });

    if (bounds.isValid()) {
      mapRef.current.fitBounds(bounds);
    }
  };

  const createArrays = () => {
    const uniqueLocationMap = {};
    const uniqueDateSet = new Set();
    const sixIntervalDateSet = new Set();

    Object.entries(eurostatData).forEach(([locationName, cityData]) => {
      const { coordinates, dates } = cityData;

      if (coordinates) {
        uniqueLocationMap[locationName] = coordinates;
      }

      if (dates) {
        Object.keys(dates).forEach(date => {
          uniqueDateSet.add(date);
        });
      }
    });

    const sortedDates = Array.from(uniqueDateSet).sort((a, b) => new Date(a) - new Date(b));
    const intervalSize = Math.ceil(sortedDates.length / 6);

    for (let i = 0; i < sortedDates.length; i += intervalSize) {
      sixIntervalDateSet.add(sortedDates[i]);
    }

    setTotalCoordinateCount(Object.keys(uniqueLocationMap).length);
    setUniqueLocations(uniqueLocationMap);
    setUniqueDates(Array.from(uniqueDateSet).sort());
    setIntervalDates(Array.from(sixIntervalDateSet).sort());
  };

  const handleSliderChange = (newTimeRange) => {
    setSelectedTimeRange(newTimeRange);
    setSliderValue(newTimeRange);
  };

  const ModalContent = () => {
    const [filteredData, setFilteredData] = useState({});

    useEffect(() => {
      if (clickedCircleData) {
        // Filter the clickedCircleData based on checkboxStates before setting it to state
        const dataFilteredByCheckboxes = Object.entries(clickedCircleData.data).reduce((acc, [date, values]) => {
          // Keep only the keys that are true in checkboxStates
          const filteredValues = Object.keys(values).reduce((accInner, key) => {
            if (checkboxStates[key]) {
              accInner[key] = values[key];
            }
            return accInner;
          }, {});

          if (Object.keys(filteredValues).length > 0) {
            acc[date] = filteredValues;
          }

          return acc;
        }, {});

        setFilteredData(dataFilteredByCheckboxes);
      }
    }, [clickedCircleData, checkboxStates]);

    if (!clickedCircleData) {
      return null;
    }

    return (
      <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Data Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Location: {clickedCircleData.locationName}</h5>
          <p>Date Range: {intervalDates[sliderValue[0]]} - {intervalDates[sliderValue[1]]}</p>
          {/* Display the filtered data */}
          <pre>{JSON.stringify(filteredData, null, 2)}</pre>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Container fluid className="App mt-5">
      <Row className="mt-3">
        <Col>
          {isMapDataReady ? (
            <CheckboxComponent
              dataKeys={Array.from(dataKeys)}
              checkboxStates={checkboxStates}
              handleCheckboxChange={handleCheckboxChange}
            />
          ) : (
            <p>Loading map data...</p>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <CityDataComponent
            onEurostatDataFetched={(data) => {
              setEurostatData(data);
              setIsLoading(false);
            }}
            checkboxStates={checkboxStates} // Pass the checkboxStates prop here
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Slider
            range
            min={0}
            max={intervalDates.length - 1}
            value={selectedTimeRange}
            onChange={handleSliderChange}
            marks={intervalDates.reduce((acc, date, index) => {
              acc[index] = date;
              return acc;
            }, {})}
            step={1}
          />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          {isLoading ? (
            <p>Loading Eurostat data...</p>
          ) : (
            <div id="map" style={{ height: '500px' }}></div>
          )}
        </Col>
      </Row>
      <ModalContent />
    </Container>
  );
}

export default App;
