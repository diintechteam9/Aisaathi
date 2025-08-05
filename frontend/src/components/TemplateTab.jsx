import React, { useState, useEffect } from 'react';
import Template1 from './Templates/Template1';
import Template2 from './Templates/Template2';

const templateData = [
  {
    color: '#2563eb',
    recommended: true,
    accent: '#2563eb',
    bg: '#e0e7ef',
  },
  {
    color: '#222',
    recommended: true,
    accent: '#222',
    bg: '#fff',
  },
  {
    color: '#65a30d',
    recommended: false,
    accent: '#65a30d',
    bg: '#f7fbe7',
  },
];

const colorOptions = [
  '#222', '#7c3aed', '#a21caf', '#f59e42', '#2563eb', '#65a30d', '#059669', '#fbbf24', '#e11d48', '#0ea5e9',
];

const TemplateTab = ({ onUseTemplate }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      minHeight: '100vh', 
      background: 'transparent', 
      padding: isMobile ? '16px 0 0 0' : '32px 0 0 0' 
    }}>
      <div style={{ 
        maxWidth: 1100, 
        margin: '0 auto', 
        padding: isMobile ? '0 16px' : '0 24px',
        marginTop: isMobile ? '-75px' : '0px', 
      }}>
        <h1 style={{ 
          fontSize: isMobile ? 24 : 32, 
          fontWeight: 700, 
          textAlign: 'center', 
          marginBottom: 8, 
          color: '#1e1e2f',
          lineHeight: isMobile ? 1.2 : 1.4,
        }}>
          Best templates for students
        </h1>
        <div style={{ 
          fontSize: isMobile ? 16 : 18, 
          color: '#444', 
          textAlign: 'center', 
          marginBottom: isMobile ? 24 : 36,
          padding: isMobile ? '0 16px' : '0',
        }}>
          You can always change your template later.
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 16 : 32, 
          justifyContent: 'center', 
          marginBottom: isMobile ? 24 : 40,
          alignItems: isMobile ? 'center' : 'flex-start',
        }}>
          {templateData.map((tpl, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              style={{
                background: '#fff',
                border: selectedIdx === idx ? '3px solid #2563eb' : '3px solid #e5e7eb',
                borderRadius: 8,
                boxShadow: '0 2px 12px rgba(10,24,51,0.08)',
                width: isMobile ? '100%' : 480,
                maxWidth: isMobile ? 400 : 380,
                height: isMobile ? 360 : 400,  
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 0,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border 0.2s',
              }}
            >
              <div style={{
                width: isMobile ? '100%' : 330,
                height: isMobile ? 280 : 395,
                background: tpl.bg,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? 40 : 60,
                color: tpl.accent,
                position: 'relative',
                overflow: 'hidden',
                padding: 0,
              }}>
                {idx === 0 ? (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    <img 
                      src="/template1.png" 
                      alt="Template 1 Preview"
                      style={{
                        paddingTop: '0px',
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '0px 0px 0 0',
                      }}
                    />
                  </div>
                ) : idx === 1 ? (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      marginTop: isMobile ? '625px' : '470px',
                      marginLeft: isMobile ? '255px' : '160px',
                      transform: isMobile ? 'scale(0.35)' : 'scale(0.48)',
                      transformOrigin: 'top left',
                      width: 500,
                      height: 900,
                      pointerEvents: 'none',
                      boxSizing: 'border-box',
                    }}>
                      <Template2 />
                    </div>
                  </div>
                ) : (
                  <span role="img" aria-label="resume">📄</span>
                )}
              </div>

              {/* Mobile button */}
              {isMobile && selectedIdx === idx && (
                <button
                  onClick={() => onUseTemplate && onUseTemplate(idx)}
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#6b3b7a',
                    color: 'white',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: 14,
                    borderRadius: 20,
                    padding: '8px 20px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                    zIndex: 1,
                  }}
                >
                  Use this template
                </button>
              )}

              {/* RECOMMENDED label */}
              
            </div>
          ))}
        </div>

        {/* Desktop Action buttons */}
        {!isMobile && (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'row',
            justifyContent: 'center', 
            gap: 32, 
            marginBottom: 32,
            alignItems: 'center',
          }}>
            <button style={{
              background: 'none',
              color: '#7c3aed',
              border: 'none',
              fontWeight: 700,
              fontSize: 18,
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: '10px 24px',
            }}>
              Choose later
            </button>
            <button
              style={{
                background: '#6b3b7a',
                color: 'white',
                border: 'none',
                fontWeight: 700,
                fontSize: 18,
                borderRadius: 24,
                padding: '10px 32px',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
              onClick={() => onUseTemplate && onUseTemplate(selectedIdx)}
            >
              Use this template
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateTab;
