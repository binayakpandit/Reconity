import React, { useState, useRef } from 'react';
import logoVideo from '../assets/logo.mp4';
import avatar from '../assets/avatar.png'; // Fallback / Poster

const ComingSoon = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div className="coming-soon-hero">
      <div className="hero-background">
        <div className="grid-overlay"></div>
        <div className="radial-glow"></div>
      </div>

      <div className="hero-content">
        <div className={`logo-wrapper ${videoEnded ? 'static-mode' : ''}`}>
          <div className="scan-ring"></div>
          {/* Video plays once, then fades out or stays as last frame. 
               User requested "pop up the logo" which implies swapping to a static clear logo or scaling it up.
               Since we don't have a separate static logo file confirmed besides avatar, we'll use the video's last frame 
               or the avatar if it represents the logo. 
               The prompt says "pop up the logo". I will assume the video contains the logo animation. 
               I will keep the video visible but paused at end. 
               OR transition to a cleaner static view. 
               Let's add a scale animation on end to "pop" it.
           */}
          <video
            ref={videoRef}
            src={logoVideo}
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
            className="main-logo-video"
          // No loop attribute
          />
        </div>

        <div className="text-wrapper">
          <div className="status-pill">
            <span className="status-dot"></span>
            <span>SYSTEM UPGRADE IN PROGRESS</span>
          </div>

          <h1 className="main-title">
            RECONITY
          </h1>

          <p className="sub-title">
            Next Generation Offensive Security<br />
            <span className="highlight">Launching Soon</span>
          </p>
        </div>
      </div>

      <style>{`
        :root {
          --primary: #06b6d4;
          --secondary: #64748b;
          --bg-dark: #020617;
        }

        .coming-soon-hero {
          position: relative;
          min-height: 90vh; /* Allow content below */
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-dark);
          overflow: hidden;
          padding: 4rem 1rem;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
        }

        .radial-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(6, 182, 212, 0.15), transparent 60%);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 2.5rem;
        }

        /* Logo Section */
        .logo-wrapper {
          position: relative;
          width: 240px;
          height: 240px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .logo-wrapper.static-mode {
          transform: scale(1.1); /* Subtle pop */
        }

        .scan-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-top-color: var(--primary);
          animation: spin 3s linear infinite;
        }

        .logo-wrapper.static-mode .scan-ring {
          animation: none;
          opacity: 0.5;
          border-color: rgba(6, 182, 212, 0.5);
          box-shadow: 0 0 30px rgba(6, 182, 212, 0.2);
          transition: all 0.5s;
        }

        .main-logo-video {
          width: 90%;
          height: 90%;
          object-fit: cover;
          border-radius: 50%;
          z-index: 2;
          filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.3));
        }

        /* Typography */
        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 100px;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: var(--primary);
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--primary);
          animation: pulse 2s infinite;
        }

        .main-title {
          font-family: 'Inter', sans-serif;
          font-size: 4.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(to right, #fff, #94a3b8);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin: 0;
          line-height: 1.1;
        }

        .sub-title {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          color: var(--secondary);
          line-height: 1.6;
          font-weight: 300;
        }

        .highlight {
          color: var(--primary);
          font-weight: 500;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @media (max-width: 768px) {
          .main-title { font-size: 3rem; }
          .logo-wrapper { width: 180px; height: 180px; }
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
