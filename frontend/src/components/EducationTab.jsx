import React, { useState } from 'react';

const degrees = [
  'Bachelor of Science',
  'Bachelor of Arts',
  'Bachelor of Commerce',
  'Master of Science',
  'Master of Arts',
  'Master of Commerce',
  'PhD',
  'Other',
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() + 5 - i);

const emptyEducation = {
  schoolName: '',
  schoolLocation: '',
  fieldOfStudy: '',
  percentage: '',
  gradMonth: '',
  gradYear: '',
  coursework: '',
};

const EducationTab = (props) => {
  const { onGoBack, onNext, formData, updateFormData, selectedTemplate, fullFormData } = props;
  const isEditingMode = !onNext || !onGoBack;
  const [showCoursework, setShowCoursework] = useState([false]);

  const educations = formData && formData.length > 0 ? formData : [{ ...emptyEducation }];

  const handleChange = (idx, e) => {
    const { name, value } = e.target;
    const updatedEducations = educations.map((ed, i) => i === idx ? { ...ed, [name]: value } : ed);
    updateFormData(updatedEducations);
  };

  const handleAddEducation = () => {
    const newEducations = [...educations, { ...emptyEducation }];
    updateFormData(newEducations);
    setShowCoursework((prev) => [...prev, false]);
  };

  const handleToggleCoursework = (idx) => {
    setShowCoursework((prev) => prev.map((v, i) => i === idx ? !v : v));
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
          education: educations, 
          experience: fullFormData?.experience || [], 
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
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
          Education Information
        </h1>
      </div>
      
      {/* Main content area with flex layout */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: 32 }}>
        
        {/* Left section - Form */}
        <div style={{ 
          flex: 3, 
          background: '#f8f9fa', 
          borderRadius: 16, 
          padding: '16px',
          height: '600px',
          width:'420px',
          overflowY: 'auto'
        }}>
          {!isEditingMode && (
            <button
              onClick={onGoBack}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748b',
                fontSize: 14,
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
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', marginBottom: 8, margin: '0 0 8px 0' }}>
             Add your educational qualifications
            </h3>
            
            {/* Required field indicator */}
            <div style={{ position: 'absolute', top: -40, right: 0, fontSize: 12, fontWeight: 500, color: '#ef4444',}}>
              * indicates a required field
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {educations.map((form, idx) => (
                <div key={idx} style={{ position: 'relative', border: '1.5px solid #d1d5db', borderRadius: 12, padding: 24, background: '#fff', marginBottom: 16 }}>
                  {idx === 0 && (
                    <button
                      type="button"
                      onClick={handleAddEducation}
                      style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        fontSize: 18,
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Row 1: School Name and School Location */}
                    <div style={{ display: 'flex', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>School/University Name *</label>
                        <input
                          type="text"
                          name="schoolName"
                          value={form.schoolName}
                          onChange={(e) => handleChange(idx, e)}
                          placeholder="Enter school or university name"
                          required
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>Location</label>
                        <input
                          type="text"
                          name="schoolLocation"
                          value={form.schoolLocation}
                          onChange={(e) => handleChange(idx, e)}
                          placeholder="City, State"
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }}
                        />
                      </div>
                    </div>

                    {/* Row 2: Field of Study and Percentage/CGPA */}
                    <div style={{ display: 'flex', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>Field of Study *</label>
                        <input
                          type="text"
                          name="fieldOfStudy"
                          value={form.fieldOfStudy}
                          onChange={(e) => handleChange(idx, e)}
                          placeholder="e.g., Computer Science, Business Administration"
                          required
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>Percentage/CGPA</label>
                        <input
                          type="text"
                          name="percentage"
                          value={form.percentage}
                          onChange={(e) => handleChange(idx, e)}
                          placeholder="e.g., 85% or 3.8 CGPA"
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }}
                        />
                      </div>
                    </div>

                    {/* Row 3: Graduation Month and Graduation Year */}
                    <div style={{ display: 'flex', gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>Month</label>
                        <select
                          name="gradMonth"
                          value={form.gradMonth}
                          onChange={(e) => handleChange(idx, e)}
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, background: 'white' }}
                        >
                          <option value="">Select month</option>
                          {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                          ))}
                        </select>
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 600, fontSize: 13 }}>Year</label>
                        <select
                          name="gradYear"
                          value={form.gradYear}
                          onChange={(e) => handleChange(idx, e)}
                          style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, background: 'white' }}
                        >
                          <option value="">Select year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Row 4: Coursework Section */}
                    <div style={{ width: '100%' }}>
                      <div
                        style={{ cursor: 'pointer', color: '#2563eb', fontWeight: 600, fontSize: 16, marginBottom: 8 }}
                        onClick={() => handleToggleCoursework(idx)}
                      >
                        {showCoursework[idx] ? '▼' : '▶'} Add extra courses you're proud of
                      </div>
                      {showCoursework[idx] && (
                        <div style={{ padding: 12, background: '#f9fafb', borderRadius: 6, border: '1px solid #e5e7eb', marginBottom: 8 }}>
                          <textarea
                            name="coursework"
                            value={form.coursework}
                            onChange={(e) => handleChange(idx, e)}
                            placeholder="List any additional coursework, achievements, or certifications..."
                            rows={3}
                            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, resize: 'vertical' }}
                          />
                          <div style={{ marginTop: 6, fontSize: 12 }}>
                            <span style={{ color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}>Look</span> here for sample resume references
                          </div>
                          <div style={{ marginTop: 12, background: '#e0e7ff', borderRadius: 6, padding: 10, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                            <span style={{ fontSize: 20, color: '#2563eb' }}>💡</span>
                            <div style={{ fontSize: 13, color: '#374151' }}>
                              <b>Hint</b> You can list any online courses, workshops, or certifications you've completed outside your regular studies.Python for Beginners – Coursera

Digital Marketing – Google

Web Development Bootcamp – Udemy

Advanced Excel – Microsoft </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: -5 }}>
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
        <div style={{ 
          flex: 1, 
          background: '#fff', 
          borderRadius: 16, 
          boxShadow: '0 4px 24px rgba(10,24,51,0.08)', 
          padding: '20px', 
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '700px',
          position: 'relative',
          marginTop:'-80px'
        }}>
          <div style={{ 
            transform: 'scale(0.75)', 
            transformOrigin: 'top center',
            maxWidth: '100%',
            overflow: 'auto',
            marginTop: '220px',
            maxHeight:'1000px',
          }}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationTab;
