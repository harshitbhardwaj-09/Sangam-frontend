// components/GoogleMapsLoader.jsx
import { useEffect } from "react";

const GoogleMapsLoader = () => {
  useEffect(() => {
    // Create the script tag for the Google Maps API
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;

    // Append the script to the document head
    document.head.appendChild(googleMapsScript);

    // Cleanup: Remove the script when the component is unmounted
    return () => {
      document.head.removeChild(googleMapsScript);
    };
  }, []);

  return null; // No UI to render
};

export default GoogleMapsLoader;
