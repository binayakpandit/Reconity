import React from 'react';
import iconScan from '../assets/reconity_feature_scan_1767026515008.png';
import iconRecon from '../assets/reconity_feature_recon_1767026532408.png';
import iconThreat from '../assets/reconity_feature_threat_1767026550836.png';
import iconDash from '../assets/reconity_feature_dashboard_1767026578301.png';
import iconPacket from '../assets/reconity_feature_packet_1767026596193.png';
import avatar from '../assets/avatar.png'; // Reusing the hacker avatar

const Features = () => {
  const features = [
    {
      title: "Automated Vuln Scanning",
      description: "Continuous scanning of your infrastructure to identify vulnerabilities before they can be exploited.",
      icon: iconScan,
      agentColor: "0deg" // Blue (Default)
    },
    {
      title: "Advanced Recon",
      description: "Deep dive reconnaissance to map out your attack surface and discover hidden assets.",
      icon: iconRecon,
      agentColor: "90deg" // Purple/Pink
    },
    {
      title: "Threat Analysis",
      description: "Real-time analysis of potential threats and actionable insights to mitigate risks.",
      icon: iconThreat,
      agentColor: "180deg" // Red/Orange
    },
    {
      title: "Secure Dashboard",
      description: "Centralized command center with 2FA and encryption for managing your security operations.",
      icon: iconDash,
      agentColor: "45deg" // Teal
    },
    {
      title: "Packet Monitoring",
      description: "Granular visibility into network traffic with integrated SIEM capabilities.",
      icon: iconPacket,
      agentColor: "270deg" // Green
    },
    {
      title: "Cloud Deployment",
      description: "Native support for Docker and Cloud environments for seamless scalability.",
      icon: iconPacket,
      agentColor: "320deg" // Violet
    }
  ];

  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-header">
          <h2>Our <span className="text-gradient">Upcoming Services</span></h2>
          <p>Hover over any feature to reveal the assigned Field Agent.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card-container"
            >
              <div className="feature-card-inner">
                {/* Front Side */}
                <div className="feature-card-front glass-panel">
                  <div className="feature-icon-wrapper">
                    <img src={feature.icon} alt={feature.title} className="feature-img" />
                  </div>
                  <h3>{feature.title}</h3>
                  <div className="click-hint">Hover to Reveal Agent</div>
                </div>

                {/* Back Side */}
                <div className="feature-card-back glass-panel">
                  <div className="avatar-wrapper">
                    <img
                      src={avatar}
                      alt="Agent Avatar"
                      className="card-avatar"
                      style={{ filter: `hue-rotate(${feature.agentColor}) drop-shadow(0 0 10px rgba(255,255,255,0.3))` }}
                    />
                  </div>
                  <h3>Agent Active</h3>
                  <p>{feature.description}</p>
                  <button className="btn btn-sm btn-outline">Review Logs</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div >

      <style>{`
        .features {
          padding: 6rem 0;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        .section-header p {
          color: var(--color-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          perspective: 1000px; /* Essential for 3D flip */
        }

        .feature-card-container {
          min-height: 320px;
          cursor: pointer;
        }

        .feature-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .feature-card-container:hover .feature-card-inner {
          transform: rotateY(180deg);
        }

        .feature-card-front, .feature-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
        }

        .feature-card-back {
          transform: rotateY(180deg);
          border: 1px solid var(--color-primary);
          background: rgba(3, 7, 18, 0.95); /* Solid back for readability */
        }

        /* Front Styles */
        .feature-icon-wrapper {
          height: 80px;
          margin-bottom: 1.5rem;
        }

        .feature-img {
          height: 100%;
          width: auto;
          filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.4));
        }

        .click-hint {
          margin-top: 1rem;
          font-size: 0.8rem;
          color: var(--color-primary);
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Back Styles */
        .avatar-wrapper {
          width: 100px;
          height: 100px;
          margin-bottom: 1rem;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(255,255,255,0.1);
        }

        .card-avatar {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .feature-card-back h3 {
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .feature-card-back p {
          font-size: 0.9rem;
          color: #ccc;
          margin-bottom: 1.5rem;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.8rem;
        }
      `}</style>
    </section >
  );
};

export default Features;
