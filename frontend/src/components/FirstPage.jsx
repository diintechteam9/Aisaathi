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
  
  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

        {/* Bottom action buttons removed */}
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
        {/* Saved Resume step removed */}
      </div>
    </div>
  )
}

export default FirstPage
