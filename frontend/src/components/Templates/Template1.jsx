import React, { useState } from 'react';

const Template1 = ({ formData, onEditSummary, onEditEducation, onEditExperience, onEditSkills, onEditContact }) => {
  // If no formData is provided, show sample data
  if (!formData) {
    return (
      <div style={{ display: 'flex',justify:'center',margin:'auto', width: 700, minHeight: 900, fontFamily: 'Segoe UI, Arial, sans-serif', background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.08)'}}>
        {/* Sidebar */}
        <div style={{ width: 220, background: '#17446b', color: '#fff', padding: '0 0 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
          {/* Avatar */}
          <div style={{ width: '100%', background: '#2563eb', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e0e7ef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: '#888' }}>
              <span role="img" aria-label="avatar">👩‍🎓</span>
            </div>
          </div>
          {/* Name & Title */}
          <div style={{ width: '100%', padding: '18px 0 0 24px', borderBottom: '1.5px solid #e0e7ef', marginBottom: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 26, lineHeight: 1, marginBottom: 2 }}>Sapna<br/>Pathak</div>
            <div style={{ fontWeight: 400, fontSize: 15, color: '#b6d0e2', marginBottom: 10 }}>Retail Sales Associate</div>
          </div>
          {/* Contact */}
          <div style={{ width: '100%', padding: '0 0 0 24px', marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, marginTop: 8 }}>Contact</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Address</div>
            <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 8 }}>New Delhi, India, 110034</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Phone</div>
            <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 8 }}>+91 22 1234 5677</div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>E-mail</div>
            <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 8, wordBreak: 'break-all' }}>saanvipatel@sample.in</div>
          </div>
          {/* Skills */}
          <div style={{ width: '100%', padding: '0 0 0 24px', background: '#113a5c', minHeight: 120, borderTop: '1.5px solid #e0e7ef' }}>
            <div style={{ fontWeight: 700, fontSize: 16, margin: '12px 0 8px 0' }}>Skills</div>
            <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 4 }}>Store opening and closing</div>
            <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 4 }}>Sales expertise</div>
            <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 4 }}>Accurate Money Handling</div>
            <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 4 }}>Loss prevention</div>
            <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 4 }}>Product promotions</div>
            <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 12 }}>Guest Services</div>
          </div>
        </div>
        {/* Main Content */}
        <div style={{ flex: 1, background: '#fff', padding: '2px 32px 0 32px', position: 'relative', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
          {/* Summary */}
          <div style={{ borderBottom: '2px solid #e0e7ef', paddingBottom: 8, marginBottom: 18 }}>
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 20, marginBottom: 2, backgroundColor:'#e0e7ef' }}>Summary</div>
            <div style={{ fontSize: 13, color: '#222', marginBottom: 0 }}>
              Motivated Sales Associate with 5 years of experience boosting sales and customer loyalty through individualized service. Resourceful expert at learning customer needs, directing to desirable merchandise and upselling to meet sales quotas. Committed to strengthening customer experiences with positivity and professionalism when answering requests and processing sales.
            </div>
          </div>
          {/* Education */}
          <div style={{ borderBottom: '2px solid #e0e7ef', paddingBottom: 8, marginBottom: 18 }}>
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 20, marginBottom: 2, backgroundColor:'#e0e7ef' }}>Education</div>
            <div style={{ fontSize: 13, color: '#222', marginBottom: 2 }}>June 2016</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 0 }}>Financial Accounting - 85%</div>
            <div style={{ fontStyle: 'italic', fontSize: 13, color: '#444', marginBottom: 2 }}>Oxford Software Institute & Oxford School of English - New Delhi, India</div>
            <div style={{ fontSize: 13, color: '#222', marginBottom: 0 }}>
              Motivated Sales Associate with 5 years of experience boosting sales and customer loyalty through individualized service. Resourceful expert at learning customer needs, directing to desirable merchandise and upselling to meet sales quotas. Committed to strengthening customer experiences with positivity and professionalism when answering requests and processing sales.
            </div>
          </div>
          {/* Work History */}
          <div style={{ borderBottom: '2px solid #e0e7ef', paddingBottom: 8, marginBottom: 18 }}>
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 20, marginBottom: 2 ,backgroundColor:'#e0e7ef'}}>Work History</div>
            {/* Job 1 */}
            <div style={{ display: 'flex', marginBottom: 0 }}>
              <div style={{ minWidth: 80, fontSize: 13, color: '#444' }}>2016-05 -<br />Currently working</div>
              <div style={{ marginLeft: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Retail Sales Associate</div>
                <div style={{ fontStyle: 'italic', fontSize: 13, color: '#444', marginBottom: 2 }}>H&M, Full-time, New Delhi, India</div>
                <div style={{ fontSize: 13, color: '#222', marginBottom: 8 }}>
                  Managed customer interactions and sales processes. Handled inventory management and product displays. Achieved monthly sales targets through effective customer service and product knowledge.
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#222' }}>
                  <li>Effectively upsold products by introducing accessories and other add-ons, adding ₹3000 to average monthly sales.</li>
                  <li>Generated brand awareness and positive product impressions to increase sales 22%.</li>
                  <li>Used consultative sales approach to understand customer needs and recommend relevant offerings.</li>
                </ul>
              </div>
            </div>
            {/* Job 2 */}
            <div style={{ display: 'flex', marginTop: 12 }}>
              <div style={{ minWidth: 80, fontSize: 13, color: '#444' }}>2015-01 -<br />2016-03</div>
              <div style={{ marginLeft: 12 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Barista</div>
                <div style={{ fontStyle: 'italic', fontSize: 13, color: '#444', marginBottom: 2 }}>Starbucks, Part-time, New Delhi, India</div>
                <div style={{ fontSize: 13, color: '#222', marginBottom: 8 }}>
                  Prepared and served coffee beverages. Maintained cleanliness and organization of work area. Provided excellent customer service and handled cash transactions.
                </div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#222' }}>
                  <li>Created over 60 drinks per hour with consistently positive customer satisfaction scores.</li>
                  <li>Learned every menu preparation and numerous off-label drinks to meet all customer needs.</li>
                  <li>Upsold baked goods and extra shots with beverages, increasing store sales ₹3800 per month.</li>
                </ul>
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
    <div style={{ display: 'flex',justify:'center',margin:'auto', width: 700, minHeight: 900, fontFamily: 'Segoe UI, Arial, sans-serif', background: '#fff', boxShadow: '0 2px 16px rgba(0,0,0,0.08)'}}>
      {/* Sidebar */}
      <div style={{ width: 220, background: '#17446b', color: '#fff', padding: '0 0 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
        {/* Avatar */}
        <div 
          style={{ width: '100%', background: '#2563eb', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 120, position: 'relative' }}
          onMouseEnter={() => setPhotoHovered(true)}
          onMouseLeave={() => setPhotoHovered(false)}
        >
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#e0e7ef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: '#888', overflow: 'hidden' }}>
            {heading.photo ? (
              <img src={heading.photo} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            ) : (
              <span role="img" aria-label="avatar">👩‍🎓</span>
            )}
          </div>
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
        <div style={{ width: '100%', padding: '18px 0 0 24px', borderBottom: '1.5px solid #e0e7ef', marginBottom: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 26, lineHeight: 1, marginBottom: 2 }}>
            {heading.firstName || 'Your'} {heading.surname || 'Name'}
          </div>
          <div style={{ fontWeight: 400, fontSize: 15, color: '#b6d0e2', marginBottom: 10 }}>
            {heading.profession || 'Your Profession'}
          </div>
        </div>
        {/* Contact */}
        <div 
          style={{ width: '100%', padding: '0 0 0 24px', marginBottom: 18, position: 'relative' }}
          onMouseEnter={() => setContactHovered(true)}
          onMouseLeave={() => setContactHovered(false)}
        >
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, marginTop: 8, position: 'relative' }}>
            Contact
            {onEditContact && contactHovered && (
              <button
                type="button"
                onClick={onEditContact}
                style={{
                  position: 'absolute',
                  top: 0,
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
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Address</div>
          <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 8 }}>
            {heading.city || 'City'}, {heading.country || 'Country'}, {heading.pin || 'Pin'}
          </div>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Phone</div>
          <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 8 }}>
            {heading.phone || 'Your Phone'}
          </div>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>E-mail</div>
          <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 8, wordBreak: 'break-all' }}>
            {heading.email || 'your.email@example.com'}
          </div>
        </div>
        {/* Skills */}
        <div 
          style={{ width: '100%', padding: '0 0 0 24px', background: '#113a5c', minHeight: 120, borderTop: '1.5px solid #e0e7ef', position: 'relative' }}
          onMouseEnter={() => setSkillsHovered(true)}
          onMouseLeave={() => setSkillsHovered(false)}
        >
          <div style={{ fontWeight: 700, fontSize: 16, margin: '12px 0 8px 0', position: 'relative' }}>
            Skills
            {onEditSkills && skillsHovered && (
              <button
                type="button"
                onClick={onEditSkills}
                style={{
                  position: 'absolute',
                  top: 0,
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
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div key={index} style={{ fontWeight: 400, fontSize: 13, marginBottom: 4 }}>{skill}</div>
            ))
          ) : (
            <>
              <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 4 }}>Your skills will appear here</div>
              <div style={{ fontWeight: 400, fontSize: 13, marginBottom: 4 }}>Add skills in the Skills tab</div>
            </>
          )}
        </div>
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, background: '#fff', padding: '2px 32px 0 32px', position: 'relative', borderTopRightRadius: 4, borderBottomRightRadius: 4 }}>
        {/* Summary */}
        {summary && (
          <div 
            style={{ borderBottom: '2px solid #e0e7ef', paddingBottom: 8, marginBottom: 18, position: 'relative' }}
            onMouseEnter={() => setSummaryHovered(true)}
            onMouseLeave={() => setSummaryHovered(false)}
          >
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 20, marginBottom: 2, backgroundColor:'#e0e7ef', position: 'relative' }}>
              Summary
              {onEditSummary && summaryHovered && (
                <button
                  type="button"
                  onClick={onEditSummary}
                  style={{
                    position: 'absolute',
                    top: 2,
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
            <div style={{ fontSize: 13, color: '#222', marginBottom: 0, marginTop:'5px' }}>
              {summary}
            </div>
          </div>
        )}
        {/* Education */}
        {education.length > 0 && (
          <div 
            style={{ borderBottom: '2px solid #e0e7ef', paddingBottom: 8, marginBottom: 18, position: 'relative' }}
            onMouseEnter={() => setEducationHovered(true)}
            onMouseLeave={() => setEducationHovered(false)}
          >
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 20, marginBottom: 2, backgroundColor:'#e0e7ef', position: 'relative' }}>
              Education
              {onEditEducation && educationHovered && (
                <button
                  type="button"
                  onClick={onEditEducation}
                  style={{
                    position: 'absolute',
                    top: 2,
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
              <div key={index} style={{ marginBottom: index < education.length - 1 ? 12 : 0 }}>
                <div style={{ fontSize: 13, color: '#222', marginBottom: 2 }}>
                  {edu.gradMonth} {edu.gradYear}
                </div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 0 }}>
                  {edu.fieldOfStudy}
                </div>
                <div style={{ fontWeight: 400, fontSize: 14, marginBottom: 0 }}>
                  Percentage - {edu.percentage}%
                </div>
                <div style={{ fontWeight: 700,fontStyle: 'italic', fontSize: 13, color: '#444', marginBottom: 2 }}>
                  {edu.schoolName} - {edu.schoolLocation}
                </div>
                {edu.coursework && (
                  <div style={{fontSize: 13, color: '#222', marginBottom: 0 }}>
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
            style={{ borderBottom: '2px solid #e0e7ef', paddingBottom: 8, marginBottom: 18, position: 'relative' }}
            onMouseEnter={() => setExperienceHovered(true)}
            onMouseLeave={() => setExperienceHovered(false)}
          >
            <div style={{ color: '#2563eb', fontWeight: 700, fontSize: 20, marginBottom: 2 ,backgroundColor:'#e0e7ef', position: 'relative'}}>
              Work History
              {onEditExperience && experienceHovered && (
                <button
                  type="button"
                  onClick={onEditExperience}
                  style={{
                    position: 'absolute',
                    top: 2,
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
              <div key={index} style={{ display: 'flex', marginBottom: index < experience.length - 1 ? 12 : 0 }}>
                <div style={{ minWidth: 80, fontSize: 13, color: '#444' }}>
                  {exp.startMonth} {exp.startYear} - {exp.endMonth && exp.endYear ? `${exp.endMonth} ${exp.endYear}` : 'Currently working'}
                </div>
                <div style={{ marginLeft: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{exp.jobTitle}</div>
                  <div style={{ fontStyle: 'italic', fontSize: 13, color: '#444', marginBottom: 2 }}>
                    {exp.companyName}, {exp.jobType}, {exp.location}
                  </div>
                  <div style={{ fontSize: 13, color: '#222', marginBottom: 8 }}>
                    {exp.jobDescription}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Template1;
