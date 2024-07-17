import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const registrationSuccess = location.state?.registrationSuccess;

  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    if (registrationSuccess) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000); // Hide toast after 5 seconds
    }
  }, [registrationSuccess]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send login request to the backend API
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      // Extract user ID from response
      const { token } = response.data;
      // Pass token, role, and user ID to login function
      login(token);
      // Redirect to Dashboard after successful login
      navigate("/Dashboard");
    } catch (error) {
      console.error("Login error", error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <section className="h-screen relative">
      {/* Toast message */}
      {showToast && (
        <div className="bg-green-500 text-white p-4 absolute top-10 left-1/2 transform -translate-x-1/2 z-50 text-center rounded-md">
          Registration successful! You can now log in.
        </div>
      )}
      {/* Error message */}
      {errorMessage && (
        <div className="bg-red-500 text-white p-4 absolute top-10 left-1/2 transform -translate-x-1/2 z-50 text-center rounded-md">
          {errorMessage}
        </div>
    )}
    <div className="h-full flex items-center justify-center">
      <div className="hidden lg:block lg:w-4/12">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-full"
            alt="Sample"
          />
        </div>

        {/* Right column container */}
        <div className="w-full max-w-md lg:w-5/12 p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row items-center justify-center lg:justify-start mb-4">
              <p className="text-lg font-semibold">Log in to your account</p>

              {/* Social media buttons */}
        
            </div>

            {/* Separator */}
            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <p className="px-4 text-gray-500"></p>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>


{/* email input */}
<div className="relative mb-6">
  <input
    type="text"
    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 leading-tight text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-0"
    id="email"
    placeholder=" "
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <label
    htmlFor="email"
    className="absolute left-0 top-3.5 text-gray-500 transform transition-all duration-200 ease-out origin-[0_0] scale-75 -translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    Email
  </label>
</div>
{/* Password input */}
<div className="relative mb-6">
  <input
    type="password"
    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 leading-tight text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-0"
    id="password"
    placeholder=" "
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <label
    htmlFor="password"
    className="absolute left-0 top-3.5 text-gray-500 transform transition-all duration-200 ease-out origin-[0_0] scale-75 -translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
  >
    Password
  </label>
</div>


            <div className="mb-6 flex items-center justify-between">
              {/* Remember me checkbox */}
              <div className="block min-h-[1.5rem] pl-[1.5rem]">
                <input
                  className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-secondary-500 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                  type="checkbox"
                  value=""
                  id="rememberMe"
                />
                <label className="inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>

              {/* Forgot password link */}
              <a href="#!">Forgot password?</a>
            </div>

            {/* Login button */}
            <div className="text-center lg:text-left">
              <button
                type="submit"
                className="inline-block w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2"
              >
                Login
              </button>

              {/* Register link */}
              <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                <a
                  href="#!"
                  className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                >
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;