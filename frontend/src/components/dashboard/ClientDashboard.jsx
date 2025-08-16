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
} from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClientDashboard = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isMobile, setIsMobile] = useState(false);
  const [clientData, setClientData] = useState(null);
  const [clientId, setclientId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setusers] = useState(null);

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
      console.log("ye hai api base url  ",API_BASE_URL);

      console.log("Client profile response:", response.data);
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
    { name: "Chats", icon: <FaUsers /> },
    { name: "Enquiry", icon: <FaUsers /> },
    { name: "History", icon: <FaUsers /> },
    { name: "Datastore", icon: <FaUsers /> },

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

              {activeTab === "Users" && (
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 shadow-sm">
                    {Array.isArray(users) && users.length === 0 ? (
                      <p className="text-gray-500">No users found for this client.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                              <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user._id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.createdAt).toLocaleString()}</td>
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
