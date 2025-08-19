import { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../../config';

const LoginForm = ({ onLogin, switchToRegister }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const decoded = jwtDecode(credentialResponse.credential);
      console.log('Google login success:', decoded);
      console.log("google token",credentialResponse.credential);
      let response; // <-- declare response here
      // This endpoint will handle both client and user types based on userType prop
      // if(userType === "client")
      // {
      //   const endpoint = `${API_BASE_URL}/${userType}/google-login`;
      //   response = await axios.post(endpoint, {
      //     token: credentialResponse.credential,
      //   });
      //   console.log('Server response:', response.data);
      // }
      // if(userType === "user")
      // {
        const endpoint = `${API_BASE_URL}/clients/CLI331999AMKW/user/google-login`;
        response = await axios.post(endpoint, {
          token: credentialResponse.credential,
        });
        console.log('Server response:', response.data);
      // }
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Login failed');
      }

      // Structure the data for the app to consume
      let isprofileCompleted = false;
      if (response.data?.user?.isprofileCompleted === true) isprofileCompleted = true;
      if (response.data?.step === 'done') isprofileCompleted = true;
      if (response.data?.step === 'basic') isprofileCompleted = false;

      const loginData = {
        token: response.data.jwt_token || response.token,
        role: "user",
        name: response.data.user?.name || response.data.client?.name || decoded.name,
        email: response.data.user?.email || response.data.client?.email || decoded.email,
        clientId: response.data.user?.clientId || response.data.clientId,
        id: response.data?.id || response.data?.user?.id || response.client?.id || response.id,
        isprofileCompleted,
        step: response.data?.step,
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600 mb-4 text-center">
          Sign in securely with Google to continue
        </p>
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            text="signin_with"
            theme="filled_blue"
            shape="rectangular"
            size="large"
            logo_alignment="center"
          />
        </div>
      </div>

      {error && (
        <div className="mb-2 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm text-center">
          {error}
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        By continuing, you agree to our
        <span className="mx-1 text-gray-600 font-medium">Terms</span>
        and
        <span className="ml-1 text-gray-600 font-medium">Privacy Policy</span>.
      </p>
    </div>
  );
};

export default LoginForm; 