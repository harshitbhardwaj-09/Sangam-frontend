import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Gis = () => {
  const [currentLocation, setCurrentLocation] = useState([37.775, -122.4196]); // Default current location
  const [hoverInfo, setHoverInfo] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(0); // Index of selected coordinates
  const [coordinatesList] = useState([
    {
      id: "ProjectID-001",
      path: [
        [37.7749, -122.4194],
        [37.77595, -122.4215],
      ],
      conflict: "Conflict with ProjectID-002",
    },
    {
      id: "ProjectID-002",
      path: [
        [37.7769, -122.4184],
        [37.7765, -122.4196],
      ],
      conflict: "No conflicts",
    },
    {
      id: "ProjectID-003",
      path: [
        [37.7739, -122.4180],
        [37.7741, -122.4190],
      ],
      conflict: "Conflict with ProjectID-004",
    },
    {
      id: "ProjectID-004",
      path: [
        [37.7753, -122.4200],
        [37.7756, -122.4210],
      ],
      conflict: "No conflicts",
    },
  ]);

  useEffect(() => {
    // Simulate fetching current location if required
    setCurrentLocation([37.775, -122.4196]); // Set current location to default value for now
  }, []);

  const handleMouseOver = (projectId, conflict) => {
    setHoverInfo({ projectId, conflict });
  };

  const handleMouseOut = () => {
    setHoverInfo(null);
  };

  const handleCoordinateSelect = (index) => {
    setSelectedCoordinates(index);
  };

  return (
    <div className="h-screen w-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-center text-3xl font-bold shadow-md">
        Navigate Path
      </header>

      {/* Dropdown to Select Coordinates */}
      <div className="flex justify-center p-4 bg-gray-800">
        <select
          onChange={(e) => handleCoordinateSelect(parseInt(e.target.value))}
          className="bg-gray-900 text-white p-2 rounded-md"
        >
          {coordinatesList.map((coordinate, index) => (
            <option key={coordinate.id} value={index}>
              {coordinate.id} - {coordinate.conflict}
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
                strokeDasharray="44, 100"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">44%</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md w-72 hover:scale-105 transition-transform">
          <h3 className="text-lg font-bold text-green-400">Completed</h3>
          <p className="mt-2 text-6xl">0.21 KM</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md w-72 hover:scale-105 transition-transform">
          <h3 className="text-lg font-bold text-blue-400">Total Path</h3>
          <p className="mt-2 text-6xl">0.47 KM</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-md w-72 hover:scale-105 transition-transform">
          <h3 className="text-lg font-bold text-orange-400">Remaining</h3>
          <p className="mt-2 text-6xl">0.26 KM</p>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex-1 relative">
        <MapContainer
          center={currentLocation}
          zoom={15}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* Polyline for selected path */}
          <Polyline
            positions={coordinatesList[selectedCoordinates].path}
            color="blue"
            weight={6}
            opacity={0.7}
            eventHandlers={{
              mouseover: () =>
                handleMouseOver(coordinatesList[selectedCoordinates].id, coordinatesList[selectedCoordinates].conflict),
              mouseout: handleMouseOut,
            }}
          />

          {/* Marker for current location */}
          {currentLocation && (
            <Marker position={currentLocation}></Marker>
          )}

          {/* Display hover information */}
          {hoverInfo && (
            <Popup position={coordinatesList[selectedCoordinates].path[0]}>
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
            <span className="inline-block w-4 h-4 bg-blue-500 mr-2"></span> Selected Path
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gis;
