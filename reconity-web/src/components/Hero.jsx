import React from 'react';
import avatar from '../assets/avatar.png';
import logoVideo from '../assets/logo.mp4';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg">
        <div className="grid-overlay"></div>
        <div className="map-dots"></div>
        <div className="scanner-line"></div>
      </div>

      <div className="container">
        <div className="hero-layout">
          <div className="hero-content">
            <div className="badge">
              <span className="badge-pulse"></span>
              System Status: Secure
            </div>
            <h1 className="hero-title">
              Elite <span className="text-gradient">Offensive</span> <br />
              Security Solutions
            </h1>
            <p className="hero-subtitle">
              Uncover vulnerabilities before they are exploited. Advanced reconnaissance
              infrastructure for the modern threat landscape.
            </p>
            <div className="hero-actions">
              <a href="http://localhost:5173" className="btn btn-primary">Initialize Platform</a>
              <a href="/docs/index.html" className="btn btn-outline">Documentation Suite</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="avatar-container">
              <div className="avatar-circle"></div>
              <video
                src={logoVideo}
                poster={avatar}
                autoPlay
                loop
                muted
                playsInline
                className="video-player"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 80px;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: radial-gradient(circle at 30% 50%, #0f172a 0%, #030712 100%);
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
        }

        .scanner-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
          opacity: 0.3;
          animation: scanDown 8s linear infinite;
        }

        .hero-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 1rem;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 100px;
          margin-bottom: 2rem;
          font-family: monospace;
          color: var(--color-primary);
          font-size: 0.9rem;
        }

        .badge-pulse {
          width: 8px;
          height: 8px;
          background: var(--color-primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--color-primary);
          animation: blink 2s infinite;
        }

        .hero-title {
          font-size: 4.5rem;
          margin-bottom: 1.5rem;
          letter-spacing: -0.03em;
          line-height: 1.1;
          text-transform: uppercase;
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--color-secondary);
          margin-bottom: 2.5rem;
          max-width: 500px;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
        }

        .avatar-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          aspect-ratio: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-img {
          width: 80%;
          height: auto;
          z-index: 2;
          filter: drop-shadow(0 0 30px rgba(6, 182, 212, 0.3));
          animation: float 6s ease-in-out infinite;
          border-radius: 50%;
          object-fit: cover;
        }

        .video-player {
          width: 80%;
          height: 80%;
          border-radius: 50%;
          object-fit: cover;
          z-index: 2;
          filter: drop-shadow(0 0 30px rgba(6, 182, 212, 0.3));
          animation: float 6s ease-in-out infinite;
        }

        .avatar-circle {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px dashed rgba(6, 182, 212, 0.3);
          border-radius: 50%;
          animation: spin 20s linear infinite;
        }

        @keyframes scanDown {
          0% { top: -10%; }
          100% { top: 110%; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 968px) {
          .hero-layout {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }

          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .hero-title {
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
