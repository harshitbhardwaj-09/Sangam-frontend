import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Navigate,useNavigate } from "react-router-dom";

const MapNew = () => {
    const [circle1, setCircle1] = useState(null);
    const [circle2, setCircle2] = useState(null);
    const [circle3, setCircle3] = useState(null);
    const [circle2Input, setCircle2Input] = useState({
        lat: "",
        lng: "",
    });
    const navigate = useNavigate(); // Initialize the hook


    // Fetch location for Circle 1 and Circle 3 from the API
    const fetchCircleLocations = async () => {
        try {
            const response1 = await fetch(
                "https://sangam-c2fm.onrender.com/api/getnewpath/67598e583e5e451ba95f8a42"
            );
            const data1 = await response1.json();
            //   console.log(data1.location2.lat, data1.location2.lng);
            //   console.log(data1.location1.lat, data1.location1.lng);

            if (data1.location1 && data1.location1.lat && data1.location1.lng) {
                setCircle3({
                    //   center: [data1.location1.lat, data1.location1.lng],
                    center: [28.669081, 77.430412],
                    radius: 1500, // Fixed radius
                });
            }
            if (data1.location2 && data1.location2.lat && data1.location2.lng) {
                setCircle1({
                    //   center: [data1.location2.lat, data1.location2.lng],
                    center: [28.409880, 77.870697],
                    radius: 1500, // Fixed radius
                });
            }
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    useEffect(() => {
        fetchCircleLocations();
    }, []);

    console.log(circle1, circle2, circle3);

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

    // Handle input changes for Circle 2
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCircle2Input((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission to set Circle 2
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { lat, lng } = circle2Input;
        setCircle2({
            center: [parseFloat(lat), parseFloat(lng)],
            radius: 1500, // Fixed radius
        });
    };

    if (!circle1 || !circle3) {
        return <div>Loading map...</div>;
    }

    // Check if circles overlap (using haversineDistance for each pair of circles)
    const distanceBetweenCircle1AndCircle2 =
        circle2 && haversineDistance(circle1.center, circle2.center);
    const distanceBetweenCircle1AndCircle3 =
        circle3 && haversineDistance(circle1.center, circle3.center);
    const distanceBetweenCircle2AndCircle3 =
        circle2 && circle3 && haversineDistance(circle2.center, circle3.center);

    const overlapCircle1AndCircle2 =
        circle2 && distanceBetweenCircle1AndCircle2 < circle1.radius + circle2.radius;
    const overlapCircle1AndCircle3 =
        circle3 && distanceBetweenCircle1AndCircle3 < circle1.radius + circle3.radius;
    const overlapCircle2AndCircle3 =
        circle2 && circle3 && distanceBetweenCircle2AndCircle3 < circle2.radius + circle3.radius;

    // Dynamically set the map center, or set Circle 1 as default
    const mapCenter = circle1 ? circle1.center : [0, 0];

    return (
        <div className="w-full mt-6">
            {/* Input Section for Circle 2 */}
            <div className="p-4 bg-gray-100 rounded-lg shadow mb-4">
                <h2 className="text-lg font-semibold mb-2">Check New Project Conflicts</h2>
                <form onSubmit={handleFormSubmit} className="space-y-2">
                    <div>
                        <label className="block mb-1 font-medium">Latitude:</label>
                        <input
                            type="text"
                            name="lat"
                            placeholder="Enter latitude"
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Longitude:</label>
                        <input
                            type="text"
                            name="lng"
                            placeholder="Enter longitude"
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Map Section */}
            <div className="h-[500px] mb-4">
                <MapContainer
                    center={mapCenter} // Dynamically center the map
                    zoom={13}
                    scrollWheelZoom={false}
                    className="w-full h-full rounded-md shadow-lg"
                >
                    {/* Map Tiles */}
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; OpenStreetMap contributors"
                    />

                    {/* Circle 1 */}
                    <Circle
                        center={circle1.center}
                        radius={circle1.radius}
                        pathOptions={{
                            color: "blue",
                            weight: 2,
                            fillColor: "blue",
                            fillOpacity: 0.2,
                        }}
                    >
                        <Popup>Project 1</Popup>
                    </Circle>

                    {/* Circle 2 */}
                    {circle2 && (
                        <Circle
                            center={circle2.center}
                            radius={circle2.radius}
                            pathOptions={{
                                color: overlapCircle1AndCircle2 ? "red" : "green", // Red if conflict, Green otherwise
                                weight: 2,
                                fillColor: overlapCircle1AndCircle2 ? "red" : "green",
                                fillOpacity: 0.2,
                            }}
                        >
                            <Popup>Project 2</Popup>
                        </Circle>
                    )}

                    {/* Circle 3 (No Input, just fetched) */}
                    {circle3 && (
                        <Circle
                            center={circle3.center}
                            radius={circle3.radius}
                            pathOptions={{
                                color: overlapCircle1AndCircle3 || overlapCircle2AndCircle3 ? "red" : "green", // Red if conflict
                                weight: 2,
                                fillColor: overlapCircle1AndCircle3 || overlapCircle2AndCircle3 ? "red" : "green",
                                fillOpacity: 0.2,
                            }}
                        >
                            <Popup>Project 3</Popup>
                        </Circle>
                    )}
                </MapContainer>
            </div>

            {/* Conflict Details Section */}
            {overlapCircle1AndCircle2 || overlapCircle1AndCircle3 || overlapCircle2AndCircle3 ? (
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-red-600">Conflict Details</h2>
                    <p className="text-gray-700 mt-2">
                        There is a conflict between the projects. Please review the overlap of the areas.
                    </p>

                    {/* Project Information */}
                    <div className="mt-4">
                        <p className="font-medium">Project ID: <span className="font-semibold">12345</span></p>
                        <p className="font-medium">Department ID: <span className="font-semibold">56789</span></p>
                    </div>

                    {/* Contact Button */}
                    <div className="mt-4">
                        <button
                            onClick={() => navigate("/chat")}
                            className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Contact Project Admin
                        </button>
                    </div>
                </div>
            ) : (
                circle2 && circle3 && (
                    <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg shadow">
                        <h2 className="text-lg font-semibold text-green-600">No Conflict</h2>
                        <p className="text-gray-700 mt-2">
                            There is no conflict detected between the areas of the projects.
                        </p>

                        {/* Project Information */}
                        <div className="mt-4">
                            <p className="font-medium">Project ID: <span className="font-semibold">12345</span></p>
                            <p className="font-medium">Project Name: <span className="font-semibold">Road Construction</span></p>
                            <p className="font-medium">Department Name: <span className="font-semibold">Road Department</span></p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default MapNew;
