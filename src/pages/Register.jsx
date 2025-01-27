import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios for making HTTP requests
import photo from "../assets/register.png"; // Update path if necessary
// import loginpage from './LoginPage';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    role: "",
    department: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
//   console.log(formData);

  // Handle form submission
  const handleRegister = async (event) => {
    event.preventDefault();
    
    // Simple validation for password match
    // if (formData.password !== formData.confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }

    setLoading(true);
    setError(""); // Clear any previous errors

    try {
        console.log("Payload:", formData);
        const response = await axios.post(
            "https://sangam-c2fm.onrender.com/admin/register",
            formData,
            {
              headers: {
                "Content-Type": "application/json", // Ensure the backend understands it's JSON
              },
            }
          );
          
      console.log(response)

      setLoading(false);
      if (response.status === 201) {
        // If registration is successful, navigate to login page
        alert("Account Created Successfully")
        navigate("/loginn");
      }
    } catch (error) {
      setLoading(false);
      setError("Registration failed. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
  <form
    onSubmit={handleRegister}
    className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl"
  >
    

    {/* left Section with Form */}
    <div className="flex flex-col flex-1 p-10 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Create an Account
      </h2>
      <p className="text-center text-gray-600">
        Join now and enjoy exclusive access!
      </p>

      {/* Error Message */}
      {error && (
        <div className="mb-4 text-red-500 text-center font-semibold">
          {error}
        </div>
      )}

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your Full Name"
            required
          />
        </div>

        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your Username"
            required
          />
        </div>

        {/* Email Address */}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your Email"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your Password"
            required
          />
        </div>

        {/* Department */}
        <div>
          <label
            htmlFor="department"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select your Department</option>
            <option value="Water">Water</option>
            <option value="Gas">Gas</option>
            <option value="Road Construction">Road Construction</option>
          </select>
        </div>

        {/* Register As */}
        <div>
          <label
            htmlFor="role"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            Register As
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select your Role</option>
            <option value="Main Admin">Admin</option>
            <option value="Officer">Officer</option>
            <option value="Worker">Worker</option>
          </select>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex flex-col space-y-4">
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/loginn")}
          className="w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Already have an account? Login
        </button>
      </div>
    </div>
    {/* Right Section with Illustration */}
    <div className="flex items-center justify-center bg-gray-100 p-5">
      <img
        src={photo}
        alt="Register Illustration"
        className="w-50 md:w-60"
      />
    </div>
  </form>
</div>

  );
};

export default Register;
