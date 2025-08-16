import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';
import UserDashboard from './components/dashboard/UserDashboard';
import FirstPage from './components/FirstPage'
const User = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  // Redirect authenticated users away from auth routes
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const currentPath = window.location.pathname;
      if (currentPath === '/auth' || currentPath === '/auth/login' || currentPath === '/auth/register') {
        navigate('/auth/firstpage');
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

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
      email: userData.email
    }));
    
    setIsAuthenticated(true);
    console.log("User authentication successful");
    // Redirect to first page after successful authentication
    navigate('/auth/firstpage');
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
        <Route path='/' element={<AuthLayout onLogin={handleAuthSuccess}/>}/>
        <Route path='/login' element={<AuthLayout onLogin={handleAuthSuccess}/>}/>
        <Route path='/register' element={<AuthLayout onLogin={handleAuthSuccess}/>}/>
        {
            isAuthenticated?
            (
                <>
                <Route path='/dashboard' element={<UserDashboard onLogout={handleLogout}/>}/>
                <Route path="/firstpage" element={<FirstPage onLogout={handleLogout} />} />
                </>
            )
            :
            (
                <Route path='*' element={<AuthLayout onLogin={handleAuthSuccess}/>}/>

            )
        }
        </Routes>
    </div>
  );
};

export default User;