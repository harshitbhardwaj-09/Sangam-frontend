import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";


const paths = [
  {
    name: "Path 1",
    coordinates: [
      [37.7749, -122.4194],
      [37.77595, -122.4215],
    ],
    length: 0.47, // Length in KM
  },
  {
    name: "Path 2",
    coordinates: [
      [37.7749, -122.4194],
      [37.7735, -122.4180],
      [37.7725, -122.4175],
    ],
    length: 0.5,
  },
  {
    name: "Path 3",
    coordinates: [
      [37.7749, -122.4194],
      [37.7730, -122.4170],
      [37.7720, -122.4160],
    ],
    length: 0.6,
  },
];


const Gis = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedPathIndex, setSelectedPathIndex] = useState(0); // Selected path
  const [completedDistance, setCompletedDistance] = useState(0); // Completed distance
  const [totalDistance, setTotalDistance] = useState(paths[0].length); // Total distance of selected path


  useEffect(() => {
    setCurrentLocation([37.775, -122.4196]); // Example current location
  }, []);


  const handleMouseOver = (projectId, conflict) => {
    setHoverInfo({ projectId, conflict });
  };


  const handleMouseOut = () => {
    setHoverInfo(null);
  };


  const handleIncrease = () => {
    if (completedDistance < totalDistance) {
      setCompletedDistance(prev => Math.min(prev + 0.05, totalDistance)); // Increase by 0.05 km
    }
  };


  const handleDecrease = () => {
    if (completedDistance > 0) {
      setCompletedDistance(prev => Math.max(prev - 0.05, 0)); // Decrease by 0.05 km
    }
  };


  const calculateProgress = () => {
    return (completedDistance / totalDistance) * 100;
  };


  const handlePathChange = (e) => {
    const selectedIndex = e.target.value;
    setSelectedPathIndex(selectedIndex);
    setCompletedDistance(0); // Reset completed distance when path changes
    setTotalDistance(paths[selectedIndex].length);
  };


  return (
    <div className="h-screen w-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-center text-3xl font-bold shadow-md">
        Navigate Path
      </header>


      {/* Path Selection Dropdown */}
      <div className="flex justify-center p-6 bg-gray-800">
        <select
          className="bg-gray-900 text-white p-2 rounded-lg"
          onChange={handlePathChange}
          value={selectedPathIndex}
        >
          {paths.map((path, index) => (
            <option key={index} value={index}>
              {path.name}
            </option>
          ))}
        </select>
      </div>


      {/* Progress Section */}
      <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-800">
        <div className="flex flex-col items-center bg-gray-900 p-4 rounded-lg shadow-md w-72">
          <h3 className="text-lg font-bold text-purple-400">Project Progress</h3>
          <div className="relative w-24 h-24 mt-4">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                className="text-gray-700"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-purple-500"
                strokeWidth="3"
                strokeDasharray={`${(calculateProgress() * 31.831) / 100}, 31.831`}
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">{Math.round(calculateProgress())}%</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md w-72 hover:scale-105 transition-transform">
          <h3 className="text-lg font-bold text-green-400">Completed</h3>
          <p className="mt-2 text-6xl">{completedDistance.toFixed(2)} KM</p>
          <button onClick={handleIncrease} className="bg-green-500 text-white p-2 mt-4 rounded">Increase</button>
          <button onClick={handleDecrease} className="bg-red-500 text-white p-2 mt-4 rounded">Decrease</button>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md w-72 hover:scale-105 transition-transform">
          <h3 className="text-lg font-bold text-blue-400">Total Path</h3>
          <p className="mt-2 text-6xl">{totalDistance} KM</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md w-72 hover:scale-105 transition-transform">
          <h3 className="text-lg font-bold text-orange-400">Remaining</h3>
          <p className="mt-2 text-6xl">{(totalDistance - completedDistance).toFixed(2)} KM</p>
        </div>
      </div>


      {/* Map Section */}
      <div className="flex-1 relative">
        <MapContainer
          center={paths[selectedPathIndex].coordinates[0]}
          zoom={15}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />


          {/* Polyline for selected path */}
          <Polyline
            positions={paths[selectedPathIndex].coordinates}
            color="blue"
            weight={6}
            opacity={0.7}
            eventHandlers={{
              mouseover: () =>
                handleMouseOver("ProjectID-001", "Conflict with ProjectID-002"),
              mouseout: handleMouseOut,
            }}
          />


          {/* Polyline for completed path */}
          <Polyline
            positions={paths[selectedPathIndex].coordinates.slice(0, Math.ceil(completedDistance / totalDistance * paths[selectedPathIndex].coordinates.length))}
            color="green"
            weight={6}
            opacity={0.7}
            eventHandlers={{
              mouseover: () => handleMouseOver("ProjectID-002", "No conflicts"),
              mouseout: handleMouseOut,
            }}
          />


          {/* Marker for current location */}
          {currentLocation && (
            <Marker position={currentLocation}></Marker>
          )}


          {/* Display hover information */}
          {hoverInfo && (
            <Popup position={paths[selectedPathIndex].coordinates[0]}>
              <div>
                <p>
                  <strong>Project ID:</strong> {hoverInfo.projectId}
                </p>
                <p>
                  <strong>Conflict:</strong> {hoverInfo.conflict}
                </p>
              </div>
            </Popup>
          )}
        </MapContainer>


        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2">Legend</h3>
          <p className="text-sm">
            <span className="inline-block w-4 h-4 bg-blue-500 mr-2"></span> Total Path
          </p>
          <p className="text-sm">
            <span className="inline-block w-4 h-4 bg-green-500 mr-2"></span> Completed Path
          </p>
        </div>
      </div>
    </div>
  );
};


export default Gis;


