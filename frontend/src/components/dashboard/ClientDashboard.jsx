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
        className={`fixed top-0 left-0 h-full bg-white shadow-lg border-r border-gray-200 z-50 transition-all duration-300 ease-in-out ${
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
        <div className="flex justify-between items-center px-6 p-2 border-b border-gray-200 bg-gray-50">
          {isSidebarOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-15 h-15 flex items-center justify-center">
              <img src={clientData?.businessLogoUrl}></img>
              </div>
              <h4 className="font-semibold text-lg truncate text-gray-800">
                {clientData?.businessName || "Business"}
              </h4>
            </div>
          )}
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaAngleLeft size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Main Navigation */}
        <div className="flex flex-col h-[calc(100vh-180px)]">
          <div className="flex-1 overflow-y-auto py-4">
            {mainNavItems.map((item, index) => (
              <button
                key={index}
                className={`flex items-center w-full py-3 px-4 text-left transition-all duration-200 ${
                  activeTab === item.name
                    ? "bg-blue-50 text-blue-700 border-r-4 border-blue-500 shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
                onClick={() => handleTabClick(item.name)}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                {(isSidebarOpen || isMobile) && (
                  <span className="ml-3 font-medium">{item.name}</span>
                )}
              </button>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 py-4 bg-gray-50">
            {bottomNavItems.map((item, index) => (
              <div key={index}>
                <button
                  className={`flex items-center w-full py-3 px-4 text-left transition-all duration-200 ${
                    activeTab === item.name
                      ? "bg-blue-50 text-blue-700 border-r-4 border-blue-500 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                  onClick={() => handleTabClick(item.name)}
                >
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  {(isSidebarOpen || isMobile) && (
                    <span className="ml-3 font-medium">{item.name}</span>
                  )}
                </button>

                {/* Settings Submenu */}
                {isSidebarOpen && item.subItems && activeTab === item.name && (
                  <div className="ml-12 mt-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        className="flex items-center w-full py-2 text-left text-gray-600 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => {
                          if (subItem === "Log out") onLogout();
                        }}
                      >
                        {subItem === "Log out" && (
                          <FaSignOutAlt className="mr-2" />
                        )}
                        <span>{subItem}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
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
                        Transactions
                      </h3>
                      <FaChartLine className="text-pink-200 text-xl" />
                    </div>
                    <p className="text-gray-100">
                      Manage and view transaction history
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-xl border border-green-200 shadow-sm transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-white">
                        Reports
                      </h3>
                      <FaChartPie className="text-green-200 text-xl" />
                    </div>
                    <p className="text-green-100">
                      Generate and download business reports
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-xl border border-indigo-200 shadow-sm transform hover:scale-105 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-lg text-white">
                        Tax Information
                      </h3>
                      <FaFileInvoice className="text-indigo-200 text-xl" />
                    </div>
                    <p className="text-indigo-100">
                      Manage GST, PAN, and other tax details
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
                <div className="space-y-6">
                  {loading ? (
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : clientData ? (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Business Information
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">
                              Business Name
                            </p>
                            <p className="font-semibold text-gray-800">
                              {clientData.businessName}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">
                              GST Number
                            </p>
                            <p className="font-semibold text-gray-800">
                              {clientData.gstNo}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">
                              PAN Number
                            </p>
                            <p className="font-semibold text-gray-800">
                              {clientData.panNo}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">
                              Mobile Number
                            </p>
                            <p className="font-semibold text-gray-800">
                              {clientData.mobileNo}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">
                              Address
                            </p>
                            <p className="font-semibold text-gray-800">
                              {clientData.address}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">City</p>
                            <p className="font-semibold text-gray-800">
                              {clientData.city}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">
                              Pincode
                            </p>
                            <p className="font-semibold text-gray-800">
                              {clientData.pincode}
                            </p>
                          </div>
                          {clientData.websiteUrl && (
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <p className="text-sm text-gray-500 mb-1">
                                Website
                              </p>
                              <a
                                href={clientData.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700 hover:underline"
                              >
                                {clientData.websiteUrl}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No business profile data available
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
                    <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
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
                      <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition duration-200">
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
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Users</h3>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={userSearchPhone}
                        onChange={(e) => setUserSearchPhone(e.target.value)}
                        placeholder="Search by phone number"
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={fetchUsers}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
                      >
                        <FaSyncAlt className="animate-spin-slow" /> Refresh
                      </button>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    {Array.isArray(users) && users.filter(u => {
                      const q = (userSearchPhone || '').trim();
                      if (!q) return true;
                      const digitsQ = q.replace(/\D/g, '');
                      const phoneDigits = String(u.number || '').replace(/\D/g, '');
                      return phoneDigits.includes(digitsQ);
                    }).length === 0 ? (
                      <div className="p-8 text-center text-gray-500">No users found for this client.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">City</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">College</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pin Code</th>
                              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-100">
                            {(Array.isArray(users) ? users.filter(u => {
                              const q = (userSearchPhone || '').trim();
                              if (!q) return true;
                              const digitsQ = q.replace(/\\D/g, '');
                              const phoneDigits = String(u.number || '').replace(/\\D/g, '');
                              return phoneDigits.includes(digitsQ);
                            }) : []).map(user => (
                              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
                                      <FaUserCircle />
                                    </div>
                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.number || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.city || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.clgname || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.pincode || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</td>
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
