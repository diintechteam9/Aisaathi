import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';
import CompleteProfileForm from './components/auth/CompleteProfileForm';
import axios from 'axios';
import { API_BASE_URL } from './config';
import UserDashboard from './components/dashboard/UserDashboard';
import FirstPage from './components/FirstPage'
const User = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsProfileCompletion, setNeedsProfileCompletion] = useState(false);
  const [prefillEmail, setPrefillEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const usertoken = localStorage.getItem('usertoken');
      const userData = localStorage.getItem('userData');
      
      if (usertoken && userData) {
        try {
          const parseduserData = JSON.parse(userData);
          if (parseduserData.role === 'user') {
            setIsAuthenticated(true);
            setNeedsProfileCompletion(parseduserData.isprofileCompleted === false);
            if (parseduserData.email) setPrefillEmail(parseduserData.email);
            // Update user data if needed
            localStorage.setItem('userData', JSON.stringify({
              ...parseduserData,
              name: parseduserData.name
            }));
          } else {
            throw new Error('Invalid role');
          }
        } catch (error) {
          console.error('Error validating user token:', error);
          clearAuth();
        }
      }
      
      setIsLoading(false);
    };
    
    initializeAuth();
  }, []);

  // Redirect authenticated users based on profile completion
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const currentPath = window.location.pathname;
      if (needsProfileCompletion) {
        if (currentPath !== '/auth/complete-profile') {
          navigate('/auth/complete-profile');
        }
      } else {
        if (
          currentPath === '/auth' ||
          currentPath === '/auth/login' ||
          currentPath === '/auth/register' ||
          currentPath === '/auth/complete-profile'
        ) {
          navigate('/auth/firstpage');
        }
      }
    }
  }, [isAuthenticated, isLoading, needsProfileCompletion, navigate]);

  // Redirect unauthenticated users to login if they try to access protected routes
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      const currentPath = window.location.pathname;
      if (currentPath === '/auth/firstpage' || currentPath === '/auth/dashboard') {
        navigate('/auth');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  const clearAuth = () => {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  const handleAuthSuccess = (userData) => {
    // Store user token and user data
    localStorage.setItem('usertoken', userData.token);
    localStorage.setItem('userData', JSON.stringify({
      role: userData.role,
      name: userData.name,
      email: userData.email,
      clientId: userData.clientId,
      isprofileCompleted: userData.isprofileCompleted === true,
    }));
    
    setIsAuthenticated(true);
    setNeedsProfileCompletion(userData.isprofileCompleted === false);
    if (userData.email) setPrefillEmail(userData.email);
    console.log("User authentication successful");
    // Redirect depending on profile completion
    if (userData.isprofileCompleted === false) {
      navigate('/auth/complete-profile');
    } else {
      navigate('/auth/firstpage');
    }
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
        <Routes>
        {
            isAuthenticated?
            (
                <>
                <Route path='/dashboard' element={<UserDashboard onLogout={handleLogout}/>}/>
                <Route path="/firstpage" element={<FirstPage onLogout={handleLogout} />} />
                <Route path='/complete-profile' element={
                  <CompleteProfileForm
                    initialValues={{ email: prefillEmail }}
                    onComplete={async (data) => {
                      try {
                        const token = localStorage.getItem('usertoken');
                        const parsedUser = JSON.parse(localStorage.getItem('userData') || '{}');
                        const clientId = parsedUser.clientId;
                        await axios.put(
                          `${API_BASE_URL}/clients/${clientId}/user/complete-profile`,
                          data,
                          { headers: { Authorization: `Bearer ${token}` } }
                        );
                        const updated = { ...parsedUser, isprofileCompleted: true };
                        localStorage.setItem('userData', JSON.stringify(updated));
                        setNeedsProfileCompletion(false);
                        navigate('/auth/firstpage');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                } />
                <Route path="*" element={<Navigate to="/auth/firstpage" replace />} />
                </>
            )
            :
            (
                <>
                <Route path='/' element={<AuthLayout onLogin={handleAuthSuccess}/>}/>
                <Route path='/login' element={<AuthLayout onLogin={handleAuthSuccess}/>}/>
                
                <Route path="*" element={<Navigate to="/auth" replace />} />
                </>
            )
        }
        </Routes>
    </div>
  );
};

export default User;