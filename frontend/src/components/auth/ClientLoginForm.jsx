import { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaSignInAlt } from 'react-icons/fa';
import { API_BASE_URL } from '../../config';
import { useNavigate } from 'react-router';

const LoginForm = ({ onLogin, switchToRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google login success:', decoded);
      console.log("google token",credentialResponse.credential);
      let response; // <-- declare response here
      // This endpoint will handle both client and user types based on userType prop
      if(userType === "client")
      {
        const endpoint = `${API_BASE_URL}/${userType}/google-login`;
        response = await axios.post(endpoint, {
          token: credentialResponse.credential,
        });
        console.log('Server response:', response.data);
      }
      if(userType === "user")
      {
        const endpoint = `${API_BASE_URL}/clients/CLI6781413BO1/mobile/${userType}/google-login`;
        response = await axios.post(endpoint, {
          token: credentialResponse.credential,
        });
        console.log('Server response:', response.data);
      }
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }

      // Structure the data for the app to consume
      const loginData = {
        token: response.data.jwt_token || response.token,
        role: userType,
        name: response.data.user?.name || response.data.client?.name || decoded.name,
        email: response.data.user?.email || response.data.client?.email || decoded.email,
        clientId: response.data.clientId || decoded.clientId,
        id: response.data?.id || response.client?.id || response.id
      };

      // Call the onLogin function with the properly structured data
      onLogin(loginData);
    } catch (err) {
      console.error('Google login error:', err);
      setError(err.response?.data?.message || 'Google login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error('Google Sign In failed');
    setError('Google Sign In was unsuccessful. Please try again.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let endpoint = 'client/login';
      

      const response = await axios.post(`http://localhost:4000/api/v1/${endpoint}`, formData);
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }
      console.log(response)
      // Structure the data properly before calling onLogin
      const loginData = {
        token: response.data.token,
        role: "client",
        name: response.data.user?.name || response.data.client?.name,
        email: response.data.user?.email || response.data.client?.email,
        clientId: response.data.client?.userId || response.data.user?.clientId,
        mobileNo: response.data.client?.mobileNo,
        address: response.data.client?.address,
        id: response.data.user?._id || response.data.client?._id
      };

      // Call the onLogin function with the properly structured data
      onLogin(loginData);

      navigate('/admin/dashboard');

    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setError(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 text-center">Admin Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2 flex items-center">
            <FaUser className="mr-2" /> Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin@example.com"
            autoComplete='off'
          />
        </div>
        
        <div className="mb-6">
          <label className="text-gray-700 text-sm font-bold mb-2 flex items-center">
            <FaLock className="mr-2" /> Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            autoComplete='off'
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline w-full transition-colors"
          >
            {loading ? (
              <span className="inline-flex items-center">
                <svg className="animate-spin mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              <span className="inline-flex items-center">
                <FaSignInAlt className="mr-2" />
                Admin Login
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 