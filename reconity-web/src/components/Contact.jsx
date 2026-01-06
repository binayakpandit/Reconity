import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <div className="contact-wrapper glass-panel">
                    <div className="contact-info">
                        <h2>Get in <span className="text-gradient">Touch</span></h2>
                        <p className="contact-desc">
                            Ready to secure your infrastructure? Contact our team for a personalized demo and security assessment.
                        </p>

                        <div className="info-item">
                            <h4>Email</h4>
                            <p>admin@reconity.tech</p>
                        </div>

                        <div className="info-item">
                            <h4>Location</h4>
                            <p>Global Remote Operations</p>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="form-group">
                                <input type="text" placeholder="Name" className="form-input" />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Email" className="form-input" />
                            </div>
                            <div className="form-group">
                                <textarea placeholder="Message" rows="4" className="form-input"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
        .contact {
          padding: 6rem 0;
        }

        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          padding: 4rem;
          overflow: hidden;
        }

        .contact-info h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
        }

        .contact-desc {
          color: var(--color-secondary);
          margin-bottom: 3rem;
        }

        .info-item {
          margin-bottom: 2rem;
        }

        .info-item h4 {
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-input {
          width: 100%;
          padding: 1rem;
          background: rgba(3, 7, 18, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.5rem;
          color: white;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.2);
        }

        @media (max-width: 768px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
            padding: 2rem;
            gap: 3rem;
          }
        }
      `}</style>
        </section>
    );
};

export default Contact;
