import React from 'react';
import { Navigate, Outlet, useNavigate, Link } from 'react-router-dom';

const ProtectedLayout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#e2e8f0' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', backgroundColor: '#1e293b', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '0.75rem' }}>
                    <img src="/logo.png" alt="Reconity" style={{ height: '40px', width: '40px' }} />
                    <h2 style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>Reconity</h2>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                    <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem', borderRadius: '4px', backgroundColor: '#334155' }}>Dashboard</Link>
                    <Link to="/targets" style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem' }}>Targets</Link>
                    <Link to="/scans" style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem' }}>Scans</Link>
                    <Link to="/reports" style={{ color: '#94a3b8', textDecoration: 'none', padding: '0.5rem' }}>Reports</Link>
                </nav>

                <button
                    onClick={handleLogout}
                    style={{ marginTop: 'auto', padding: '0.75rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default ProtectedLayout;
