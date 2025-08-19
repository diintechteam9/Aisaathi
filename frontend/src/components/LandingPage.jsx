import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaIndianRupeeSign } from "react-icons/fa6";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleStartBuilding = () => {
    // Check if user is authenticated
    const usertoken = localStorage.getItem('usertoken');
    const userData = localStorage.getItem('userData');
    
    if (usertoken && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.role === 'user') {
          // User is authenticated, go to first page
          navigate('/auth/firstpage');
        } else {
          // Invalid role, redirect to login
          navigate('/auth');
        }
      } catch (error) {
        // Error parsing user data, redirect to login
        navigate('/auth');
      }
    } else {
      // User not authenticated, redirect to login
      navigate('/auth');
    }
  }

  const handleReachOut = () => {
    setIsContactModalOpen(true);
  }

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img 
                  src="/logo.png" 
                  alt="Aisaathi Logo" 
                  className="h-12 w-12 mr-3"
                />
                <h1 className="text-2xl font-bold text-violet-600">Aisaathi</h1>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-700 hover:text-violet-600 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                <a href="#features" className="text-gray-700 hover:text-violet-600 px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-violet-600 px-3 py-2 rounded-md text-sm font-medium">How it Works</a>
                <a href="#pricing" className="text-gray-700 hover:text-violet-600 px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                <a href="#contact" className="text-gray-700 hover:text-violet-600 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:block">
              <button 
                onClick={()=>navigate('/auth')}
                className="bg-violet-600 cursor-pointer hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-medium mr-3">
                Sign In
              </button>
              <button 
                onClick={handleStartBuilding}
                className="bg-white hover:bg-gray-50 text-violet-600 border border-violet-600 px-4 py-2 rounded-md text-sm font-medium"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-violet-600 focus:outline-none focus:text-violet-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#home" className="text-gray-700 hover:text-violet-600 block px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#features" className="text-gray-700 hover:text-violet-600 block px-3 py-2 rounded-md text-base font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-violet-600 block px-3 py-2 rounded-md text-base font-medium">How it Works</a>
              <a href="#pricing" className="text-gray-700 hover:text-violet-600 block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
              <a href="#contact" className="text-gray-700 hover:text-violet-600 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-medium w-full mb-2">
                  Sign In
                </button>
                <button 
                  onClick={handleStartBuilding}
                  className="bg-white hover:bg-gray-50 text-violet-600 border border-violet-600 px-4 py-2 rounded-md text-sm font-medium w-full"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 mt-10">
              Build Your Professional Resume in
              <span className="text-violet-600"> Minutes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create stunning, ATS-friendly resumes in minutes. Our AI analyzes job descriptions and optimizes your resume for maximum impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleStartBuilding}
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-200"
              >
                Build Now
              </button>
              <button 
                onClick={handleReachOut}
                className="bg-white hover:bg-gray-50 text-violet-600 border-2 border-violet-600 px-8 py-4 rounded-lg text-lg font-semibold transform hover:scale-105 transition duration-200"
              >
                Reach Out 
              </button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="mt-16">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">Sample AI-Generated Resume</h3>
                <div className="bg-white text-gray-800 p-4 rounded">
                  <div className="border-b-2 border-gray-200 pb-2 mb-4">
                    <h4 className="text-xl font-bold text-gray-900">Ramesh Pathak</h4>
                    <p className="text-gray-600">Software Engineer | ramesh@email.com | +91 9343434343</p>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-gray-900">Professional Summary</h5>
                      <p className="text-sm text-gray-700">Experienced software engineer with 5+ years developing scalable web applications...</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Key Skills</h5>
                      <p className="text-sm text-gray-700">JavaScript, React, Node.js, Python, AWS, Docker</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our AI Resume Builder?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI technology that understands what employers are looking for
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-8 rounded-xl shadow-lg">
              <div className="bg-violet-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI-Powered Optimization</h3>
              <p className="text-gray-600">
                Our AI analyzes job descriptions and optimizes your resume with relevant keywords and skills.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl shadow-lg">
              <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">ATS-Friendly Templates</h3>
              <p className="text-gray-600">
                Professionally designed templates that pass through Applicant Tracking Systems with ease.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-lg">
              <div className="bg-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Create a professional resume in under 5 minutes with our streamlined process.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-xl shadow-lg">
              <div className="bg-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Beautiful Templates</h3>
              <p className="text-gray-600">
                Choose from a variety of professionally designed templates that make you stand out.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-xl shadow-lg">
              <div className="bg-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is encrypted and secure. We never share your personal information.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-xl shadow-lg">
              <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600">
                Get help whenever you need it with our round-the-clock customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your professional resume in just 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-violet-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Template</h3>
              <p className="text-gray-600">
                Select from our collection of professional templates designed for different industries.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-violet-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fill Information</h3>
              <p className="text-gray-600">
                Input your details, experience, and skills. Our AI will help optimize your content.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-violet-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Download & Apply</h3>
              <p className="text-gray-600">
                Download your professional resume in multiple formats and start applying to jobs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that best fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 flex items-center">
                  <FaIndianRupeeSign className="inline-block mr-1"/>
                  <span>0</span>
                </span>
                <span className="text-gray-600">/month</span>
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
              <button 
                onClick={handleStartBuilding}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-semibold transition duration-200"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-violet-600 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-violet-600 text-white px-4 py-2 rounded-full text-sm font-semibold">Most Popular</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 flex items-center">
                  <FaIndianRupeeSign className="inline-block mr-1"/>
                  <span>199</span>
                </span>
                <span className="text-gray-600">/month</span>
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
              <button className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg font-semibold transition duration-200">
                Start Pro Trial
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 flex items-center">
                  <FaIndianRupeeSign className="inline-block mr-1"/>
                  <span>299</span>
                </span>
                <span className="text-gray-600">/month</span>
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
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-violet-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="text-xl text-violet-100 mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who have landed their dream jobs with our AI-powered resume builder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartBuilding}
              className="bg-white hover:bg-gray-100 text-violet-600 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transform hover:scale-105 transition duration-200"
            >
              Start Building Now
            </button>
            <button className="bg-transparent hover:bg-violet-700 text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold transform hover:scale-105 transition duration-200">
              View Templates
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">AI Resume Builder</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                The most advanced AI-powered resume builder that helps you create professional resumes that get you hired.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Templates</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 AI Resume Builder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Aisaathi</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-lg font-semibold text-gray-800">+91 95552 22841</span>
                </div>
                
                <div className="bg-violet-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-center">
                    <span className="font-semibold">Hello Aisaathi,</span><br />
                    I need a little help in building my resume
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex space-x-3">
                <button
                  onClick={closeContactModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LandingPage
