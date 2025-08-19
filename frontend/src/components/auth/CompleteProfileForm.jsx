import React, { useState } from 'react';
import { FaUser, FaIdCard, FaBuilding, FaGlobe, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

// Props:
// - onComplete: function(formData) => void
// - initialValues: optional object to prefill fields (e.g., from Google)
const CompleteProfileForm = ({ onComplete, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    number: initialValues.number || '',
    clgname: initialValues.clgname || '',
    city: initialValues.city || '',
    pincode: initialValues.pincode || '',
    email: initialValues.email || '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (typeof onComplete === 'function') {
        await onComplete(formData);
      }
    } catch (err) {
      setError(err?.message || 'Failed to complete profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-md mt-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Profile</h2>
        <p className="text-gray-600">Please provide the following details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaUser className="mr-2 text-gray-500" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaIdCard className="mr-2 text-gray-500" /> Mobile Number
            </label>
            <input
              type="tel"
              name="number"
              required
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your mobile number"
              inputMode="numeric"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaBuilding className="mr-2 text-gray-500" /> College Name
            </label>
            <input
              type="text"
              name="clgname"
              required
              value={formData.clgname}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your college name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaGlobe className="mr-2 text-gray-500" /> City
            </label>
            <input
              type="text"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your city"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-gray-500" /> Pincode
            </label>
            <input
              type="text"
              name="pincode"
              required
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Enter your pincode"
              inputMode="numeric"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FaEnvelope className="mr-2 text-gray-500" /> Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              readOnly
              aria-readonly="true"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-600 focus:ring-0 focus:border-gray-300 cursor-not-allowed"
              placeholder="Email from Google"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Saving...' : 'Save and Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfileForm;
