import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const Targets = () => {
    const [targets, setTargets] = useState<any[]>([]);
    const [domain, setDomain] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTargets();
    }, []);

    const fetchTargets = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/targets`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) setTargets(await res.json());
        } catch (err) { console.error(err); }
    };

    const addTarget = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_BASE_URL}/targets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ domain })
            });
            if (res.ok) {
                setDomain('');
                fetchTargets();
            } else {
                alert('Failed to add target');
            }
        } catch (err) {
            alert('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    const quickScan = async (id: string) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:3000/api/targets/${id}/quick-scan`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                alert('Quick Scan Queued!');
                fetchTargets();
            } else {
                alert('Failed to queue scan');
            }
        } catch (err) {
            alert('Error connecting to server');
        }
    };

    const fullScan = async (id: string) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:3000/api/targets/${id}/full-scan`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                alert('Full Scan Queued! Check backend logs for progress.');
                fetchTargets();
            } else {
                alert('Failed to queue scan');
            }
        } catch (err) {
            alert('Error connecting to server');
        }
    };

    // Helper to find reports
    const navigate = useNavigate();
    const fetchLatestReport = async (targetId: string) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:3000/api/reports/target/${targetId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (data && data.length > 0) {
                // Navigate to the most recent report
                navigate(`/reports/${data[0].id}`);
            } else {
                alert('No reports found');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Targets</h1>

            {/* Add Target Form */}
            <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                <form onSubmit={addTarget} style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Enter domain (e.g. example.com)"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', backgroundColor: '#334155', border: '1px solid #475569', color: 'white' }}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{ padding: '0.75rem 1.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Adding...' : 'Add Target'}
                    </button>
                </form>
            </div>

            {/* Target List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {targets.map((target) => (
                    <div key={target.id} style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ margin: 0, color: '#e2e8f0' }}>{target.domain}</h3>
                            <p style={{ margin: '0.5rem 0 0 0', color: '#94a3b8', fontSize: '0.875rem' }}>Status: <span style={{ color: target.status.includes('SCANNED') || target.status === 'COMPLETED' ? '#4ade80' : target.status === 'QUEUED' || target.status === 'SCANNING' ? '#60a5fa' : '#facc15' }}>{target.status}</span></p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{new Date(target.createdAt).toLocaleDateString()}</span>
                            <button
                                onClick={() => quickScan(target.id)}
                                style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}
                            >
                                Quick Scan
                            </button>

                            {/* Reports Link (Only if scan exists) */}
                            {target.status === 'COMPLETED' && (
                                <button
                                    onClick={() => fetchLatestReport(target.id)}
                                    style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem' }}
                                >
                                    View Report
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                {targets.length === 0 && <p style={{ color: '#64748b', textAlign: 'center' }}>No targets added yet.</p>}
            </div>
        </div>
    );
};

export default Targets;
