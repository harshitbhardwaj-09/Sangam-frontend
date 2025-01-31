import  { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, useMap } from 'react-leaflet';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat'; 
import { Button, Box, Typography, Container, Card, CardContent, Switch } from '@mui/material';
import { Share } from '@mui/icons-material';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY; 

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

MapController.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};


function Gis() {
  const [savedPaths, setSavedPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([28.674855, 77.503005]);
  const [zoom] = useState(15);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const pathIndex = useRef(0); 
  useEffect(() => {
    if (currentLocation) {
      const fetchWeatherData = async () => {
        const [lat, lon] = currentLocation;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          const data = await response.json();
          setWeather(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          alert('Failed to load weather data. Please try again later.');
        }
      };
      fetchWeatherData();
    }
  }, [currentLocation]);

  useEffect(() => {
    const paths = JSON.parse(localStorage.getItem('savedPaths')) || [];
    setSavedPaths(paths);
  }, []);

  useEffect(() => {
    if (currentLocation) {
      pathIndex.current = 0;
      setMarkerPosition(currentLocation);
    }
  }, [currentLocation]);

  const saveNewPath = (path, distance) => {
    const newPath = {
      path,
      timestamp: new Date().toISOString(),
      distance,
    };
    const updatedPaths = [...savedPaths, newPath];
    localStorage.setItem('savedPaths', JSON.stringify(updatedPaths));
    setSavedPaths(updatedPaths);
  };

  const calculateDistance = (path) => {
    if (path.length < 2) return 0;
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const [lat1, lon1] = path[i];
      const [lat2, lon2] = path[i + 1];
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      totalDistance += R * c;
    }
    return totalDistance;
  };
const startTracking = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = [position.coords.latitude, position.coords.longitude];
        setCurrentLocation(newLocation);
        setMapCenter(newLocation);
        setCurrentPath((prevPath) => {
          const updatedPath = [...prevPath, newLocation];
          return updatedPath;
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      { enableHighAccuracy: true, distanceFilter: 1 }
    );
  };

  const stopTrackingAndSave = () => {
    const distance = calculateDistance(currentPath);
    saveNewPath(currentPath, distance);
    setCurrentPath([]);
  };

  const animateMarker = () => {
    const intervalId = setInterval(() => {
      if (pathIndex.current < currentPath.length) {
        setMarkerPosition(currentPath[pathIndex.current]);
        pathIndex.current += 1;
      } else {
        clearInterval(intervalId);
      }
    }, 500);
  };

  const deletePath = (index) => {
    const updatedPaths = savedPaths.filter((_, idx) => idx !== index);
    localStorage.setItem('savedPaths', JSON.stringify(updatedPaths));
    setSavedPaths(updatedPaths);
  };

  const renderWeather = () => {
    if (!weather) return null;
    return (
      <Card>
        <CardContent>
          <Typography variant="h6">Weather Information</Typography>
          <Typography variant="body1">Temperature: {weather.main.temp}°C</Typography>
          <Typography variant="body1">Condition: {weather.weather[0].description}</Typography>
          <Typography variant="body1">Wind Speed: {weather.wind.speed} m/s</Typography>
        </CardContent>
      </Card>
    );
  };

  const sharePath = (pathData) => {
    const pathUrl = `https://www.google.com/maps?q=${pathData.path.map(([lat, lon]) => `${lat},${lon}`).join('&')}`;
    if (navigator.share) {
      navigator.share({
        title: 'My Path Tracker',
        text: `Check out my tracked path:`,
        url: pathUrl,
      });
    } else {
      alert('Sharing is not supported in your browser. Copy this link to share: ' + pathUrl);
    }
  };

  // Add heatmap after the map is initialized
  const MapWithHeatmap = () => {
    const map = useMap();
    useEffect(() => {
      if (currentPath.length > 1) {
        const heatLayer = L.heatLayer(currentPath, { radius: 25, blur: 15 });
        heatLayer.addTo(map);
        return () => map.removeLayer(heatLayer);
      }
    }, [map]);

    return null;
  };


  return (
    <div style={{ backgroundColor: darkMode ? '#101114' : '#fff', color: darkMode ? '#fff' : '#000' }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" style={{ margin: '40px 0px' }}>
          Path Tracker
        </Typography>

        <Box display="flex" justifyContent="center" gap="20px" marginBottom="20px">
          <Button variant="contained" color="success" onClick={() => { startTracking(); animateMarker(); }}>
            Start Tracking
          </Button>
          <Button variant="contained" color="error" onClick={stopTrackingAndSave}>
            Stop and Save Path
          </Button>
        </Box>

        {renderWeather()}

        <Box display="flex" justifyContent="flex-end" marginBottom="20px">
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} color="default" />
          <Typography variant="body1" style={{ marginLeft: '10px' }}>
            Dark Mode
          </Typography>
        </Box>

        <Box marginBottom="20px">
          {savedPaths.map((pathData, index) => (
            <Card key={pathData.timestamp} style={{ marginBottom: '20px' }}>
              <CardContent>
                <Typography variant="h6">Path {index + 1}</Typography>
                <Typography variant="body2">Date: {pathData.timestamp}</Typography>
                <Typography variant="body2">Distance: {pathData.distance.toFixed(2)} km</Typography>
                <Box marginTop="10px">
                  <Button
                    startIcon={<Share />}
                    onClick={() => sharePath(pathData)}
                    variant="outlined"
                    color="primary"
                  >
                    Share Path
                  </Button>
                  <Button
                    onClick={() => deletePath(index)}
                    variant="outlined"
                    color="secondary"
                    style={{ marginLeft: '10px' }}
                  >
                    Delete Path
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <MapContainer center={mapCenter} zoom={zoom} style={{ height: '500px', width: '100%' }}>
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {savedPaths.map((pathData) => (
            <Polyline key={pathData.timestamp} positions={pathData.path} color="blue" />
          ))}
          {currentPath.length > 1 && <Polyline positions={currentPath} color="green" />}
          {markerPosition && (
            <Marker position={markerPosition} icon={L.divIcon({ className: 'leaflet-div-icon', html: '<div style="background-color:red;width:20px;height:20px;border-radius:50%;"></div>' })}>
              <div />
            </Marker>
          )}
          <MapWithHeatmap />
          <MapController center={mapCenter} zoom={zoom} />
        </MapContainer>
      </Container>
    </div>
  );
}

export default Gis;
