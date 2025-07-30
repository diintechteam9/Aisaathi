import React, { useState } from 'react';

const Template3 = ({ formData, onEditSummary, onEditEducation, onEditExperience, onEditSkills, onEditContact }) => {
  // If no formData is provided, show sample data
  if (!formData) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto', width: 700, minHeight: 900, fontFamily: 'Segoe UI, Arial, sans-serif', background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.08)'}}>
        {/* Header Section */}
        <div style={{ width: '100%', background: '#fff', padding: '24px 32px 16px 32px', borderBottom: '2px solid #8B0000' }}>
          <div style={{ fontWeight: 700, fontSize: 32, color: '#333', marginBottom: 4 }}>Saanvi Patel</div>
          <div style={{ fontWeight: 400, fontSize: 18, color: '#666', marginBottom: 12 }}>Retail Sales Associate</div>
          <div style={{ fontSize: 14, color: '#555', lineHeight: 1.5 }}>
            Motivated Sales Associate with 5 years of experience boosting sales and customer loyalty through individualized service. Resourceful expert at learning customer needs, directing to desirable merchandise and upselling to meet sales quotas. Committed to strengthening customer experiences with positivity and professionalism when answering requests and processing sales.
          </div>
        </div>
        
        {/* Two Column Layout */}
        <div style={{ display: 'flex', width: '100%' }}>
          {/* Left Column - Contact & Skills */}
          <div style={{ width: 240, background: '#fff', padding: '24px 20px', borderRight: '1px solid #e0e0e0' }}>
            {/* Profile Picture */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div style={{ width: 100, height: 120, background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: '#ccc', border: '2px solid #e0e0e0' }}>
                <span role="img" aria-label="avatar">👩‍💼</span>
              </div>
            </div>
            
            {/* Contact Section */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 16, color: '#8B0000', marginRight: 8 }}>📞</span>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#8B0000' }}>Contact</div>
              </div>
              <div style={{ fontSize: 13, color: '#333', marginBottom: 4 }}>Address</div>
              <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>New Delhi, India, 110034</div>
              <div style={{ fontSize: 13, color: '#333', marginBottom: 4 }}>Phone</div>
              <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>+71 22 1234 5677</div>
              <div style={{ fontSize: 13, color: '#333', marginBottom: 4 }}>E-mail</div>
              <div style={{ fontSize: 13, color: '#666', wordBreak: 'break-all' }}>saanvipatel@example.in</div>
            </div>
            
            {/* Skills Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 16, color: '#8B0000', marginRight: 8 }}>⚙️</span>
                <div style={{ fontWeight: 700, fontSize: 16, color: '#8B0000' }}>Skills</div>
              </div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#333' }}>
                <li style={{ marginBottom: 6 }}>Store opening and closing</li>
                <li style={{ marginBottom: 6 }}>Sales expertise</li>
                <li style={{ marginBottom: 6 }}>Accurate Money Handling</li>
                <li style={{ marginBottom: 6 }}>Loss prevention</li>
                <li style={{ marginBottom: 6 }}>Product promotions</li>
                <li style={{ marginBottom: 6 }}>Guest Services</li>
              </ul>
            </div>
          </div>
          
          {/* Right Column - Education & Experience */}
          <div style={{ flex: 1, background: '#fff', padding: '24px 32px' }}>
            {/* Education Section */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 16, color: '#8B0000', marginRight: 8 }}>🎓</span>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#8B0000' }}>Education</div>
              </div>
              <div style={{ display: 'flex', marginBottom: 8 }}>
                <div style={{ minWidth: 80, fontSize: 13, color: '#666' }}>June 2014</div>
                <div style={{ marginLeft: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#333', marginBottom: 2 }}>MSc in Computer Science: Financial Accounting</div>
                  <div style={{ fontStyle: 'italic', fontSize: 13, color: '#666' }}>Oxford Software Institute & Oxford School of English - New Delhi, India</div>
                </div>
              </div>
            </div>
            
            {/* Work History Section */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 16, color: '#8B0000', marginRight: 8 }}>💼</span>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#8B0000' }}>Work History</div>
              </div>
              
              {/* Job 1 */}
              <div style={{ display: 'flex', marginBottom: 16 }}>
                <div style={{ minWidth: 80, fontSize: 13, color: '#666' }}>2016-05 -<br />Current</div>
                <div style={{ marginLeft: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#333', marginBottom: 2 }}>Retail Sales Associate</div>
                  <div style={{ fontStyle: 'italic', fontSize: 13, color: '#666', marginBottom: 8 }}>H&M, New Delhi, India</div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#333' }}>
                    <li style={{ marginBottom: 4 }}>Effectively upsold products by introducing accessories and other add-ons, adding £3000 to average monthly sales.</li>
                    <li style={{ marginBottom: 4 }}>Generated brand awareness and positive product impressions to increase sales 22%.</li>
                    <li style={{ marginBottom: 4 }}>Used consultative sales approach to understand customer needs and recommend relevant offerings.</li>
                  </ul>
                </div>
              </div>
              
              {/* Job 2 */}
              <div style={{ display: 'flex' }}>
                <div style={{ minWidth: 80, fontSize: 13, color: '#666' }}>2015-01 -<br />2016-05</div>
                <div style={{ marginLeft: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#333', marginBottom: 2 }}>Barista</div>
                  <div style={{ fontStyle: 'italic', fontSize: 13, color: '#666', marginBottom: 8 }}>Starbucks, New Delhi, India</div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#333' }}>
                    <li style={{ marginBottom: 4 }}>Created over 60 drinks per hour with consistently positive customer satisfaction scores.</li>
                    <li style={{ marginBottom: 4 }}>Learned every menu preparation and numerous off-label drinks to meet all customer needs.</li>
                    <li style={{ marginBottom: 4 }}>Upsold baked goods and extra shots with beverages, increasing store sales £3800 per month.</li>
                  </ul>
                </div>
              </div>
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
    <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto', width: 700, minHeight: 900, fontFamily: 'Segoe UI, Arial, sans-serif', background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.08)'}}>
      {/* Header Section */}
      <div style={{ width: '100%', background: '#fff', padding: '24px 32px 16px 32px', borderBottom: '2px solid #8B0000', position: 'relative' }}>
        <div style={{ fontWeight: 700, fontSize: 32, color: '#333', marginBottom: 4 }}>
          {heading.firstName || 'Your'} {heading.surname || 'Name'}
        </div>
        <div style={{ fontWeight: 400, fontSize: 18, color: '#666', marginBottom: 12 }}>
          {heading.profession || 'Your Profession'}
        </div>
        {summary && (
          <div 
            style={{ fontSize: 14, color: '#555', lineHeight: 1.5, position: 'relative' }}
            onMouseEnter={() => setSummaryHovered(true)}
            onMouseLeave={() => setSummaryHovered(false)}
          >
            {summary}
            {onEditSummary && summaryHovered && (
              <button
                type="button"
                onClick={onEditSummary}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: '#8B0000',
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
        )}
      </div>
      
      {/* Two Column Layout */}
      <div style={{ display: 'flex', width: '100%' }}>
        {/* Left Column - Contact & Skills */}
        <div style={{ width: 240, background: '#fff', padding: '24px 20px', borderRight: '1px solid #e0e0e0' }}>
          {/* Profile Picture */}
          <div 
            style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, position: 'relative' }}
            onMouseEnter={() => setPhotoHovered(true)}
            onMouseLeave={() => setPhotoHovered(false)}
          >
            <div style={{ width: 100, height: 120, background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: '#ccc', border: '2px solid #e0e0e0', overflow: 'hidden' }}>
              {heading.photo ? (
                <img src={heading.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
              ) : (
                <span role="img" aria-label="avatar">👩‍💼</span>
              )}
            </div>
            {onEditContact && photoHovered && (
              <button
                type="button"
                onClick={onEditContact}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: '#8B0000',
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
          
          {/* Contact Section */}
          <div 
            style={{ marginBottom: 24, position: 'relative' }}
            onMouseEnter={() => setContactHovered(true)}
            onMouseLeave={() => setContactHovered(false)}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, position: 'relative' }}>
              <span style={{ fontSize: 16, color: '#8B0000', marginRight: 8 }}>📞</span>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#8B0000' }}>Contact</div>
              {onEditContact && contactHovered && (
                <button
                  type="button"
                  onClick={onEditContact}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#8B0000',
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
            <div style={{ fontSize: 13, color: '#333', marginBottom: 4 }}>Address</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
              {heading.city || 'City'}, {heading.country || 'Country'}, {heading.pin || 'Pin'}
            </div>
            <div style={{ fontSize: 13, color: '#333', marginBottom: 4 }}>Phone</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>
              {heading.phone || 'Your Phone'}
            </div>
            <div style={{ fontSize: 13, color: '#333', marginBottom: 4 }}>E-mail</div>
            <div style={{ fontSize: 13, color: '#666', wordBreak: 'break-all' }}>
              {heading.email || 'your.email@example.com'}
            </div>
          </div>
          
          {/* Skills Section */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setSkillsHovered(true)}
            onMouseLeave={() => setSkillsHovered(false)}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12, position: 'relative' }}>
              <span style={{ fontSize: 16, color: '#8B0000', marginRight: 8 }}>⚙️</span>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#8B0000' }}>Skills</div>
              {onEditSkills && skillsHovered && (
                <button
                  type="button"
                  onClick={onEditSkills}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#8B0000',
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
            {skills.length > 0 ? (
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#333' }}>
                {skills.map((skill, index) => (
                  <li key={index} style={{ marginBottom: 6 }}>{skill}</li>
                ))}
              </ul>
            ) : (
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, color: '#333' }}>
                <li style={{ marginBottom: 6 }}>Your skills will appear here</li>
                <li style={{ marginBottom: 6 }}>Add skills in the Skills tab</li>
              </ul>
            )}
          </div>
        </div>
        
        {/* Right Column - Education & Experience */}
        <div style={{ flex: 1, background: '#fff', padding: '24px 32px' }}>
          {/* Education Section */}
          {education.length > 0 && (
            <div 
              style={{ marginBottom: 24, position: 'relative' }}
              onMouseEnter={() => setEducationHovered(true)}
              onMouseLeave={() => setEducationHovered(false)}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, position: 'relative' }}>
                <span style={{ fontSize: 16, color: '#8B0000', marginRight: 8 }}>🎓</span>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#8B0000' }}>Education</div>
                {onEditEducation && educationHovered && (
                  <button
                    type="button"
                    onClick={onEditEducation}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: '#8B0000',
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
                <div key={index} style={{ display: 'flex', marginBottom: index < education.length - 1 ? 12 : 0 }}>
                  <div style={{ minWidth: 80, fontSize: 13, color: '#666' }}>
                    {edu.gradMonth} {edu.gradYear} - {edu.endMonth && edu.endYear ? `${edu.endMonth} ${edu.endYear}` : 'Present'}
                  </div>
                  <div style={{ marginLeft: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#333', marginBottom: 2 }}>
                      {edu.fieldOfStudy} - {edu.percentage}%
                    </div>
                    <div style={{ fontStyle: 'italic', fontSize: 13, color: '#666' }}>
                      {edu.schoolName} - {edu.schoolLocation}
                    </div>
                    {edu.coursework && (
                      <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
                        {edu.coursework}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Work History Section */}
          {experience.length > 0 && (
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setExperienceHovered(true)}
              onMouseLeave={() => setExperienceHovered(false)}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, position: 'relative' }}>
                <span style={{ fontSize: 16, color: '#8B0000', marginRight: 8 }}>💼</span>
                <div style={{ fontWeight: 700, fontSize: 18, color: '#8B0000' }}>Work History</div>
                {onEditExperience && experienceHovered && (
                  <button
                    type="button"
                    onClick={onEditExperience}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: '#8B0000',
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
                <div key={index} style={{ display: 'flex', marginBottom: index < experience.length - 1 ? 16 : 0 }}>
                  <div style={{ minWidth: 80, fontSize: 13, color: '#666' }}>
                    {exp.startMonth} {exp.startYear} - {exp.endMonth && exp.endYear ? `${exp.endMonth} ${exp.endYear}` : 'Current'}
                  </div>
                  <div style={{ marginLeft: 16 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#333', marginBottom: 2 }}>
                      {exp.jobTitle}
                    </div>
                    <div style={{ fontStyle: 'italic', fontSize: 13, color: '#666', marginBottom: 8 }}>
                      {exp.companyName}, {exp.jobType}, {exp.location}
                    </div>
                    <div style={{ fontSize: 13, color: '#333', marginBottom: 8 }}>
                      {exp.jobDescription}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template3;
