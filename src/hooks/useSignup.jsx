import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { message } from "antd";

const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Register a user
  const registerUser = async (values) => {
    setError(null); // Clear existing error
  
    if (values.password !== values.passwordConfirm) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      setLoading(true);
    
      const res = await fetch("https://backend-code-5-2tsr.onrender.com/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
    
      // Log all details of the response
      console.log("Response Status:", res.status);
      console.log("Response Headers:", Array.from(res.headers.entries()));
    
      // Read and log the raw response body
      const rawResponse = await res.text();
      console.log("Raw Response Body:", rawResponse);
    
      // Attempt to parse JSON if the status is okay
      if (res.ok) {
        const data = JSON.parse(rawResponse);
        console.log("Parsed JSON:", data);
    
        if (res.status === 201) {
          message.success(data.message);
          login(data.token, data.user);
        } else {
          setError(data.message || "Registration failed");
        }
      } else {
        throw new Error(`Error ${res.status}: ${rawResponse}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    error,
    registerUser,
    clearError: () => setError(null), // Expose this method
  }; // Expose this method
};

export default useSignup;
