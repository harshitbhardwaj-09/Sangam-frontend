// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Polyline } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const CompletedPath = () => {
//   const [coordinates, setCoordinates] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           'https://sangam-c2fm.onrender.com/api/getcompletedpathbyid/6749b789545dcca89c35d67a' 
//         );
//         const data = await response.json();
//         const pathData = data.completedPath[0];
//         const allCoordinates = pathData.points.map(point => [point.lat, point.lng]);
//         setCoordinates(allCoordinates); 
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4 mt-4 text-black ">Completed Path</h1>
//       <div className="grid grid-cols-3 gap-4">
//         {coordinates.map(([lat, lng], index) => { 
//           if ((index + 1) % 3 === 0) {
//             return (
//               <div 
//                 key={index} 
//                 className="bg-gray-100 p-2 rounded-md flex items-center"
//               >
//                 <span className="text-gray-700 mr-2">
//                   Lat: {lat}, Lng: {lng} 
//                 </span>
//               </div>
//             );
//           } else {
//             return (
//               <div 
//                 key={index} 
//                 className="bg-blue-50 p-2 rounded-md flex items-center"
//               >
//                 <span className="text-blue-700 mr-2">
//                   Lat: {lat}, Lng: {lng} 
//                 </span>
//               </div>
//             );
//           }
//         })}
//       </div>

//       <div className="h-96"> {/* Adjust height as needed */}
//         <MapContainer 
//           center={coordinates[0]} 
//           zoom={15} 
//           scrollWheelZoom={true} 
//           style={{ height: '100%' }} 
//         >
//           <TileLayer 
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
//           />

//           {coordinates.length > 0 && ( 
//             <Polyline 
//               positions={coordinates} 
//               color="green" 
//               weight={6} 
//               opacity={0.7} 
//             />
//           )}
//         </MapContainer>
//       </div>
//     </div>
//   );
// }

// export default CompletedPath;


import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CompletedPath = () => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://sangam-c2fm.onrender.com/api/getcompletedpathbyid/6749b789545dcca89c35d67a' 
        );
        const data = await response.json();
        const pathData = data.completedPath[0];
        const allCoordinates = pathData.points.map(point => [point.lat, point.lng]);
        setCoordinates(allCoordinates); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 mt-4 text-black ">Completed Path</h1>
      <div className="grid grid-cols-3 gap-4">
        {coordinates.map(([lat, lng], index) => { 
          if ((index + 1) % 3 === 0) {
            return (
              <div 
                key={index} 
                className="bg-gray-100 p-2 rounded-md flex items-center"
              >
                <span className="text-gray-700 mr-2">
                  Lat: {lat}, Lng: {lng} 
                </span>
              </div>
            );
          } else {
            return (
              <div 
                key={index} 
                className="bg-blue-50 p-2 rounded-md flex items-center"
              >
                <span className="text-blue-700 mr-2">
                  Lat: {lat}, Lng: {lng} 
                </span>
              </div>
            );
          }
        })}
      </div>

      <div className="h-96"> {/* Adjust height as needed */}
        <MapContainer 
          center={[37.7749, -122.4194]} // Default center (replace with a suitable default)
          zoom={15} 
          scrollWheelZoom={true} 
          style={{ height: '100%' }} 
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />

          {coordinates.length > 0 && ( 
            <Polyline 
              positions={coordinates} 
              color="green" 
              weight={6} 
              opacity={0.7} 
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default CompletedPath;