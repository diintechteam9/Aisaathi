import React, { useState, useRef, useEffect } from 'react';

const HeadingTab = (props) => {
  const { onGoBack, onNext, formData, updateFormData, selectedTemplate, fullFormData } = props;
  const isEditingMode = !onNext || !onGoBack; // Check if we're in editing mode
  const fileInputRef = useRef(null);
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

  // Initialize with formData if it exists, otherwise use default
  const heading = formData || {
    firstName: '',
    surname: '',
    profession: '',
    city: '',
    country: '',
    pin: '',
    phone: '',
    email: '',
    photo: null,
  };

  // Validation function to check if all required fields are filled
  const isFormValid = () => {
    return (
      heading.firstName.trim() !== '' &&
      heading.surname.trim() !== '' &&
      heading.profession.trim() !== '' &&
      heading.city.trim() !== '' &&
      heading.country.trim() !== '' &&
      heading.pin.trim() !== '' &&
      heading.phone.trim() !== '' &&
      heading.email.trim() !== ''
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ ...heading, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateFormData({ ...heading, photo: event.target.result });
      };
      reader.readAsDataURL(file);
    }
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
          heading, 
          education: fullFormData?.education || [], 
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
        marginBottom: '10px',
        marginLeft: isMobile ? '90px' : '10px',
      }}>
        <h1 style={{ 
          marginTop:isMobile ? '-120px' : '-10px',
          fontSize:isMobile? 25 : 32, fontWeight: 700, margin: 0 }}>
          Profile 
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
          height: isMobile ? '580px' : '648px',
          width: isMobile ? '100%' : '420px',
          maxWidth: isMobile ? '100%' : '420px',
          overflowY: 'auto',
          boxSizing: 'border-box',
          marginTop: isMobile ? '-40px' : '-10px',
          marginLeft: isMobile ? '0px' : '10px',
        }}>
          {!isEditingMode && (
            <button
              type="button"
              onClick={onGoBack}
              style={{
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: isMobile? 12 :16,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                marginBottom: 0
              }}
            >
              &larr; Go Back
            </button>
          )}
          {!isEditingMode && (
            <h1 style={{ 
              fontSize: isMobile ? 20 : 28, fontWeight: 700, margin: '0rem 0 0.5rem' }}>
              Let's start with the basics
            </h1>
          )}
          <div style={{ 
            background: '#f8faff', 
            borderRadius: 16, 
            padding: isMobile ? '20px 16px 16px 16px' : '28px 24px 24px 24px', 
            marginBottom: 32, 
            boxShadow: '0 2px 12px rgba(10,24,51,0.04)', 
            position: 'relative',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {!isEditingMode && (
              <div style={{ 
                position: 'absolute', 
                top: isMobile ? -58 : -70, 
                right: 0, 
                color: '#ef4444', 
                fontSize: 12, 
                fontWeight: 500 
              }}>* indicates a required field</div>
            )}
            {/* Photo Upload - First Row */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 1, width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: isMobile ? 16 : 24, width: '100%' }}>
                <div style={{ position: 'relative', width: isMobile ? 80 : 110, height: isMobile ? 80 : 110, marginBottom: 10 }}>
                  <div style={{ 
                    width: isMobile ? 80 : 110, 
                    height: isMobile ? 80 : 110, 
                    borderRadius: '50%', 
                    background: '#f1f5f9', 
                    border: '2.5px solid #2563eb', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    overflow: 'hidden', 
                    boxShadow: '0 2px 8px rgba(30,41,59,0.08)' 
                  }}>
                    {heading.photo ? (
                      <img src={heading.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    ) : (
                      <span role="img" aria-label="avatar" style={{ fontSize: isMobile ? 32 : 48, color: '#cbd5e1' }}>👤</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: isMobile ? 28 : 38,
                      height: isMobile ? 28 : 38,
                      fontSize: isMobile ? 14 : 20,
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(30,41,59,0.10)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 0
                    }}
                    aria-label="Upload photo"
                  >
                    <span role="img" aria-label="upload">📷</span>
                  </button>
                  <div style={{ 
                    color: '#64748b', 
                    fontSize: isMobile ? 8 : 10, 
                    fontWeight: 500, 
                    marginLeft: 0, 
                    whiteSpace: 'nowrap', 
                    marginTop: 8 
                  }}>Upload a passport size photo</div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? 12 : 18, flex: 1, marginLeft: isMobile ? '20px' : '35px' }}>
                  <div>
                    <label style={{ fontWeight: 600, fontSize: 13 }}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={heading.firstName}
                      onChange={handleChange}
                      placeholder="Aarya"
                      required
                      style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 0, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }}
                    />
                  </div>
                  <div>
                    <label style={{ fontWeight: 600, fontSize: 13 }}>Surname *</label>
                    <input
                      type="text"
                      name="surname"
                      value={heading.surname}
                      onChange={handleChange}
                      placeholder="Sharma"
                      required
                      style={{ width: '100%', padding: 8, marginTop: 4, marginBottom: 0, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13 }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Form fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
              {/* Row 1: Profession and City */}
              <div style={{ display: 'flex', gap: isMobile ? 8 : 12, width: '100%' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, fontSize: 13 }}>Profession *</label>
                  <input
                    type="text"
                    name="profession"
                    value={heading.profession}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, fontSize: 13 }}>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={heading.city}
                    onChange={handleChange}
                    placeholder="Noida"
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Row 2: Country and Pin Code */}
              <div style={{ display: 'flex', gap: isMobile ? 8 : 12, width: '100%' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, fontSize: 13 }}>Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={heading.country}
                    onChange={handleChange}
                    placeholder="India"
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, fontSize: 13 }}>Pin Code *</label>
                  <input
                    type="text"
                    name="pin"
                    value={heading.pin}
                    onChange={handleChange}
                    placeholder="201102"
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {/* Row 3: Phone and Email */}
              <div style={{ display: 'flex', gap: isMobile ? 8 : 12, width: '100%' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, fontSize: 13 }}>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={heading.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontWeight: 600, fontSize: 13 }}>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={heading.email}
                    onChange={handleChange}
                    placeholder="aaryasharma@gmail.com"
                    required
                    style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>
            <div style={{ 
              marginTop: '16px', 
              fontSize: '12px', 
              color: isFormValid() ? '#10b981' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 12px',
              background: isFormValid() ? '#f0fdf4' : '#fef2f2',
              borderRadius: '6px',
              border: `1px solid ${isFormValid() ? '#bbf7d0' : '#fecaca'}`
            }}>
              {isFormValid() ? (
                <>
                  <span>✓</span>
                  <span>All profile fields are complete</span>
                </>
              ) : (
                <>
                  <span>⚠</span>
                  <span>Please fill all required fields</span>
                </>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: '-25px' }}>
            {isEditingMode ? (
              <button
                type="button"
                onClick={handleSave}
                style={{
                  border: 'none',
                  background: '#2563eb',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: 18,
                  borderRadius: 30,
                  padding: '7px 30px',
                  cursor: 'pointer',
                }}
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                disabled={!isFormValid()}
                style={{
                  border: 'none',
                  background: isFormValid() ? '#6b3b7a' : '#9ca3af',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: 18,
                  borderRadius: 30,
                  padding: '10px 36px',
                  marginTop:isMobile?'-4px':'10px',
                  cursor: isFormValid() ? 'pointer' : 'not-allowed',
                  opacity: isFormValid() ? 1 : 0.6,
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {isFormValid() ? 'Next' : 'Fill Required Fields'}
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
              overflow: 'auto',
              marginTop: '-80px',
              height:'1100px'

            }}>
              {renderTemplate()}
            </div>
          // </div>
        )}
      </div>
    </div>
  );
};

export default HeadingTab;
