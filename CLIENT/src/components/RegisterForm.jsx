import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
            console.log(response.data); // Handle successful registration
            navigate('/login', { state: { registrationSuccess: true } }); // Navigate to login page with state
        } catch (error) {
            console.error('Registration failed:', error.message); // Handle registration error
            if (error.response && error.response.data && error.response.data.message === 'Email already exists') {
                setErrors({ ...errors, email: 'Email already exists' });
            } else {
                console.error('Other error:', error); // Log other types of errors for debugging
                // Handle other types of errors, if necessary
            }
        } finally {
            setLoading(false);
        }
        
    };

    const validateForm = () => {
        let valid = true;
        const errors = {};

        if (!username.trim()) {
            errors.username = 'Username is required';
            valid = false;
        }

        if (!email.trim()) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is not valid';
            valid = false;
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };



    return (
        <section className="h-screen">
            
            <div className="h-full flex items-center justify-center">
                {/* Left column container with background */}
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
                        {/* Username input */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 leading-tight text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-0 ${
                                    errors.username ? 'border-red-500' : ''
                                }`}
                                id="username"
                                placeholder=" "
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <label
                                htmlFor="username"
                                className="absolute left-0 top-3.5 text-gray-500 transform transition-all duration-200 ease-out origin-[0_0] scale-75 -translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Username
                            </label>
                            {errors.username && <p className="text-red-500 mt-1">{errors.username}</p>}
                        </div>

                        {/* Email input */}
                        <div className="relative mb-6">
                            <input
                                type="text"
                                className={`peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 leading-tight text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-0 ${
                                    errors.email ? 'border-red-500' : ''
                                }`}
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
                            {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
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
  {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}

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
                 {/* Toast */}
                 {registrationStatus && <Toast status={registrationStatus} />}
              <button
                type="submit"
                className="inline-block w-full rounded bg-primary px-7 pb-2 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2"
              >
                Login
              </button>

              {/* Register link */}
              <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                Don't have an account?
                <a
                  href="#!"
                  className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                >
                                                    {loading ? 'Registering...' : 'Register'}

                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
