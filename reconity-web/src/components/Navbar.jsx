import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        <div className="logo-container">
          <img src={logo} alt="Reconity Logo" className="logo-img" />
          <span className="logo-text">Reconity</span>
        </div>
        <div className="nav-links">
          <a href="#hero">Home</a>
          <a href="#features">Features</a>
          <a href="/docs/index.html">Docs</a>
          <a href="http://localhost:5173/login" className="btn btn-primary">Get Started</a>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar.scrolled {
          padding: 1rem 0;
          background: rgba(3, 7, 18, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-img {
          height: 40px;
          filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.5));
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(to right, #fff, var(--color-primary));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          letter-spacing: -0.02em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-links a:not(.btn) {
          color: var(--color-secondary);
          font-weight: 500;
        }

        .nav-links a:not(.btn):hover {
          color: var(--color-primary);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
