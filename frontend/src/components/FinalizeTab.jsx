import React, { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import Template1 from './Templates/Template1';
import Template2 from './Templates/Template2';
import SummaryTab from './SummaryTab';
import EducationTab from './EducationTab';
import ExperienceTab from './ExperienceTab';
import SkillsTab from './SkillsTab';
import HeadingTab from './HeadingTab';

const FinalizeTab = (props) => {
  const { onGoBack, selectedTemplate, formData, updateSummary, updateEducation, updateExperience, updateSkills, updateHeading } = props;
  const [editingSection, setEditingSection] = useState(null);
  const templateRef = useRef(null);
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

  // Handler to open summary editing
  const handleEditSummary = () => setEditingSection('summary');

  // Handler to open education editing
  const handleEditEducation = () => setEditingSection('education');

  // Handler to open experience editing
  const handleEditExperience = () => setEditingSection('experience');

  // Handler to open skills editing
  const handleEditSkills = () => setEditingSection('skills');

  // Handler to open contact editing
  const handleEditContact = () => setEditingSection('contact');

  // Handler to close editing (optional, could add a close button)
  const handleCloseEdit = () => setEditingSection(null);

  // Handler to download resume as PDF
  const handleDownloadResume = () => {
    if (templateRef.current) {
      const opt = {
        // margin: 20,
        transform: 'scale(2.0)',
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Temporarily remove scaling and positioning for download
      const originalTransform = templateRef.current.style.transform;
      const originalMarginTop = templateRef.current.style.marginTop;
      const originalMaxWidth = templateRef.current.style.maxWidth;
      
      templateRef.current.style.transform = 'none';
      templateRef.current.style.marginTop = '0';
      templateRef.current.style.maxWidth = '100%';
      templateRef.current.style.width = '100%';
      
      // Download the PDF
      html2pdf().set(opt).from(templateRef.current).save().then(() => {
        // Restore original styles
        templateRef.current.style.transform = originalTransform;
        templateRef.current.style.marginTop = originalMarginTop;
        templateRef.current.style.maxWidth = originalMaxWidth;
      });
    }
  };

  // Render left panel content
  const renderLeftPanel = () => {
    if (editingSection === 'summary') {
      return (
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600 }}>
            Edit Summary
          </h3>
          <SummaryTab
            formData={formData.summary}
            updateFormData={updateSummary}
            onNext={handleCloseEdit}
            onGoBack={handleCloseEdit}
          />
        </div>
      );
    }
    if (editingSection === 'education') {
      return (
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600 }}>
            Edit Education
          </h3>
          <EducationTab
            formData={formData.education}
            updateFormData={updateEducation}
            onNext={handleCloseEdit}
            onGoBack={handleCloseEdit}
          />
        </div>
      );
    }
    if (editingSection === 'experience') {
      return (
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600 }}>
            Edit Experience
          </h3>
          <ExperienceTab
            formData={formData.experience}
            updateFormData={updateExperience}
            onNext={handleCloseEdit}
            onGoBack={handleCloseEdit}
          />
        </div>
      );
    }
    if (editingSection === 'skills') {
      return (
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600 }}>
            Edit Skills
          </h3>
          <SkillsTab
            formData={formData.skills}
            updateFormData={updateSkills}
            onNext={handleCloseEdit}
            onGoBack={handleCloseEdit}
          />
        </div>
      );
    }
    if (editingSection === 'contact') {
      return (
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 18, fontWeight: 600 }}>
            Edit Contact Information
          </h3>
          <HeadingTab
            formData={formData.heading}
            updateFormData={updateHeading}
            onNext={handleCloseEdit}
            onGoBack={handleCloseEdit}
          />
        </div>
      );
    }
    return (
      <>
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>
            🎉
          </div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: 35, fontWeight: 700, color: '#1f2937' }}>
            Your Resume is Ready!
          </h3>
          <p style={{ margin: '0 0 24px 0', fontSize: 16, color: '#64748b', lineHeight: 1.5 }}>
            Congratulations! Your professional resume has been created successfully. 
            You can now download it as a PDF.
          </p>
          {/* Pro Tip Section - Commented Out
          <div style={{ 
            background: '#f0f9ff', 
            borderRadius: 12, 
            padding: '16px', 
            border: '1px solid #0ea5e9',
            marginBottom: 24
          }}>
            <div style={{ fontSize: 14, color: '#0c4a6e', fontWeight: 600, marginBottom: 8 }}>
              💡 Pro Tip:
            </div>
            <div style={{ fontSize: 13, color: '#0c4a6e' }}>
              Click on any section in the preview to edit it directly. Your changes will be reflected immediately!
            </div>
          </div>
          */}
        </div>
      </>
    );
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 0:
        return <div ref={templateRef}>
          <Template1 
            formData={formData} 
            // Edit functionality commented out
            // onEditSummary={handleEditSummary}
            // onEditEducation={handleEditEducation}
            // onEditExperience={handleEditExperience}
            // onEditSkills={handleEditSkills}
            // onEditContact={handleEditContact}
          />
        </div>;
      case 1:
        return <div ref={templateRef}>
          <Template2 
            formData={formData} 
            // Edit functionality commented out
            // onEditSummary={handleEditSummary}
            // onEditEducation={handleEditEducation}
            // onEditExperience={handleEditExperience}
            // onEditSkills={handleEditSkills}
            // onEditContact={handleEditContact}
          />
        </div>;
      default:
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
    }
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
        marginLeft: isMobile ? '60px' : '-40px'
      }}>
        <h1 style={{ 
          marginTop: isMobile ? '-120px' : '0px',
          fontSize: isMobile ? 18 : 32, 
          fontWeight: 700, 
          margin: 0 
        }}>
          Wrap-Up Your Resume
        </h1>
        <button
          type="button"
          onClick={handleDownloadResume}
          style={{
            border: 'none',
            background: '#6b3b7a',
            color: 'white',
            fontWeight: 700,
            fontSize: isMobile ? 16 : 18,
            borderRadius: 30,
            padding: isMobile ? '8px 24px' : '10px 36px',
            cursor: 'pointer',
          }}
        >
          Download
        </button>
      </div>
      
      {/* Main content area with flex layout */}
      <div style={{ 
        display: 'flex', 
        gap: isMobile ? '0px' : '20px', 
        marginBottom: 32,
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%'
      }}>
        
        {/* Left section - Editing panel */}
        {!isMobile && (
          <div style={{ 
            flex: 3, 
            background: '#f8f9fa', 
            borderRadius: 16, 
            padding: '16px',
            height: '600px',
            width: '420px',
            overflowY: 'auto',
            marginLeft: '-46px',
            boxSizing: 'border-box'
          }}>
            {renderLeftPanel()}
          </div>
        )}

        {/* Right section - Template Preview with User Data */}
        <div style={{ 
          flex: isMobile ? 'none' : 1, 
          background: '#fff', 
          borderRadius: 16, 
          boxShadow: '0 4px 24px rgba(10,24,51,0.08)', 
          padding: isMobile ? '0px' : '20px', 
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: isMobile ? '700px' : '600px',
          width: isMobile ? '100%' : 'auto',
          position: 'relative',
          marginTop: isMobile ? '75px' : '0px',
          boxSizing: 'border-box'
        }}>
          <div style={{ 
            transform: isMobile 
              ? (selectedTemplate === 1 ? 'scale(0.2)' : 'scale(0.2)') 
              : (selectedTemplate === 1 ? 'scale(0.5)' : 'scale(0.6)'), 
            transformOrigin: 'top center',
            maxWidth: '100%',
            overflow: 'auto',
            marginTop: isMobile 
              ? (selectedTemplate === 1 ? '50px' : '50px') 
              : (selectedTemplate === 1 ? '350px' : '350px'),
            maxheight:isMobile ? '400px' : '100%',
            width: isMobile?'100%':'100%',
            boxSizing: 'border-box',
           
          }}>
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalizeTab;