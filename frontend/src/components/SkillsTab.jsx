import React, { useState } from 'react';

const SkillsTab = (props) => {
  const { onGoBack, onNext, formData, updateFormData, selectedTemplate, fullFormData } = props;
  const isEditingMode = !onNext || !onGoBack;

  const skills = formData && formData.length > 0 ? formData : [''];

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;
    updateFormData(updatedSkills);
  };

  const handleAddSkill = () => {
    const updatedSkills = [...skills, ''];
    updateFormData(updatedSkills);
  };

  const handleRemoveSkill = (index) => {
    if (skills.length > 1) {
      const updatedSkills = skills.filter((_, i) => i !== index);
      updateFormData(updatedSkills);
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
          heading: fullFormData?.heading || {}, 
          education: fullFormData?.education || [], 
          experience: fullFormData?.experience || [], 
          skills: skills, 
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
          Skills
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
              Add your technical
            </h3>
            <div style={{ color: '#64748b', fontSize: 14, marginBottom: 32, margin: '0 0 10px 0' }}>
              List your key skills, technologies, and competencies
            </div>
            
            {/* Required field indicator */}
            <div style={{ position: 'absolute', top: -40, right: 0, fontSize: 12, fontWeight: 500, color: '#ef4444', }}>
              * indicates a required field
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ background: '#f8faff', borderRadius: 12, padding: '24px 20px 20px 20px', marginBottom: 16, boxShadow: '0 2px 12px rgba(10,24,51,0.04)', position: 'relative' }}>
                {skills.map((skill, index) => (
                  <div key={index} style={{ marginBottom: index < skills.length - 1 ? 12 : 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        placeholder="Enter a skill"
                        style={{
                          flex: 1,
                          padding: 8,
                          borderRadius: 6,
                          border: '1px solid #d1d5db',
                          fontSize: 13,
                          background: '#fff'
                        }}
                      />
                      {skills.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(index)}
                          style={{
                            background: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            padding: '6px 10px',
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer',
                            minWidth: 80
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSkill}
                  style={{
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '8px 20px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginTop: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  + Add Skill
                </button>
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
            maxHeight:'1000px'
          }}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsTab;
