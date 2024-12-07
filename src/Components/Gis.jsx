import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Typography, Switch, Box } from "@mui/material";

const WEATHER_API_KEY = "1274d7780f57033ed9118ea96db99182";

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function Gis() {
  const [savedPaths, setSavedPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([28.674855, 77.503005]);
  const [zoom, setZoom] = useState(15);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const pathIndex = useRef(0); // Keeps track of the index of the current position in the path

  // Load saved paths from localStorage on component mount
  useEffect(() => {
    const paths = JSON.parse(localStorage.getItem("savedPaths")) || [];
    console.log("Loaded paths from localStorage: ", paths); // Debugging log
    setSavedPaths(paths);
  }, []);

  // Update marker position whenever currentLocation changes
  useEffect(() => {
    if (currentLocation) {
      pathIndex.current = 0; // Reset index each time location is updated
      setMarkerPosition(currentLocation);
    }
  }, [currentLocation]);

  const startTracking = () => {
    navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = [position.coords.latitude, position.coords.longitude];
        setCurrentLocation(newLocation);
        setMapCenter(newLocation);
        setCurrentPath((prevPath) => [...prevPath, newLocation]);
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true, distanceFilter: 1 }
    );
  };

  const stopTrackingAndSave = () => {
    const distance = calculateDistance(currentPath);
    saveNewPath(currentPath, distance);
    setCurrentPath([]); // Clear current path after saving
  };

  const saveNewPath = (path, distance) => {
    const newPath = {
      path,
      timestamp: new Date().toISOString(),
      distance,
    };
    const updatedPaths = [...savedPaths, newPath];
    console.log("Saving new path: ", updatedPaths); // Debugging log
    localStorage.setItem("savedPaths", JSON.stringify(updatedPaths));
    setSavedPaths(updatedPaths);
  };

  const calculateDistance = (path) => {
    if (path.length < 2) return 0;
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const [lat1, lon1] = path[i];
      const [lat2, lon2] = path[i + 1];
      const R = 6371; // Radius of Earth in km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      totalDistance += R * c; // Distance in km
    }
    return totalDistance;
  };

  const deletePath = (index) => {
    const updatedPaths = savedPaths.filter((_, idx) => idx !== index);
    localStorage.setItem("savedPaths", JSON.stringify(updatedPaths));
    setSavedPaths(updatedPaths);
  };

  const animateMarker = () => {
    const intervalId = setInterval(() => {
      if (pathIndex.current < currentPath.length) {
        setMarkerPosition(currentPath[pathIndex.current]);
        pathIndex.current += 1;
      } else {
        clearInterval(intervalId); // Stop the animation when the path is complete
      }
    }, 500); // Move marker every 500ms
  };

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100vh" }}>
      {/* Overlay Controls */}
      <Box
        sx={{
          position: "absolute",
          zIndex: 1000,
          top: 10,
          left: 10,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: 2,
          padding: 2,
          maxWidth: 200,
          width: "auto",
        }}
      >
        <Typography variant="h6">Controls</Typography>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          color="default"
        />
        <Typography variant="body1">Dark Mode</Typography>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            startTracking();
            animateMarker();
          }}
          style={{ marginTop: 10 }}
        >
          Start Tracking
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={stopTrackingAndSave}
          style={{ marginTop: 10 }}
        >
          Stop and Save Path
        </Button>
      </Box>

      {/* Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <TileLayer
          url={
            darkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />
        {/* Render saved paths */}
        {savedPaths.map((pathData, index) => (
          <Polyline key={pathData.timestamp} positions={pathData.path} color="blue" />
        ))}
        {/* Render current path being tracked */}
        {currentPath.length > 1 && <Polyline positions={currentPath} color="green" />}
        {/* Render current marker position */}
        {markerPosition && <Marker position={markerPosition}></Marker>}
        <MapController center={mapCenter} zoom={zoom} />
      </MapContainer>
    </Box>
  );
}

export default Gis;


// import React, { useEffect } from "react";
// import { Viewer, createWorldTerrain, Ion } from "cesium";
// import "cesium/Build/Cesium/Widgets/widgets.css";
// import "./Cesium.css"; // Add this for styling the Cesium container

// // Set your Cesium API key (Replace YOUR_CESIUM_ION_KEY with your actual key)
// Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZGQyMjJiMC0xNTAzLTQ4NGEtODU1OS02YTJmOThhM2Q3ODUiLCJpZCI6MjU5NDQ5LCJpYXQiOjE3MzMxNDIyMTF9.tpgLi_m3rSBh5NGii-n0-Q-oJo-QhcQOPWEGjO8nwMw";

// function Gis3D() {
//   useEffect(() => {
//     // Create the Cesium viewer
//     const viewer = new Viewer("cesiumContainer", {
//       terrainProvider: createWorldTerrain(),
//       imageryProvider: false, // Turn off default imagery provider
//       baseLayerPicker: true, // Enable base layer selection
//       animation: false,
//       timeline: false,
//     });

//     // Add custom imagery if needed
//     viewer.imageryLayers.addImageryProvider(
//       new Cesium.UrlTemplateImageryProvider({
//         url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//         subdomains: ["a", "b", "c"],
//       })
//     );

//     // Clean up the viewer when component unmounts
//     return () => {
//       viewer.destroy();
//     };
//   }, []);

//   return (
//     <div
//       id="cesiumContainer"
//       style={{ height: "100vh", width: "100vw", margin: 0 }}
//     ></div>
//   );
// }

// export default Gis3D;
