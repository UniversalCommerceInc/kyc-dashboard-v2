import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../features/api/adminApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { persistor } from "../store"; 
import toast from "react-hot-toast";
import logo from "../assets/logo.png";
import bgImage from "../assets/bg.jpg"; // Replace with your preferred background image

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(false); // State for showing the loader
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log in the user
      const userData = await login({ login: email, password }).unwrap();
      dispatch(setCredentials(userData));
      await persistor.flush();
      setError(null);

      // Show loader briefly before navigating
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        navigate("/dashboard", { replace: true }); // Redirect to the dashboard after successful login
      }, 1000);
    } catch (err) {
      setError(err?.data?.message || "Something went wrong");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 z-50">
          <div className="flex flex-col items-center">
            <div className="loader border-t-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
            <p className="mt-4 text-white font-semibold">Processing...</p>
          </div>
        </div>
      )}
      <div className="w-full max-w-md p-8 bg-gradient-to-br from-white to-gray-50 bg-opacity-95 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Universal KYC Logo"
            className="h-24 w-24"
          />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Sign in to access your Universal KYC dashboard.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-700 font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-lg transition duration-300 ${
              isLoading || showLoader
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700"
            }`}
            disabled={isLoading || showLoader}
          >
            {isLoading || showLoader ? "Processing..." : "Sign In"}
          </button>
          {/* <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <button
              className="text-blue-600 hover:underline font-medium"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </p> */}
        </form>
      </div>
    </div>
  );
}

export default SignIn;
