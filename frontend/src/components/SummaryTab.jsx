import React, { useState, useEffect } from 'react';

const SummaryTab = (props) => {
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

  const summary = formData || '';

  const handleSummaryChange = (e) => {
    updateFormData(e.target.value);
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
          experience: fullFormData?.experience || [], 
          skills: fullFormData?.skills || [], 
          summary: summary 
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
        marginLeft: isMobile ? '60px' : '0px',
      }}>
        <h1 style={{ 
          marginTop: isMobile ? '-120px' : '0px',
          fontSize: isMobile ? 22 : 32, 
          fontWeight: 700, 
          margin: 0 
        }}>
          Career Overview
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
          height: isMobile ? '420px' : '600px',
          width: isMobile ? '100%' : '420px',
          maxWidth: isMobile ? '100%' : '420px',
          overflowY: 'auto',
          boxSizing: 'border-box',
          marginTop: isMobile ? '-45px' : '0px',
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
              margin: '0 0 8px 0' 
            }}>
              Write a compelling summary of your background and goals
            </h3>
            
            
            {/* Required field indicator */}
            <div style={{ 
              position: 'absolute', 
              top: isMobile ? -42 : -40, 
              right: 0, 
              fontSize: 12, 
              fontWeight: 500, 
              color: '#ef4444' 
            }}>
              * indicates a required field
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ 
                background: '#f8faff', 
                borderRadius: 12, 
                padding: isMobile ? '16px 12px 12px 12px' : '24px 20px 20px 20px', 
                marginBottom: 16, 
                boxShadow: '0 2px 12px rgba(10,24,51,0.04)', 
                position: 'relative',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                <textarea
                  value={summary}
                  onChange={handleSummaryChange}
                  placeholder="Write a brief summary about your background, experience, and goals..."
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: 13,
                    border: '1.5px solid #bfc6d1',
                    borderRadius: 6,
                    outline: 'none',
                    background: 'white',
                    resize: 'vertical',
                    minHeight: 100,
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16, marginTop: 32 }}>
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
              maxHeight:'1000px'
            }}>
              {renderTemplate()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryTab;
