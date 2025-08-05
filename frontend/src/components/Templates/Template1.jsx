import React, { useState } from 'react';

const Template1 = ({ formData, onEditSummary, onEditEducation, onEditExperience, onEditSkills, onEditContact }) => {
  // If no formData is provided, show sample data
  if (!formData) {
    return (
      <div style={{ 
        maxWidth: '100%',
        paddingTop:'50px', 
        margin: '0 auto', 
        fontFamily: 'Segoe UI, Arial, sans-serif', 
        background: '#fff', 
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        borderRadius: '0px',
        overflow: 'hidden',
        '@media (max-width: 768px)': {
          margin: '0',
          maxWidth: '100%'
        }
      }}>
        {/* Header Section */}
        <div style={{ 
          background: '#17446b', 
          color: '#fff', 
          padding: '10px 0px',
          textAlign: 'center',
          '@media (max-width: 768px)': {
            padding: '20px 15px'
          }
        }}>
          {/* Header Content - Photo/Name on left, Contact on right */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            '@media (max-width: 768px)': {
              flexDirection: 'column',
              gap: '15px'
            }
          }}>
            {/* Left Side - Photo, Name, Profession */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              gap: '10px'
            }}>
              {/* Avatar */}
              <div style={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                background: '#e0e7ef', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: 32, 
                color: '#888'
              }}>
                <span role="img" aria-label="avatar">👩‍🎓</span>
              </div>
              
              {/* Name & Title */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  fontWeight: 700, 
                  fontSize: 24, 
                  lineHeight: 1, 
                  marginBottom: 8,
                  '@media (max-width: 768px)': {
                    fontSize: 18
                  }
                }}>
                  Ramesh Pathak
                </div>
                <div style={{ 
                  fontWeight: 400, 
                  fontSize: 14, 
                  color: '#b6d0e2', 
                  marginBottom: 0,
                  '@media (max-width: 768px)': {
                    fontSize: 12
                  }
                }}>
                  Retail Sales Associate
                </div>
              </div>
            </div>
            
            {/* Right Side - Contact Info */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px', 
              fontSize: 12, 
              textAlign: 'right',
              '@media (max-width: 768px)': {
                textAlign: 'center',
                gap: '5px'
              }
            }}>
              <div>📍 New Delhi, India, 110034</div>
              <div>📞 +91 22 1234 5677</div>
              <div>✉️ saanvipatel@sample.in</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '20px', '@media (max-width: 768px)': { padding: '15px 10px' } }}>
          {/* Summary */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 18, marginBottom: 8, padding: '6px 0', borderBottom: '2px solid #e0e7ef' }}>Summary</div>
            <div style={{ fontSize: 13, color: '#222', lineHeight: 1.5 }}>
              Motivated Sales Associate with 5 years of experience boosting sales and customer loyalty through individualized service. Resourceful expert at learning customer needs, directing to desirable merchandise and upselling to meet sales quotas. Committed to strengthening customer experiences with positivity and professionalism when answering requests and processing sales.
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 18, marginBottom: 8, padding: '6px 0', borderBottom: '2px solid #e0e7ef' }}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ background: '#f0f4f8', padding: '5px 10px', borderRadius: '16px', fontSize: 11, color: '#2563eb', border: '1px solid #e0e7ef' }}>Store opening and closing</div>
              <div style={{ background: '#f0f4f8', padding: '5px 10px', borderRadius: '16px', fontSize: 11, color: '#2563eb', border: '1px solid #e0e7ef' }}>Sales expertise</div>
              <div style={{ background: '#f0f4f8', padding: '5px 10px', borderRadius: '16px', fontSize: 11, color: '#2563eb', border: '1px solid #e0e7ef' }}>Accurate Money Handling</div>
              <div style={{ background: '#f0f4f8', padding: '5px 10px', borderRadius: '16px', fontSize: 11, color: '#2563eb', border: '1px solid #e0e7ef' }}>Loss prevention</div>
              <div style={{ background: '#f0f4f8', padding: '5px 10px', borderRadius: '16px', fontSize: 11, color: '#2563eb', border: '1px solid #e0e7ef' }}>Product promotions</div>
              <div style={{ background: '#f0f4f8', padding: '5px 10px', borderRadius: '16px', fontSize: 11, color: '#2563eb', border: '1px solid #e0e7ef' }}>Guest Services</div>
            </div>
          </div>

          {/* Education */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 18, marginBottom: 8, padding: '6px 0', borderBottom: '2px solid #e0e7ef' }}>Education</div>
            <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', marginBottom: 8, border: '1px solid #e0e7ef' }}>
              <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>June 2016</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Financial Accounting - 85%</div>
              <div style={{ fontStyle: 'italic', fontSize: 11, color: '#444', marginBottom: 6 }}>Oxford Software Institute & Oxford School of English - New Delhi, India</div>
              <div style={{ fontSize: 11, color: '#222', lineHeight: 1.4 }}>
                Motivated Sales Associate with 5 years of experience boosting sales and customer loyalty through individualized service. Resourceful expert at learning customer needs, directing to desirable merchandise and upselling to meet sales quotas.
              </div>
            </div>
          </div>

          {/* Work History */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 18, marginBottom: 8, padding: '6px 0', borderBottom: '2px solid #e0e7ef' }}>Work History</div>
            
            {/* Job 1 */}
            <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', marginBottom: 8, border: '1px solid #e0e7ef' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Retail Sales Associate</div>
                  <div style={{ fontStyle: 'italic', fontSize: 11, color: '#444', marginBottom: 4 }}>H&M, Full-time, New Delhi, India</div>
                </div>
                <div style={{ fontSize: 11, color: '#666', fontWeight: 500 }}>2016-05 - Currently working</div>
              </div>
              <div style={{ fontSize: 11, color: '#222', marginBottom: 8, lineHeight: 1.4 }}>
                Managed customer interactions and sales processes. Handled inventory management and product displays. Achieved monthly sales targets through effective customer service and product knowledge.
              </div>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: '#222', lineHeight: 1.4 }}>
                <li>Effectively upsold products by introducing accessories and other add-ons, adding ₹3000 to average monthly sales.</li>
                <li>Generated brand awareness and positive product impressions to increase sales 22%.</li>
                <li>Used consultative sales approach to understand customer needs and recommend relevant offerings.</li>
              </ul>
            </div>

            {/* Job 2 */}
            <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', border: '1px solid #e0e7ef' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>Barista</div>
                  <div style={{ fontStyle: 'italic', fontSize: 11, color: '#444', marginBottom: 4 }}>Starbucks, Part-time, New Delhi, India</div>
                </div>
                <div style={{ fontSize: 11, color: '#666', fontWeight: 500 }}>2015-01 - 2016-03</div>
              </div>
              <div style={{ fontSize: 11, color: '#222', marginBottom: 8, lineHeight: 1.4 }}>
                Prepared and served coffee beverages. Maintained cleanliness and organization of work area. Provided excellent customer service and handled cash transactions.
              </div>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: '#222', lineHeight: 1.4 }}>
                <li>Created over 60 drinks per hour with consistently positive customer satisfaction scores.</li>
                <li>Learned every menu preparation and numerous off-label drinks to meet all customer needs.</li>
                <li>Upsold baked goods and extra shots with beverages, increasing store sales ₹3800 per month.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Extract data from formData with fallbacks
  const heading = formData?.heading || {};
  const education = formData?.education || [];
  const experience = formData?.experience || [];
  const skills = formData?.skills || [];
  const summary = formData?.summary || '';

  // Hover state for summary edit button
  const [summaryHovered, setSummaryHovered] = useState(false);
  // Hover state for education edit button
  const [educationHovered, setEducationHovered] = useState(false);
  // Hover state for experience edit button
  const [experienceHovered, setExperienceHovered] = useState(false);
  // Hover state for skills edit button
  const [skillsHovered, setSkillsHovered] = useState(false);
  // Hover state for contact edit button
  const [contactHovered, setContactHovered] = useState(false);
  // Hover state for photo edit button
  const [photoHovered, setPhotoHovered] = useState(false);

  return (
    <div style={{ 
      maxWidth: '100%', 
      margin: '0 auto', 
      fontFamily: 'Segoe UI, Arial, sans-serif', 
      background: '#fff', 
      boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
      borderRadius: '0px',
      overflow: 'hidden',
      '@media (max-width: 770px)': {
        margin: '0',
        maxWidth: '100%'
      }
    }}>
      {/* Header Section */}
      <div 
        style={{ 
          background: '#17446b', 
          color: '#fff', 
          padding: '10px 20px',
          textAlign: 'center',
          position: 'relative',
          '@media (max-width: 768px)': {
            padding: '20px 15px'
          }
        }}
        onMouseEnter={() => setContactHovered(true)}
        onMouseLeave={() => setContactHovered(false)}
      >
        {/* Header Content - Photo/Name on left, Contact on right */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          '@media (max-width: 768px)': {
            flexDirection: 'column',
            gap: '15px'
          }
        }}>
          {/* Left Side - Photo, Name, Profession */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            gap: '10px'
          }}>
            {/* Avatar */}
            <div 
              style={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%', 
                background: '#e0e7ef', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: 32, 
                color: '#888',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={() => setPhotoHovered(true)}
              onMouseLeave={() => setPhotoHovered(false)}
            >
              {heading.photo ? (
                <img src={heading.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              ) : (
                <span role="img" aria-label="avatar">👩‍🎓</span>
              )}
              {onEditContact && photoHovered && (
                <button
                  type="button"
                  onClick={onEditContact}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '4px 12px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  ✏️ Edit
                </button>
              )}
            </div>
            
            {/* Name & Title */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontWeight: 700, 
                fontSize: 24, 
                lineHeight: 1, 
                marginBottom: 8,
                '@media (max-width: 768px)': {
                  fontSize: 18
                }
              }}>
                {heading.firstName || 'Your'} {heading.surname || 'Name'}
              </div>
              <div style={{ 
                fontWeight: 400, 
                fontSize: 14, 
                color: '#b6d0e2', 
                marginBottom: 0,
                '@media (max-width: 768px)': {
                  fontSize: 12
                }
              }}>
                {heading.profession || 'Your Profession'}
              </div>
            </div>
          </div>
          
          {/* Right Side - Contact Info */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px', 
            fontSize: 12, 
            textAlign: 'right',
            position: 'relative',
            '@media (max-width: 768px)': {
              textAlign: 'center',
              gap: '5px'
            }
          }}>
            <div>📍 {heading.city || 'City'}, {heading.country || 'Country'}, {heading.pin || 'Pin'}</div>
            <div>📞 {heading.phone || 'Your Phone'}</div>
            <div>✉️ {heading.email || 'your.email@example.com'}</div>
            {onEditContact && contactHovered && (
              <button
                type="button"
                onClick={onEditContact}
                style={{
                  position: 'absolute',
                  top: -10,
                  right: 0,
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: 6,
                  padding: '4px 12px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                ✏️ Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '20px', '@media (max-width: 768px)': { padding: '15px 10px' } }}>
        {/* Summary */}
        {summary && (
          <div 
            style={{ marginBottom: 12, position: 'relative' }}
            onMouseEnter={() => setSummaryHovered(true)}
            onMouseLeave={() => setSummaryHovered(false)}
          >
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 18, marginBottom: 8, padding: '6px 0', borderBottom: '2px solid #e0e7ef', position: 'relative' }}>
              Summary
              {onEditSummary && summaryHovered && (
                <button
                  type="button"
                  onClick={onEditSummary}
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 0,
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '4px 12px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  ✏️ Edit
                </button>
              )}
            </div>
            <div style={{ fontSize: 13, color: '#222', lineHeight: 1.5 }}>
              {summary}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div 
            style={{ marginBottom: 12, position: 'relative' }}
            onMouseEnter={() => setSkillsHovered(true)}
            onMouseLeave={() => setSkillsHovered(false)}
          >
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 18, marginBottom: 8, padding: '6px 0', borderBottom: '2px solid #e0e7ef', position: 'relative' }}>
              Skills
              {onEditSkills && skillsHovered && (
                <button
                  type="button"
                  onClick={onEditSkills}
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 0,
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '4px 12px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  ✏️ Edit
                </button>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill, index) => (
                <div key={index} style={{ background: '#f0f4f8', padding: '5px 10px', borderRadius: '16px', fontSize: 11, color: '#2563eb', border: '1px solid #e0e7ef' }}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div 
            style={{ marginBottom: 12, position: 'relative' }}
            onMouseEnter={() => setEducationHovered(true)}
            onMouseLeave={() => setEducationHovered(false)}
          >
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 18, marginBottom: 8, padding: '6px 0', borderBottom: '2px solid #e0e7ef', position: 'relative' }}>
              Education
              {onEditEducation && educationHovered && (
                <button
                  type="button"
                  onClick={onEditEducation}
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 0,
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '4px 12px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  ✏️ Edit
                </button>
              )}
            </div>
            {education.map((edu, index) => (
              <div key={index} style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', marginBottom: index < education.length - 1 ? 8 : 0, border: '1px solid #e0e7ef' }}>
                <div style={{ fontSize: 11, color: '#666', marginBottom: 4 }}>
                  {edu.gradMonth} {edu.gradYear} - {edu.endMonth && edu.endYear ? `${edu.endMonth} ${edu.endYear}` : 'Present'}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                  {edu.fieldOfStudy}
                </div>
                <div style={{ fontWeight: 400, fontSize: 11, marginBottom: 4 }}>
                  Percentage - {edu.percentage}%
                </div>
                <div style={{ fontWeight: 700, fontStyle: 'italic', fontSize: 11, color: '#444', marginBottom: 6 }}>
                  {edu.schoolName} - {edu.schoolLocation}
                </div>
                {edu.coursework && (
                  <div style={{ fontSize: 11, color: '#222', lineHeight: 1.4 }}>
                    {edu.coursework}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Work History */}
        {experience.length > 0 && (
          <div 
            style={{ marginBottom: 12, position: 'relative' }}
            onMouseEnter={() => setExperienceHovered(true)}
            onMouseLeave={() => setExperienceHovered(false)}
          >
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 18, marginBottom: 8, padding: '6px 0', borderBottom: '2px solid #e0e7ef', position: 'relative' }}>
              Work History
              {onEditExperience && experienceHovered && (
                <button
                  type="button"
                  onClick={onEditExperience}
                  style={{
                    position: 'absolute',
                    top: 6,
                    right: 0,
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    padding: '4px 12px',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  ✏️ Edit
                </button>
              )}
            </div>
            {experience.map((exp, index) => (
              <div key={index} style={{ background: '#f8f9fa', padding: '12px', borderRadius: '6px', marginBottom: index < experience.length - 1 ? 8 : 0, border: '1px solid #e0e7ef' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{exp.jobTitle}</div>
                    <div style={{ fontStyle: 'italic', fontSize: 11, color: '#444', marginBottom: 4 }}>
                      {exp.companyName}, {exp.jobType}, {exp.location}
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: '#666', fontWeight: 500 }}>
                    {exp.startMonth} {exp.startYear} - {exp.endMonth && exp.endYear ? `${exp.endMonth} ${exp.endYear}` : 'Currently working'}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#222', marginBottom: 8, lineHeight: 1.4 }}>
                  {exp.jobDescription}
                </div>
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: '#222', lineHeight: 1.4 }}>
                    {exp.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template1;
