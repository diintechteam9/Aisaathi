import React, { useState, useEffect } from "react";
import {
  FaChartBar,
  FaBuilding,
  FaChartLine,
  FaHeadset,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaQuestionCircle,
  FaAngleLeft,
  FaHome,
  FaChartPie,
  FaFileInvoice,
  FaUsers,
  FaSyncAlt,
  FaUserCircle,
  FaCreditCard,
  FaTicketAlt,
  FaClipboardList,
} from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaIndianRupeeSign } from "react-icons/fa6";

const ClientDashboard = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMobile, setIsMobile] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [clientId, setclientId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setusers] = useState([]);
  const [userSearchPhone, setUserSearchPhone] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [isEditingPrices, setIsEditingPrices] = useState(false);
  const [prices, setPrices] = useState({
    monthly: { free: 0, pro: 199, star: 299 },
    yearly: { free: 0, pro: 1999, star: 2999 }
  });
  const [tempPriceInputs, setTempPriceInputs] = useState({
    free: 0,
    pro: 199,
    star: 299
  });

  // Fetch users for this client
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem('clienttoken');
      if (!token) throw new Error('No authentication token found');
      const resp = await axios.get(`${API_BASE_URL}/client/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!resp.data.success) throw new Error(resp.data.message || 'Failed to fetch users');
      const fetchedUsers = Array.isArray(resp.data.users) ? [...resp.data.users] : [];
      fetchedUsers.sort((a, b) => {
        const aTime = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
        const bTime = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
        return bTime - aTime;
      });
      setusers(fetchedUsers);
    } catch (err) {
      console.error('Fetch users error:', err);
      setError(err.message);
      setusers([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch client profile data
  const fetchClientProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = sessionStorage.getItem("clienttoken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      console.log("Fetching client profile with token:", token);
      const response = await axios.get(`${API_BASE_URL}/client/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      if (response.data.success) {
        setClientData(response.data.data);
        console.log("Client data set to:", response.data.data);
        setclientId(response.data.data.userId);
        console.log(response.data.data.userId);
      } else {
        throw new Error(
          response.data.message || "Failed to fetch client profile"
        );
      }
    } catch (error) {
      console.error("Error fetching client profile:", error);
      console.error("Error details:", error.response?.data);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientProfile();
  }, []);
  // Fetch profile data when Business Profile tab is selected
  useEffect(() => {
    if (activeTab === "Business Profile" || activeTab === "Tax Information  ") {
      fetchClientProfile();
    }
   
    
  }, [activeTab]);

  useEffect(() => {
    // Sync temp inputs with current cycle when entering edit mode or changing cycle
    setTempPriceInputs({ ...prices[billingCycle] });
  }, [billingCycle, isEditingPrices]);

  // Fetch users for this client when Users tab is opened
  useEffect(() => {
    if (activeTab === 'Users') {
      fetchUsers();
    }
  }, [activeTab]);

  // Fetch pricing for Plans tab
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const token = sessionStorage.getItem('clienttoken');
        const resp = await axios.get(`${API_BASE_URL}/pricing`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        if (resp?.data?.success && resp?.data?.pricing) {
          const serverPricing = resp.data.pricing;
          // Normalize to expected shape
          const normalized = {
            monthly: serverPricing.monthly || { free: 0, pro: 199, star: 299 },
            yearly: serverPricing.yearly || { free: 0, pro: 1999, star: 2999 }
          };
          setPrices(normalized);
        }
      } catch (error) {
        console.error('Failed to fetch pricing', error);
      }
    };

    if (activeTab === 'Plans') {
      fetchPricing();
    }
  }, [activeTab]);

  // Check if screen is mobile and handle resize events
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // Main navigation items
  const mainNavItems = [
    { name: "Overview", icon: <FaHome /> },
    { name: "Business Profile", icon: <FaBuilding /> },
    { name: "Users", icon: <FaUsers /> },
    { name: "Plans", icon: <FaClipboardList /> },
    { name: "Payment", icon: <FaCreditCard /> },

  ];

  // Bottom navigation items
  const bottomNavItems = [
    { name: "Support", icon: <FaHeadset /> },
    { name: "Help", icon: <FaQuestionCircle /> },
    { name: "Settings", icon: <FaCog />, subItems: ["Log out"] },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Error State */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <p>{error}</p>
        </div>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-slate-50 to-slate-100 shadow-xl border-r border-slate-200 z-50 transition-all duration-300 ease-in-out ${
          isMobile
            ? isSidebarOpen
              ? "w-64 translate-x-0"
              : "-translate-x-full w-64"
            : isSidebarOpen
            ? "w-64"
            : "w-20"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          {isSidebarOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b flex items-center justify-center shadow-lg">
                {clientData?.businessLogoUrl ? (
                  <img 
                    src={clientData.businessLogoUrl} 
                    alt="Business Logo"
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                ) : (
                  <FaBuilding className="text-white text-lg" />
                )}
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-lg truncate text-slate-800">
                  {clientData?.businessName || "Business"}
                </h4>
                <p className="text-xs text-slate-500 font-medium">Dashboard</p>
              </div>
            </div>
          )}
          <button
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 focus:outline-none transition-all duration-200 flex items-center justify-center"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaAngleLeft size={16} /> : <FaBars size={16} />}
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-col h-[calc(100vh-180px)]">
          <div className="flex-1 overflow-y-auto py-6 px-3">
            <div className="space-y-2">
              {mainNavItems.map((item, index) => (
                <button
                  key={index}
                  className={`flex items-center w-full py-3 px-4 text-left transition-all duration-200 rounded-xl ${
                    activeTab === item.name
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                      : "text-slate-600 hover:bg-white/60 hover:text-slate-800 hover:shadow-md"
                  }`}
                  onClick={() => handleTabClick(item.name)}
                >
                  <span className={`text-xl flex-shrink-0 transition-all duration-200 ${
                    activeTab === item.name ? 'text-white' : 'text-slate-500'
                  }`}>
                    {item.icon}
                  </span>
                  {(isSidebarOpen || isMobile) && (
                    <span className="ml-3 font-medium">{item.name}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="px-3 pb-6 absolute bottom-0 left-0 right-0">
            <div className="border-t border-slate-200 pt-4">
              <div className="space-y-2">
                {bottomNavItems.map((item, index) => (
                  <div key={index}>
                    <button
                      className={`flex items-center w-full py-3 px-4 text-left transition-all duration-200 rounded-xl ${
                        activeTab === item.name
                          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transform scale-105"
                          : "text-slate-600 hover:bg-white/60 hover:text-slate-800 hover:shadow-md"
                      }`}
                      onClick={() => handleTabClick(item.name)}
                    >
                      <span className={`text-xl flex-shrink-0 transition-all duration-200 ${
                        activeTab === item.name ? 'text-white' : 'text-slate-500'
                      }`}>
                        {item.icon}
                      </span>
                      {(isSidebarOpen || isMobile) && (
                        <span className="ml-3 font-medium">{item.name}</span>
                      )}
                    </button>

                    {/* Settings Submenu */}
                    {isSidebarOpen && item.subItems && activeTab === item.name && (
                      <div className="ml-12 mt-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            className="flex items-center w-full py-2 px-3 text-left text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200"
                            onClick={() => {
                              if (subItem === "Log out") onLogout();
                            }}
                          >
                            {subItem === "Log out" && (
                              <FaSignOutAlt className="mr-2 text-sm" />
                            )}
                            <span className="text-sm font-medium">{subItem}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`${
          isMobile ? "ml-0" : isSidebarOpen ? "ml-64" : "ml-20"
        } transition-all duration-300 ease-in-out`}
      >
        {/* Mobile Header */}
        {isMobile && (
          <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
            <div className="flex justify-between items-center p-4">
              <button
                className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                onClick={toggleSidebar}
              >
                <FaBars size={20} />
              </button>
              <h4 className="font-bold text-lg text-gray-800">Client Dashboard</h4>
              <div className="w-8"></div> {/* Spacer for alignment */}
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="p-6">
          <div className="max-w-7xl">
          
            {/* Welcome Message */}
            {activeTab === "Overview" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h1 className="text-xl font-semibold text-gray-800 mb-1">
                    Welcome back, {clientData?.businessName || "Client"}!
                  </h1>
                  <p className="text-gray-600 text-sm">
                    {new Date().getHours() < 12
                      ? "Good morning"
                      : new Date().getHours() < 18
                      ? "Good afternoon"
                      : "Good evening"}
                    , here's your business overview.
                  </p>
                </div>
                <div className="mt-3 md:mt-0 flex items-center space-x-3">
                  <div className="bg-blue-600 rounded-lg p-3 shadow-sm">
                    <FaBuilding className="text-white text-lg" />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{clientData?.email}</p>
                    <p className="text-xs text-gray-500">Business Status</p>
                    <p className="text-sm font-medium text-blue-600">Active</p>
                  </div>
                </div>
              </div>
            </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {activeTab === "Overview" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl border border-blue-200 shadow-sm transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-white">
                        Business Profile
                      </h3>
                      <FaBuilding className="text-blue-200 text-xl" />
                    </div>
                    <p className="text-blue-100">
                      View and update your business information
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-600 to-pink-700 p-6 rounded-xl border border-gray-200 shadow-sm transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-white">
                        Users
                      </h3>
                      <FaChartLine className="text-pink-200 text-xl" />
                    </div>
                    <p className="text-gray-100">
                      Manage and view Users
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl border border-green-200 shadow-sm transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-white">
                        Plans
                      </h3>
                      <FaChartPie className="text-green-200 text-xl" />
                    </div>
                    <p className="text-green-100">
                      Generate and Edit Plans
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-xl border border-indigo-200 shadow-sm transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-white">
                        Payment 
                      </h3>
                      <FaFileInvoice className="text-indigo-200 text-xl" />
                    </div>
                    <p className="text-indigo-100">
                      Manage all the P  ayements
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-slate-600 to-slate-700 p-6 rounded-xl border border-slate-200 shadow-sm transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-white">
                        Support
                      </h3>
                      <FaHeadset className="text-slate-200 text-xl" />
                    </div>
                    <p className="text-slate-100">
                      Contact support and view help resources
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 p-6 rounded-xl border border-cyan-200 shadow-sm transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-white">
                        Analytics
                      </h3>
                      <FaChartBar className="text-cyan-200 text-xl" />
                    </div>
                    <p className="text-cyan-100">
                      View detailed business analytics
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "Business Profile" && (
                <div style={{ padding: '0', margin: '0' }}>
                  {loading ? (
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      padding: '3rem 0',
                      minHeight: '200px'
                    }}>
                      <div style={{
                        width: '2rem',
                        height: '2rem',
                        border: '3px solid #e5e7eb',
                        borderTop: '3px solid #2563eb',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                    </div>
                  ) : clientData ? (
                    <div>
                      {/* Header Section */}
                      <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        borderRadius: '16px',
                        padding: '2rem',
                        marginBottom: '2rem',
                        color: 'white',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                          <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '12px',
                            background: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backdropFilter: 'blur(10px)'
                          }}>
                            <FaBuilding style={{ fontSize: '1.5rem' }} />
                          </div>
                          <div>
                            <h2 style={{ 
                              fontSize: '1.75rem', 
                              fontWeight: '700', 
                              margin: '0 0 0.25rem 0',
                              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}>
                              {clientData.businessName || 'Business Name'}
                            </h2>
                            <p style={{ 
                              margin: '0', 
                              opacity: '0.9',
                              fontSize: '0.95rem'
                            }}>
                              Professional Business Profile
                            </p>
                          </div>
                        </div>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                          gap: '1rem',
                          marginTop: '1.5rem'
                        }}>
                          <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            backdropFilter: 'blur(10px)'
                          }}>
                            <p style={{ margin: '0', fontSize: '0.8rem', opacity: '0.8' }}>Business Status</p>
                            <p style={{ margin: '0', fontWeight: '600', fontSize: '0.95rem' }}>Active</p>
                          </div>
                          <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            backdropFilter: 'blur(10px)'
                          }}>
                            <p style={{ margin: '0', fontSize: '0.8rem', opacity: '0.8' }}>Member Since</p>
                            <p style={{ margin: '0', fontWeight: '600', fontSize: '0.95rem' }}>
                              {clientData.createdAt ? new Date(clientData.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                          <div style={{
                            background: 'rgba(255,255,255,0.1)',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            backdropFilter: 'blur(10px)'
                          }}>
                            <p style={{ margin: '0', fontSize: '0.8rem', opacity: '0.8' }}>Profile Completion</p>
                            <p style={{ margin: '0', fontWeight: '600', fontSize: '0.95rem' }}>100%</p>
                          </div>
                        </div>
                      </div>

                      {/* Business Information Grid */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                        gap: '1.5rem',
                        marginBottom: '2rem'
                      }}>
                        {/* Legal Information Section */}
                        <div style={{
                          background: 'white',
                          borderRadius: '16px',
                          padding: '1.5rem',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                          border: '1px solid #f3f4f6'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1.5rem',
                            paddingBottom: '1rem',
                            borderBottom: '2px solid #f3f4f6'
                          }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '10px',
                              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white'
                            }}>
                              <FaFileInvoice style={{ fontSize: '1rem' }} />
                            </div>
                            <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                              Legal Information
                        </h3>
                      </div>
                          
                          <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{
                              background: '#f8fafc',
                              padding: '1rem',
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
                              Business Name
                            </p>
                              <p style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>
                                {clientData.businessName || 'Not provided'}
                            </p>
                          </div>
                            
                            <div style={{
                              background: '#f8fafc',
                              padding: '1rem',
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
                              GST Number
                            </p>
                              <p style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>
                                {clientData.gstNo || 'Not provided'}
                            </p>
                          </div>
                            
                            <div style={{
                              background: '#f8fafc',
                              padding: '1rem',
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
                              PAN Number
                            </p>
                              <p style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>
                                {clientData.panNo || 'Not provided'}
                            </p>
                          </div>
                          </div>
                          </div>

                        {/* Contact Information Section */}
                        <div style={{
                          background: 'white',
                          borderRadius: '16px',
                          padding: '1.5rem',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                          border: '1px solid #f3f4f6'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '1.5rem',
                            paddingBottom: '1rem',
                            borderBottom: '2px solid #f3f4f6'
                          }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '10px',
                              background: 'linear-gradient(135deg, #10b981, #059669)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white'
                            }}>
                              <FaHeadset style={{ fontSize: '1rem' }} />
                        </div>
                            <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                              Contact Information
                            </h3>
                          </div>
                          
                          <div style={{ display: 'grid', gap: '1rem' }}>
                            <div style={{
                              background: '#f8fafc',
                              padding: '1rem',
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
                                Email Address
                              </p>
                              <p style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>
                                {clientData.email || 'Not provided'}
                            </p>
                          </div>
                            
                            <div style={{
                              background: '#f8fafc',
                              padding: '1rem',
                              borderRadius: '8px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
                                Mobile Number
                              </p>
                              <p style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>
                                {clientData.mobileNo || 'Not provided'}
                            </p>
                          </div>
                            
                          {clientData.websiteUrl && (
                              <div style={{
                                background: '#f8fafc',
                                padding: '1rem',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0'
                              }}>
                                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
                                Website
                              </p>
                              <a
                                href={clientData.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                  style={{
                                    color: '#2563eb',
                                    textDecoration: 'none',
                                    fontWeight: '600',
                                    fontSize: '1rem'
                                  }}
                                  onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                                  onMouseOut={(e) => e.target.style.textDecoration = 'none'}
                              >
                                {clientData.websiteUrl}
                              </a>
                            </div>
                          )}
                          </div>
                        </div>
                      </div>

                      {/* Address Information Section */}
                      <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        border: '1px solid #f3f4f6',
                        marginBottom: '2rem'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          marginBottom: '1.5rem',
                          paddingBottom: '1rem',
                          borderBottom: '2px solid #f3f4f6'
                        }}>
                          <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                          }}>
                            <FaBuilding style={{ fontSize: '1rem' }} />
                          </div>
                          <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
                            Location Details
                          </h3>
                        </div>
                        
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                          gap: '1rem'
                        }}>
                          <div style={{
                            background: '#f8fafc',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                          }}>
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
                              Complete Address
                            </p>
                            <p style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>
                              {clientData.address || 'Not provided'}
                            </p>
                          </div>
                          
                          <div style={{
                            background: '#f8fafc',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                          }}>
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
                              City
                            </p>
                            <p style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>
                              {clientData.city || 'Not provided'}
                            </p>
                          </div>
                          
                          <div style={{
                            background: '#f8fafc',
                            padding: '1rem',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0'
                          }}>
                            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
                              Pincode
                            </p>
                            <p style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#1e293b' }}>
                              {clientData.pincode || 'Not provided'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      padding: '3rem 0',
                      background: 'white',
                      borderRadius: '16px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                      border: '1px solid #f3f4f6'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        margin: '0 auto 1rem auto',
                        borderRadius: '50%',
                        background: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <FaBuilding style={{ fontSize: '2rem', color: '#9ca3af' }} />
                      </div>
                      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600', color: '#374151' }}>
                        No Business Profile Data
                      </h3>
                      <p style={{ margin: '0', color: '#6b7280', fontSize: '0.95rem' }}>
                        Complete your business profile to get started
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "Enquiry" && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-gray-600">
                      Business reports and analytics will go here
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "History" && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-gray-600">
                      Activity history will go here
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "Datastore" && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-gray-600">
                      Activity history will go here
                    </p>
                  </div>
                </div>
              )}

             

              {activeTab === "Chats" && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-gray-600">
                      Support and help resources will go here
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "Help" && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-gray-600">
                      Help documentation and guides will go here
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "Settings" && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
                    <p className="text-gray-600">
                      Account settings and preferences will go here
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "Plans" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Plans</h3>
                    <div className="flex items-center gap-3">
                      <div className="inline-flex bg-gray-100 rounded-full p-1">
                        <button
                          onClick={() => setBillingCycle('monthly')}
                          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'}`}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => setBillingCycle('yearly')}
                          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${billingCycle === 'yearly' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:text-gray-900'}`}
                        >
                          Yearly
                        </button>
                      </div>
                      <button
                        onClick={() => setIsEditingPrices((prev) => !prev)}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
                      >
                        {isEditingPrices ? 'Close Edit' : 'Edit Prices'}
                      </button>
                    </div>
                  </div>

                  {isEditingPrices && (
                    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['free','pro','star'].map((plan) => (
                          <div key={plan} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 capitalize">{plan} price ({billingCycle})</label>
                            <div className="flex items-center gap-2">
                              <div className="text-gray-600"><FaIndianRupeeSign /></div>
                              <input
                                type="text"
                                value={String(tempPriceInputs[plan] ?? '')}
                                onChange={(e) => setTempPriceInputs((prev) => ({ ...prev, [plan]: e.target.value }))}
                                placeholder="Enter amount"
                                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          onClick={() => {
                            setIsEditingPrices(false);
                            setTempPriceInputs({ ...prices[billingCycle] });
                          }}
                          className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            (async () => {
                              try {
                                const token = sessionStorage.getItem('clienttoken');
                                // Parse values to numbers; ensure valid numeric inputs
                                const parsedCycle = Object.entries(tempPriceInputs).reduce((acc, [key, value]) => {
                                  const num = typeof value === 'number' ? value : parseFloat(String(value).trim());
                                  if (!isFinite(num)) {
                                    throw new Error('Please enter valid numeric values for all plans');
                                  }
                                  acc[key] = num;
                                  return acc;
                                }, {});
                                const body = { [billingCycle]: parsedCycle };
                                const resp = await axios.put(`${API_BASE_URL}/pricing`, body, {
                                  headers: token ? { Authorization: `Bearer ${token}` } : {}
                                });
                                if (resp?.data?.success && resp?.data?.pricing) {
                                  const updated = resp.data.pricing;
                                  setPrices({
                                    monthly: updated.monthly,
                                    yearly: updated.yearly
                                  });
                                  toast.success('Prices updated');
                                } else {
                                  // Fallback to local update if server did not return pricing
                                  setPrices((prev) => ({ ...prev, [billingCycle]: { ...tempPriceInputs } }));
                                  toast.success('Prices updated');
                                }
                              } catch (error) {
                                console.error('Failed to update pricing', error);
                                toast.error('Failed to update prices');
                              } finally {
                                setIsEditingPrices(false);
                              }
                            })();
                          }}
                          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200 ">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Free</h3>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-gray-900 flex items-center">
                          <FaIndianRupeeSign className="inline-block mr-1"/>
                          <span>{prices[billingCycle].free}</span>
                        </span>
                        <span className="text-gray-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          1 Resume
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Basic Templates
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          PDF Export
                        </li>
                      </ul>
                      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition duration-200 mt-18">
                        Get Started Free
                      </button>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-gray-900 flex items-center">
                          <FaIndianRupeeSign className="inline-block mr-1"/>
                          <span>{prices[billingCycle].pro}</span>
                        </span>
                        <span className="text-gray-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Unlimited Resumes
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Premium Templates
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          AI Optimization
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Multiple Formats
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Priority Support
                        </li>
                      </ul>
                      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition duration-200">
                        Start Pro Trial
                      </button>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Star</h3>
                      <div className="mb-6">
                        <span className="text-4xl font-bold text-gray-900 flex items-center">
                          <FaIndianRupeeSign className="inline-block mr-1"/>
                          <span>{prices[billingCycle].star}</span>
                        </span>
                        <span className="text-gray-600">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Everything in Pro
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Team Collaboration
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Custom Branding
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          API Access
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Dedicated Support
                        </li>
                      </ul>
                      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition duration-200">
                        Start Star Trial
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Users" && (
                <div className="space-y-6">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <FaUsers className="text-2xl" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">User Management</h2>
                          <p className="text-blue-100 text-sm">Manage and monitor your registered users</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{Array.isArray(users) ? users.length : 0}</div>
                        <div className="text-blue-100 text-sm">Total Users</div>
                      </div>
                    </div>
                  </div>

                  {/* Search and Actions Bar */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Search Users</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={userSearchPhone}
                            onChange={(e) => setUserSearchPhone(e.target.value)}
                            placeholder="Search by phone number..."
                            className="w-full md:w-80 pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50 hover:bg-white"
                          />
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={fetchUsers}
                          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-all duration-200 hover:shadow-md transform hover:scale-105"
                        >
                          <FaSyncAlt className="text-lg" /> Refresh Data
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Users Table */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {Array.isArray(users) && users.filter(u => {
                      const q = (userSearchPhone || '').trim();
                      if (!q) return true;
                      const digitsQ = q.replace(/\D/g, '');
                      const phoneDigits = String(u.number || '').replace(/\D/g, '');
                      return phoneDigits.includes(digitsQ);
                    }).length === 0 ? (
                      <div className="p-12 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                          <FaUsers className="text-3xl text-slate-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-600 mb-2">No Users Found</h3>
                        <p className="text-slate-500 text-sm">No users match your search criteria or no users have been registered yet.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                          <thead>
                            <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">User Profile</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Contact Info</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Location</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Education</th>
                              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Registration</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-slate-100">
                            {(Array.isArray(users) ? users.filter(u => {
                              const q = (userSearchPhone || '').trim();
                              if (!q) return true;
                              const digitsQ = q.replace(/\\D/g, '');
                              const phoneDigits = String(u.number || '').replace(/\\D/g, '');
                              return phoneDigits.includes(digitsQ);
                            }) : []).map((user, index) => (
                              <tr key={user._id} className="hover:bg-slate-50 transition-all duration-200 group">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center gap-3">
                                    <div className="relative">
                                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg">
                                        {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                      </div>
                                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                                    </div>
                                    <div>
                                      <div className="text-sm font-semibold text-slate-900">{user.name || 'Anonymous'}</div>
                                      <div className="text-xs text-slate-500">User #{index + 1}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="space-y-1">
                                    <div className="text-sm font-medium text-slate-900">{user.email || 'No email'}</div>
                                    <div className="text-sm text-slate-600">{user.number || 'No phone'}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="space-y-1">
                                    <div className="text-sm font-medium text-slate-900">{user.city || 'Unknown city'}</div>
                                    <div className="text-sm text-slate-600">{user.pincode || 'No pincode'}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-slate-900 font-medium">{user.clgname || 'Not specified'}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="space-y-1">
                                    <div className="text-sm font-medium text-slate-900">
                                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                      {user.createdAt ? new Date(user.createdAt).toLocaleTimeString() : ''}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                 
                </div>
              )}

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientDashboard;
