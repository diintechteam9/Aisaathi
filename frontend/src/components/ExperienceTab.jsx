import React, { useState, useEffect } from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() + 5 - i);

const jobTypes = [
  'Full-time',
  'Part-time',
  'Freelance',
  'Contract',
  'Internship',
  'Temporary',
  'Remote'
];

const emptyExperience = {
  jobTitle: '',
  jobType: jobTypes[0],
  companyName: '',
  location: '',
  jobDescription: '',
  startMonth: '',
  startYear: '',
  endMonth: '',
  endYear: '',
  currentRole: true,
};

const ExperienceTab = (props) => {
  const { onGoBack, onNext, formData, updateFormData, selectedTemplate, fullFormData } = props;
  const isEditingMode = !onNext || !onGoBack;
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const experiences = formData && formData.length > 0 ? formData : [{ ...emptyExperience }];

  const handleChange = (idx, field, value) => {
    let updatedExperiences = experiences.map((exp, i) => {
      if (i === idx) {
        const updatedExp = { ...exp, [field]: value };
        
        // If end date is being set, automatically set currentRole to false
        if (field === 'endMonth' || field === 'endYear') {
          if (field === 'endMonth') {
            updatedExp.endMonth = value;
          } else {
            updatedExp.endYear = value;
          }
          // If either end month or year is filled, set currentRole to false
          if (updatedExp.endMonth || updatedExp.endYear) {
            updatedExp.currentRole = false;
          }
        }
        
        // If currentRole is being set to true, clear end date
        if (field === 'currentRole' && value === true) {
          updatedExp.endMonth = '';
          updatedExp.endYear = '';
        }
        
        return updatedExp;
      }
      return exp;
    });
    updateFormData(updatedExperiences);
  };

  const handleAddExperience = () => {
    const newExperiences = [...experiences, { ...emptyExperience }];
    updateFormData(newExperiences);
  };

  const handleSave = () => {
    if (onNext) {
      onNext();
    }
  };

  const renderTemplate = () => {
    if (selectedTemplate && React.isValidElement(selectedTemplate)) {
      return React.cloneElement(selectedTemplate, { 
        formData: { 
          heading: fullFormData?.heading || {}, 
          education: fullFormData?.education || [], 
          experience: experiences, 
          skills: fullFormData?.skills || [], 
          summary: fullFormData?.summary || '' 
        } 
      });
    }
    return (
      <div style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontSize: 60 
      }}>
        <span role="img" aria-label="resume">📄</span>
      </div>
    );
  };

  return (
    <div style={{ 
      maxWidth: 1400, 
      margin: '0 auto', 
      padding: isMobile ? '1rem 0.5rem' : '2rem 1rem',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        marginLeft: isMobile ? '90px' : '10px',
      }}>
        <h1 style={{ 
          marginTop: isMobile ? '-120px' : '-10px',
          fontSize: isMobile ? 25 : 32, 
          fontWeight: 700, 
          margin: 0 
        }}>
          Experience
        </h1>
      </div>
      
      {/* Main content area with flex layout */}
      <div style={{ 
        display: 'flex', 
        gap: isMobile ? '0px' : '20px', 
        marginBottom: 32,
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%'
      }}>
        
        {/* Left section - Form */}
        <div style={{ 
          flex: isMobile ? 'none' : 3, 
          background: '#f8f9fa', 
          borderRadius: 16, 
          padding: isMobile ? '12px' : '16px',
          height: isMobile ? '620px' : '645px',
          width: isMobile ? '100%' : '420px',
          maxWidth: isMobile ? '100%' : '420px',
          overflowY: 'auto',
          boxSizing: 'border-box',
          marginTop: isMobile ? '-45px' : '-10px',
          marginLeft: isMobile ? '0px' : '10px',
        }}>
          {!isEditingMode && (
            <button
              onClick={onGoBack}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: isMobile ? 12 : 14,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
                padding: 0,
              }}
            >
              <span>←</span> Go Back
            </button>
          )}
          
          <div style={{ position: 'relative' }}>
            <h3 style={{ 
              fontSize: isMobile ? 16 : 18, 
              fontWeight: 600, 
              color: '#1e293b', 
              marginBottom: 8, 
              margin: '0 0 4px 0' 
            }}>
              Add your professional experience and achievements
            </h3>
            
            {/* Required field indicator */}
            <div style={{ 
              position: 'absolute', 
              top: isMobile ? -42 : -40, 
              right: 0, 
              fontSize: 12, 
              fontWeight: 500, 
              color: '#ef4444',
            }}>
              * indicates a required field
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {experiences.map((exp, idx) => (
                <div key={idx} style={{ 
                  position: 'relative', 
                  border: '1.5px solid #d1d5db', 
                  borderRadius: 12, 
                  padding: isMobile ? '16px' : '24px', 
                  background: '#fff', 
                  marginBottom: 16,
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  {idx === 0 && (
                    <button
                      type="button"
                      onClick={handleAddExperience}
                      style={{
                        position: 'absolute',
                        top: isMobile ? 12 : 16,
                        right: isMobile ? 12 : 16,
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: isMobile ? 28 : 32,
                        height: isMobile ? 28 : 32,
                        fontSize: isMobile ? 16 : 18,
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                  )}
                  
                  {/* Two column layout for form fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
                    {/* Row 1: Job Title and Job Type */}
                    <div style={{ display: 'flex', gap: isMobile ? 8 : 12, width: '100%' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>Job Title *</label>
                        <input
                          type="text"
                          name="jobTitle"
                          value={exp.jobTitle}
                          onChange={(e) => handleChange(idx, 'jobTitle', e.target.value)}
                          placeholder="e.g., Software Engineer"
                          required
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, boxSizing: 'border-box' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>Job Type</label>
                        <select
                          name="jobType"
                          value={exp.jobType}
                          onChange={(e) => handleChange(idx, 'jobType', e.target.value)}
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, background: 'white', boxSizing: 'border-box' }}
                        >
                          {jobTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 2: Company Name and Location */}
                    <div style={{ display: 'flex', gap: isMobile ? 8 : 12, width: '100%' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>Company Name *</label>
                        <input
                          type="text"
                          name="companyName"
                          value={exp.companyName}
                          onChange={(e) => handleChange(idx, 'companyName', e.target.value)}
                          placeholder="Company Name"
                          required
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, boxSizing: 'border-box' }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>Location</label>
                        <input
                          type="text"
                          name="location"
                          value={exp.location}
                          onChange={(e) => handleChange(idx, 'location', e.target.value)}
                          placeholder="City, State"
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    {/* Row 3: Start Month and Start Year */}
                    <div style={{ display: 'flex', gap: isMobile ? 8 : 12, width: '100%' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>Start Month</label>
                        <select
                          name="startMonth"
                          value={exp.startMonth}
                          onChange={(e) => handleChange(idx, 'startMonth', e.target.value)}
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, background: 'white', boxSizing: 'border-box' }}
                        >
                          <option value="">Select month</option>
                          {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>Start Year</label>
                        <select
                          name="startYear"
                          value={exp.startYear}
                          onChange={(e) => handleChange(idx, 'startYear', e.target.value)}
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, background: 'white', boxSizing: 'border-box' }}
                        >
                          <option value="">Select year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 4: End Month and End Year (only if not current role) */}
                    {!exp.currentRole && (
                      <div style={{ display: 'flex', gap: isMobile ? 8 : 12, width: '100%' }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontWeight: 600, fontSize: 13 }}>End Month</label>
                          <select
                            name="endMonth"
                            value={exp.endMonth}
                            onChange={(e) => handleChange(idx, 'endMonth', e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, background: 'white', boxSizing: 'border-box' }}
                          >
                            <option value="">Select month</option>
                            {months.map((month) => (
                              <option key={month} value={month}>{month}</option>
                            ))}
                          </select>
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontWeight: 600, fontSize: 13 }}>End Year</label>
                          <select
                            name="endYear"
                            value={exp.endYear}
                            onChange={(e) => handleChange(idx, 'endYear', e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, background: 'white', boxSizing: 'border-box' }}
                          >
                            <option value="">Select year</option>
                            {years.map((y) => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Row 5: Job Description (full width) */}
                    <div style={{ width: '100%' }}>
                      <label style={{ fontWeight: 600, fontSize: 13 }}>Job Description</label>
                      <textarea
                        name="jobDescription"
                        value={exp.jobDescription}
                        onChange={(e) => handleChange(idx, 'jobDescription', e.target.value)}
                        placeholder="Describe your responsibilities, achievements, and key contributions..."
                        rows={4}
                        style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, resize: 'vertical', boxSizing: 'border-box' }}
                      />
                    </div>

                    {/* Row 6: Current Role Toggle */}
                    <div style={{ width: '100%' }}>
                      <button
                        type="button"
                        onClick={() => handleChange(idx, 'currentRole', !exp.currentRole)}
                        style={{
                          border: exp.currentRole ? '2px solid #2563eb' : '1.5px solid #d1d5db',
                          background: exp.currentRole ? '#eff6ff' : '#fff',
                          color: exp.currentRole ? '#2563eb' : '#374151',
                          fontWeight: 600,
                          fontSize: 13,
                          borderRadius: 30,
                          padding: '8px 28px',
                          cursor: 'pointer',
                          outline: 'none',
                          transition: 'all 0.2s ease',
                          width: '100%'
                        }}
                      >
                        {exp.currentRole ? '✓ Currently Working' : 'Set as Current Role'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 0 }}>
            {isEditingMode ? (
              <button
                type="button"
                onClick={handleSave}
                style={{
                  border: 'none',
                  background: '#2563eb',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 30,
                  padding: '10px 36px',
                  cursor: 'pointer',
                }}
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                style={{
                  border: 'none',
                  background: '#6b3b7a',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 30,
                  padding: '10px 36px',
                  cursor: 'pointer',
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>

        {/* Right section - Template Preview with User Data */}
        {!isMobile && (
          // <div style={{ 
          //   flex: 1, 
          //   background: '#fff', 
          //   borderRadius: 16, 
          //   boxShadow: '0 4px 24px rgba(10,24,51,0.08)', 
          //   padding: '20px', 
          //   display: 'flex',
          //   justifyContent: 'flex-end',
          //   alignItems: 'center',
          //   height: '700px',
          //   position: 'relative',
          //   marginTop:'-80px'
          // }}>
            <div style={{ 
              flex: 1, 
               transform: 'scale(0.75)', 
               transformOrigin: 'top center',
               maxWidth: '100%',
               width: '800px',  
               height:'100%',
               overflow: 'auto',
               marginTop: '-80px',
               maxHeight:'1000px'
            }}>
              {renderTemplate()}
            </div>
          // </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceTab;
