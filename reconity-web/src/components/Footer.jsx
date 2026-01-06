import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="brand-header">
            <img src={logo} alt="Reconity Logo" className="footer-logo" />
            <h3>Reconity</h3>
          </div>
          <p>Your trusted companion in this DigitalWorld</p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h4>Platform</h4>
            <a href="#features">Features</a>
            <a href="http://localhost:5173/login">Access Terminal</a>
            <a href="/docs/index.html">Documentation</a>
          </div>
          <div className="link-group">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#">Careers</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="link-group">
            <h4>Legal</h4>
            <a href="/docs/13-PRIVACY-POLICY-WEB.html">Privacy</a>
            <a href="/docs/11-USER-AGREEMENT-WEB.html">Terms</a>
          </div>
        </div>
      </div>
      <div className="container copyright">
        <p>&copy; {new Date().getFullYear()} Reconity. All rights reserved.</p>
      </div>

      <style>{`
        .footer {
          background: rgba(3, 7, 18, 0.9);
          padding: 4rem 0 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .footer-content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .brand-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .footer-logo {
            width: 40px;
            height: 40px;
            object-fit: contain;
        }

        .footer-brand h3 {
          font-size: 1.5rem;
          margin: 0;
          background: linear-gradient(to right, #fff, var(--color-primary));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .footer-brand p {
          color: var(--color-secondary);
        }

        .footer-links {
          display: flex;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .link-group h4 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--color-secondary);
          margin-bottom: 1rem;
        }

        .link-group a {
          display: block;
          color: var(--color-text);
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          opacity: 0.8;
        }

        .link-group a:hover {
          opacity: 1;
          color: var(--color-primary);
        }

        .copyright {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--color-secondary);
          font-size: 0.85rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
