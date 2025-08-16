import React, { useState, useEffect } from 'react'
import HeadingTab from './HeadingTab'
import TemplateTab from './TemplateTab';
import Template1 from './Templates/Template1';
import Template2 from './Templates/Template2';
import EducationTab from './EducationTab';
import ExperienceTab from './ExperienceTab';
import SkillsTab from './SkillsTab';
import SummaryTab from './SummaryTab';
import FinalizeTab from './FinalizeTab';

const steps = [
  { number: 1, label: 'Templates'},
  { number: 2, label: 'Profile' },
  { number: 3, label: 'Education' },
  { number: 4, label: 'Experience' },
  { number: 5, label: 'Skills' },
  { number: 6, label: 'Career Overview' },
  { number: 7, label: 'Wrap-Up' },
];

const templateComponents = [
  <Template1 key={0} />,
  <Template2 key={1} />,
  <div key={2} style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:60}}><span role="img" aria-label="resume">📄</span></div>,
];

const FirstPage = ({ onLogout }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const [selectedTemplateIdx, setSelectedTemplateIdx] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSettingsOpen && !event.target.closest('.settings-container')) {
        setIsSettingsOpen(false);
      }
      if (isProfileOpen && !event.target.closest('.profile-container')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen, isProfileOpen]);

  // Centralized state for all form data
  const [formData, setFormData] = useState({
    heading: {
      firstName: '',
      surname: '',
      profession: '',
      city: '',
      country: '',
      pin: '',
      phone: '',
      email: '',
      photo: null,
    },
    education: [],
    experience: [],
    skills: [],
    summary: '',
  });

  // Calculate resume completeness
  const calculateCompleteness = () => {
    let completedSections = 0; 
    const totalSections = 5; // heading, education, experience, skills, summary

    // Check heading section (20% - 4 points)
    const heading = formData.heading;
    const headingFields = [heading.firstName, heading.surname, heading.profession, heading.city, heading.country, heading.pin, heading.phone, heading.email];
    const filledHeadingFields = headingFields.filter(field => field && field.trim() !== '').length;
    if (filledHeadingFields >= 6) { // At least 6 out of 8 fields filled
      completedSections += 1;
    }

    // Check education section (20% - 4 points)
    if (formData.education.length > 0 && formData.education.some(edu => edu.schoolName && edu.schoolName.trim() !== '')) {
      completedSections += 1;
    }

    // Check experience section (20% - 4 points)
    if (formData.experience.length > 0 && formData.experience.some(exp => exp.jobTitle && exp.jobTitle.trim() !== '')) {
      completedSections += 1;
    }

    // Check skills section (20% - 4 points)
    if (formData.skills.length > 0 && formData.skills.some(skill => skill && skill.trim() !== '')) {
      completedSections += 1;
    }

    // Check summary section (20% - 4 points)
    if (formData.summary && formData.summary.trim() !== '') {
      completedSections += 1;
    }

    return Math.round((completedSections / totalSections) * 100);
  };

  const completeness = calculateCompleteness();

  const handleStepClick = (stepIndex) => {
    setSelectedStep(stepIndex);
  };

  const handleTemplateSelect = (templateIndex) => {
    setSelectedTemplateIdx(templateIndex);
    setSelectedStep(1);
  };

  const handleNextEducation = () => {
    setSelectedStep(2);
  };

  const handleNextExperience = () => {
    setSelectedStep(3);
  };

  const handleNextSkills = () => {
    setSelectedStep(4);
  };

  const handleNextSummary = () => {
    setSelectedStep(5);
  };

  const handleNextFinalize = () => {
    setSelectedStep(6);
  };

  const handleGoBack = (stepIndex) => {
    setSelectedStep(stepIndex);
  };

  const updateHeading = (newHeading) => {
    setFormData(prev => ({
      ...prev,
      heading: newHeading
    }));
  };

  const updateEducation = (newEducation) => {
    setFormData(prev => ({
      ...prev,
      education: newEducation
    }));
  };

  const updateExperience = (newExperience) => {
    setFormData(prev => ({
      ...prev,
      experience: newExperience
    }));
  };

  const updateSkills = (newSkills) => {
    setFormData(prev => ({
      ...prev,
      skills: newSkills
    }));
  };

  const updateSummary = (newSummary) => {
    setFormData(prev => ({
      ...prev,
      summary: newSummary
    }));
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback: redirect to landing page
      window.location.href = '/';
    }
  };

  return (
    <div style={{ background: '#f3e8ff', minHeight: '100vh' }}>
      {/* Mobile Menu Toggle */}
      {isMobile && (
        <div style={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1000,
          background: '#2a003f',
          border: '2px solid white',
          borderRadius: '8px',
          padding: '8px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div style={{
            width: 16,
            height: 1.5,
            background: 'white',
            margin: '4px 0',
            transition: '0.3s',
            transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
          }} />
          <div style={{
            width: 24,
            height: 2,
            background: 'white',
            margin: '4px 0',
            transition: '0.3s',
            opacity: isMobileMenuOpen ? 0 : 1,
          }} />
          <div style={{
            width: 24,
            height: 2,
            background: 'white',
            margin: '4px 0',
            transition: '0.3s',
            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }} />
        </div>
      )}

      {/* Sidebar */}
      <div style={{
        background: '#2a003f',
        color: 'white',
        width: isMobile ? '50%' : 200,
        height: isMobile ? '100vh' : '100vh',
        position: 'fixed',
        top: 0,
        left: isMobile ? (isMobileMenuOpen ? 0 : '-100%') : 0,
        padding: isMobile ? '80px 24px 24px' : '32px 24px',
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        zIndex: 10,
        boxSizing: 'border-box',
        transition: 'left 0.3s ease',
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div style={{ 
          fontWeight: 700, 
          fontSize: isMobile ? 16 : 18, 
          marginBottom: 20, 
          letterSpacing: 1,
          textAlign: isMobile ? 'center' : 'left',
          width: '100%',
        }}>
          Build Resume<span style={{ color: '#c4b5fd', fontSize: isMobile ? 14 : 13, marginLeft: 4 }}></span>
        </div>
        
        {/* Stepper */}
        <div style={{ marginBottom: 30, width: '100%' }}>
          {steps.map((step, idx) => (
            <div
              key={step.number}
              onClick={() => handleStepClick(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: idx < steps.length - 1 ? 12 : 0,
                cursor: 'pointer',
                opacity: selectedStep === idx ? 1 : 0.85,
                padding: isMobile ? '6px 0' : '0',
              }}
            >
              {/* Step circle or check */}
              <div style={{
                width: isMobile ? 24 : 28,
                height: isMobile ? 24 : 28,
                borderRadius: '50%',
                background: selectedStep === idx ? 'white' : 'transparent',
                border: '2px solid white',
                color: selectedStep === idx ? '#7c3aed' : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: isMobile ? 10 : 12,
                position: 'relative',
                zIndex: 1,
                transition: 'background 0.2s, color 0.2s',
                flexShrink: 0,
              }}>
                {step.number}
              </div>
              {/* Step label */}
              <span style={{
                marginLeft: 10,
                fontWeight: selectedStep === idx ? 700 : 500,
                color: selectedStep === idx ? 'white' : '#ede9fe',
                fontSize: isMobile ? 10 : 12,
                textShadow: selectedStep === idx ? '0 0 8px #fff' : 'none',
                transition: 'color 0.2s',
                wordBreak: 'break-word',
              }}>{step.label}</span>
            </div>
          ))}
        </div>
        
        {/* Progress bar */}
        <div style={{ marginTop: 'auto', width: '100%' }}>
          <div style={{ 
            fontSize: isMobile ? 12 : 14, 
            fontWeight: 700, 
            color: '#c4b5fd', 
            marginBottom: 6,
            textAlign: isMobile ? 'center' : 'left',
          }}>
            Status:
          </div>
            <div style={{
            width: '100%', 
            height: 6, 
            background: 'rgba(255,255,255,0.2)', 
            borderRadius: 3,
              overflow: 'hidden',
            }}>
              <div style={{
              width: `${calculateCompleteness()}%`, 
              height: '100%', 
                background: '#c4b5fd',
              borderRadius: 3,
              transition: 'width 0.3s ease',
              }} />
            </div>
          <div style={{ 
            fontSize: isMobile ? 11 : 13, 
            color: '#ede9fe', 
            marginTop: 6,
            textAlign: isMobile ? 'center' : 'left',
          }}>
            {calculateCompleteness()}% Complete
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div style={{ 
          marginTop: 16, 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          {/* Help Button */}
          <button
            style={{
              background: 'transparent',
              border: '1px solid #c4b5fd',
              color: '#c4b5fd',
              padding: '8px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: isMobile ? 10 : 11,
              fontWeight: 500,
              transition: 'all 0.2s',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#c4b5fd';
              e.target.style.color = '#2a003f';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#c4b5fd';
            }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Help
          </button>

          {/* Profile Button */}
          <div className="profile-container" style={{ position: 'relative' }}>
            <button
              style={{
                background: 'transparent',
                border: '1px solid #c4b5fd',
                color: '#c4b5fd',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: isMobile ? 10 : 11,
                fontWeight: 500,
                transition: 'all 0.2s',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#c4b5fd';
                e.target.style.color = '#2a003f';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#c4b5fd';
              }}
              onClick={handleProfileClick}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile
            </button>

            {/* Profile Popup */}
            {isProfileOpen && (
              <>
                {/* Backdrop Overlay */}
                <div 
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 999,
                  }}
                  onClick={() => setIsProfileOpen(false)}
                />
                
                {/* Profile Popup */}
                <div style={{
                  position: 'fixed',
                  top: '40px', // Position at top with 40px margin
                  left: isMobile?'50%':'55%', // Center horizontally
                  transform: 'translateX(-50%)', // Center the popup
                  background: 'white',
                  border: '2px solid #c4b5fd',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  zIndex: 1000,
                  width: isMobile ? 'calc(100% - 90px)' : '280px',
                  minHeight: '190px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {/* Close Button */}
                  <button
                    onClick={() => setIsProfileOpen(false)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'transparent';
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Profile Content */}
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    {/* Avatar */}
                    <div style={{
                      width: isMobile ? '60px' : '80px',
                      height: isMobile ? '60px' : '80px',
                      background: 'linear-gradient(135deg, #c4b5fd 0%, #8b5cf6 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      fontSize: isMobile ? '24px' : '32px',
                      fontWeight: 'bold',
                      color: 'white',
                      boxShadow: '0 4px 16px rgba(196, 181, 253, 0.3)',
                    }}>
                      {(() => {
                        const userData = localStorage.getItem('userData');
                        if (userData) {
                          try {
                            const parsed = JSON.parse(userData);
                            return parsed.name ? parsed.name.charAt(0).toUpperCase() : 'U';
                          } catch (e) {
                            return 'U';
                          }
                        }
                        return 'U';
                      })()}
                    </div>
                    
                    {/* User Name */}
                    <div style={{
                      fontSize: isMobile ? '18px' : '20px',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '8px',
                      lineHeight: '1.2',
                    }}>
                      {(() => {
                        const userData = localStorage.getItem('userData');
                        if (userData) {
                          try {
                            const parsed = JSON.parse(userData);
                            return parsed.name || 'User Name';
                          } catch (e) {
                            return 'User Name';
                          }
                        }
                        return 'User Name';
                      })()}
                    </div>
                    
                    {/* Email */}
                    <div style={{
                      fontSize: isMobile ? '12px' : '14px',
                      color: '#6b7280',
                      marginBottom: '20px',
                      lineHeight: '1.4',
                    }}>
                      {(() => {
                        const userData = localStorage.getItem('userData');
                        if (userData) {
                          try {
                            const parsed = JSON.parse(userData);
                            return parsed.email || 'user@email.com';
                          } catch (e) {
                            return 'user@email.com';
                          }
                        }
                        return 'user@email.com';
                      })()}
                    </div>

                    {/* Profile Status */}
                    <div style={{
                      background: '#f0f9ff',
                      border: '1px solid #0ea5e9',
                      borderRadius: '20px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#0369a1',
                      display: 'inline-block',
                    }}>
                      Active User
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Settings Button with Dropdown */}
          <div className="settings-container" style={{ position: 'relative' }}>
            <button
              style={{
                background: 'transparent',
                border: '1px solid #c4b5fd',
                color: '#c4b5fd',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: isMobile ? 10 : 11,
                fontWeight: 500,
                transition: 'all 0.2s',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#c4b5fd';
                e.target.style.color = '#2a003f';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#c4b5fd';
              }}
              onClick={handleSettingsClick}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.996.797 2.41.067 3.14A2.89 2.89 0 0016 18.25a2.89 2.89 0 002.92-2.69c.007-.07.007-.14.007-.21 0-.07-.007-.14-.007-.21A2.89 2.89 0 0016 13.5a2.89 2.89 0 00-2.92-2.69c-.007-.07-.007-.14-.007-.21 0-.07.007-.14.007-.21A2.89 2.89 0 0016 8.75a2.89 2.89 0 00-2.92-2.69c-.007-.07-.007-.14-.007-.21 0-.07.007-.14.007-.21A2.89 2.89 0 0016 4z" />
              </svg>
              Settings
            </button>

            {/* Settings Dropdown - Integrated Sub-button Style */}
            {isSettingsOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                right: '0',
                background: 'transparent',
                border: 'none',
                padding: '0',
                marginTop: '2px',
                zIndex: 100,
                width: '100%',
              }}>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(196, 181, 253, 0.1)',
                    border: '1px solid #c4b5fd',
                    borderTop: 'none',
                    borderTopLeftRadius: '0',
                    borderTopRightRadius: '0',
                    borderBottomLeftRadius: '6px',
                    borderBottomRightRadius: '6px',
                    color: '#c4b5fd',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontSize: isMobile ? 9 : 10,
                    fontWeight: 500,
                    textAlign: 'center',
                    width: '100%',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(196, 181, 253, 0.2)';
                    e.target.style.color = '#e9d5ff';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(196, 181, 253, 0.1)';
                    e.target.style.color = '#c4b5fd';
                  }}
                >
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 5,
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div style={{
        marginLeft: isMobile ? 0 : 240,
        minHeight: '100vh',
        maxHeight: '100vh',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: isMobile ? '80px 16px 16px' : '0',
        width: isMobile ? '100%' : 'auto',
      }}>
        {selectedStep === 0 && <TemplateTab onUseTemplate={handleTemplateSelect} />}
        {selectedStep === 1 && (
          <HeadingTab 
            selectedTemplate={React.cloneElement(templateComponents[selectedTemplateIdx], { formData })}
            onNext={handleNextEducation} 
            onGoBack={() => handleGoBack(0)}
            formData={formData.heading}
            updateFormData={updateHeading}
            fullFormData={formData}
          />
        )}
        {selectedStep === 2 && (
          <EducationTab 
            selectedTemplate={React.cloneElement(templateComponents[selectedTemplateIdx], { formData })}
            onGoBack={() => handleGoBack(1)} 
            onNext={handleNextExperience}
            formData={formData.education}
            updateFormData={updateEducation}
            fullFormData={formData}
          />
        )}
        {selectedStep === 3 && (
          <ExperienceTab 
            selectedTemplate={React.cloneElement(templateComponents[selectedTemplateIdx], { formData })}
            onGoBack={() => handleGoBack(2)}
            onNext={handleNextSkills}
            formData={formData.experience}
            updateFormData={updateExperience}
            fullFormData={formData}
          />
        )}
        {selectedStep === 4 && (
          <SkillsTab 
            selectedTemplate={React.cloneElement(templateComponents[selectedTemplateIdx], { formData })}
            onGoBack={() => handleGoBack(3)}
            onNext={handleNextSummary}
            formData={formData.skills}
            updateFormData={updateSkills}
            fullFormData={formData}
          />
        )}
        {selectedStep === 5 && (
          <SummaryTab 
            selectedTemplate={React.cloneElement(templateComponents[selectedTemplateIdx], { formData })}
            onGoBack={() => handleGoBack(4)}
            onNext={handleNextFinalize}
            formData={formData.summary}
            updateFormData={updateSummary}
            fullFormData={formData}
          />
        )}
        {selectedStep === 6 && (
          <FinalizeTab 
            onGoBack={() => handleGoBack(5)}
            selectedTemplate={selectedTemplateIdx}
            formData={formData}
            updateSummary={updateSummary}
            updateEducation={updateEducation}
            updateExperience={updateExperience}
            updateSkills={updateSkills}
            updateHeading={updateHeading}
          />
        )}
      </div>
    </div>
  )
}

export default FirstPage
