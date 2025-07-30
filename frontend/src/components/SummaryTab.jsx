import React, { useState } from 'react';

const SummaryTab = (props) => {
  const { onGoBack, onNext, formData, updateFormData, selectedTemplate, fullFormData } = props;
  const isEditingMode = !onNext || !onGoBack;

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
    <div style={{ maxWidth: 1400, margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
          Professional Summary
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
              Write a compelling summary of your background and goals
            </h3>
            <div style={{ color: '#64748b', fontSize: 14, marginBottom: 32, margin: '0 0 10px 0' }}>
              Describe your professional background, key achievements, and career objectives
            </div>
            
            {/* Required field indicator */}
            <div style={{ position: 'absolute', top: -40, right: 0, fontSize: 12, fontWeight: 500, color: '#ef4444' }}>
              * indicates a required field
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ background: '#f8faff', borderRadius: 12, padding: '24px 20px 20px 20px', marginBottom: 16, boxShadow: '0 2px 12px rgba(10,24,51,0.04)', position: 'relative' }}>
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
            marginHeight:'1000px'
            
            }}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryTab;
