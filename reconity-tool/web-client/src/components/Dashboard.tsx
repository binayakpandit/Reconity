import React from 'react';

const Dashboard = () => {
    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Security Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {/* Stat Card 1 */}
                <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
                    <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Active Targets</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>0</p>
                </div>

                {/* Stat Card 2 */}
                <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
                    <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Open Vulnerabilities</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>0</p>
                </div>

                {/* Stat Card 3 */}
                <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
                    <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Recent Scans</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>0</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
