import React from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import the hook


const MapLine = () => {
  const navigate = useNavigate(); // Initialize the hook

  // const navigate = useNavigate();

  // Define the two circles with their centers and radii
  const circle1 = {
    center: [41.0675, 28.804], // Center of first circle
    radius: 1500, // Reduced radius in meters
  };

  const circle2 = {
    center: [41.0575, 28.814], // Center of second circle
    radius: 1500, // Reduced radius in meters
  };

  const fetchCircle1Location = async () => {
    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_BACKEND}/api/getnewpath/67598e583e5e451ba95f8a42`
      );
      const data = await response.json();
      // console.log("Data:", data.location1.lat);
      if (data.location1 && data.location1.lat && data.location1.lng) {
        setCircle1({
          center: [data.location1.lat, data.location1.lng],
          radius: 1500, // Radius in meters
        });
      }
    } catch (error) {
      console.error("Error fetching location 1:", error);
    }
  };
  fetchCircle1Location();

  // Function to calculate the distance between two coordinates (Haversine formula)
  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;

    const lat1 = coords1[0];
    const lon1 = coords1[1];
    const lat2 = coords2[0];
    const lon2 = coords2[1];

    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance * 1000; // Convert to meters
  };

  // Check if circles overlap
  const distanceBetweenCenters = haversineDistance(
    circle1.center,
    circle2.center
  );
  const circlesOverlap =
    distanceBetweenCenters < circle1.radius + circle2.radius;

  return (
    <div className="w-full">
      <div className="h-[500px]">
        <MapContainer
          center={circle1.center}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full rounded-md shadow-lg"
        >
          {/* Map Tiles */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          {/* First Circle */}
          <Circle
            center={circle1.center}
            radius={circle1.radius}
            pathOptions={{
              color: "blue", // Border color
              weight: 1, // Reduced border weight
              fillColor: "blue", // Fill color
              fillOpacity: 0.3, // Transparency
            }}
          >
            <Popup>Project 1</Popup>
          </Circle>

          {/* Second Circle */}
          <Circle
            center={circle2.center}
            radius={circle2.radius}
            pathOptions={{
              color: circlesOverlap ? "red" : "green", // Red if overlap, otherwise green
              weight: 1, // Reduced border weight
              fillColor: circlesOverlap ? "red" : "green", // Red if overlap, otherwise green
              fillOpacity: 0.3, // Transparency
            }}
          >
            <Popup>Project 2</Popup>
          </Circle>

          {/* Conflict Indicator */}
          {circlesOverlap && (
            <Popup position={circle2.center}>
              <div className="text-red-500 font-bold">Conflict Detected!</div>
            </Popup>
          )}
        </MapContainer>
      </div>
      {/* Project Details Section */}
      {/* Project Details Section */}
{circlesOverlap && (
  <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
    <h2 className="text-lg font-semibold text-red-600">Conflict Details</h2>
    <p className="text-gray-700 mt-2">
      A conflict has been detected between <strong>Project 1</strong> and
      <strong> Project 2</strong>. The areas of operation overlap, which may
      require resolution.
    </p>
    <div className="mt-4">
      <h3 className="text-md font-bold text-gray-800">Project 1 Details:</h3>
      <p className="text-gray-700">Coordinates: {circle1.center.join(", ")}</p>
      <p className="text-gray-700">Radius: {circle1.radius} meters</p>
      <p className="text-gray-700">Department : Water Department</p>

    </div>
    <div className="mt-4">
      <h3 className="text-md font-bold text-gray-800">Project 2 Details:</h3>
      <p className="text-gray-700">Coordinates: {circle2.center.join(", ")}</p>
      <p className="text-gray-700">Department : Road Construction</p>
      <p className="text-gray-700">Radius: {circle2.radius} meters</p>
    </div>
    <button
      onClick={() => navigate("/chat")}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Communicate with Admin
    </button>
  </div>
)}

    </div>
  );
};

export default MapLine;


// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const MapLine = () => {
//   const [circle1, setCircle1] = useState(null);
//   // const circle2 = {
//   //   center: [41.0575, 28.814], // Default nearby location
//   //   radius: 1500, // Reduced radius in meters
//   // };

//   // Function to fetch location 1 from the API
//   const fetchCircle1Location = async () => {
//     try {
//       const response = await fetch(
//         "https://sangam-c2fm.onrender.com/api/getnewpath/67598e583e5e451ba95f8a42"
//       );
//       const data = await response.json();
//       if (data.location1 && data.location1.lat && data.location1.lng) {
//         setCircle1({
//           center: [data.location1.lat, data.location1.lng],
//           radius: 1500, // Radius in meters
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching location 1:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCircle1Location();
//   }, []);

//   // Function to calculate the distance between two coordinates (Haversine formula)
//   const haversineDistance = (coords1, coords2) => {
//     const toRad = (x) => (x * Math.PI) / 180;

//     const lat1 = coords1[0];
//     const lon1 = coords1[1];
//     const lat2 = coords2[0];
//     const lon2 = coords2[1];

//     const R = 6371; // Earth's radius in kilometers
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(lat1)) *
//         Math.cos(toRad(lat2)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c;
//     return distance * 1000; // Convert to meters
//   };

//   if (!circle1) {
//     return <div>Loading map...</div>;
//   }

//   // Check if circles overlap
//   const distanceBetweenCenters = haversineDistance(
//     circle1.center,
//   );
//   const circlesOverlap =
//     distanceBetweenCenters < circle1.radius + circle2.radius;

//   return (
//     <div className="w-full">
//       <div className="h-[500px]">
//         <MapContainer
//           center={circle1.center}
//           zoom={13}
//           scrollWheelZoom={false}
//           className="w-full h-full rounded-md shadow-lg"
//         >
//           {/* Map Tiles */}
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="&copy; OpenStreetMap contributors"
//           />

//           {/* First Circle */}
//           <Circle
//             center={circle1.center}
//             radius={circle1.radius}
//             pathOptions={{
//               color: "blue", // Border color
//               weight: 1, // Reduced border weight
//               fillColor: "blue", // Fill color
//               fillOpacity: 0.3, // Transparency
//             }}
//           >
//             <Popup>Project 1</Popup>
//           </Circle>

//           {/* Second Circle */}
//           {/* <Circle
//             center={circle2.center}
//             radius={circle2.radius}
//             pathOptions={{
//               color: circlesOverlap ? "red" : "green", // Red if overlap, otherwise green
//               weight: 1, // Reduced border weight
//               fillColor: circlesOverlap ? "red" : "green", // Red if overlap, otherwise green
//               fillOpacity: 0.3, // Transparency
//             }}
//           >
//             <Popup>Project 2</Popup>
//           </Circle> */}

//           {/* Conflict Indicator */}
//           {circlesOverlap && (
//             <Popup position={circle2.center}>
//               <div className="text-red-500 font-bold">Conflict Detected!</div>
//             </Popup>
//           )}
//         </MapContainer>
//       </div>
//       {/* Project Details Section */}
//       {circlesOverlap && (
//         <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
//           <h2 className="text-lg font-semibold text-red-600">Conflict Details</h2>
//           <p className="text-gray-700 mt-2">
//             A conflict has been detected between <strong>Project 1</strong> and
//             <strong> Project 2</strong>. The areas of operation overlap, which may
//             require resolution.
//           </p>
//           <button
//             onClick={() => alert("Contacting the admin...")}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Communicate with Admin
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapLine;

