import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const Login = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mfaCode, setMfaCode] = useState('');
    const [mfaRequired, setMfaRequired] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const validatePassword = (pass: string) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        return regex.test(pass);
    };

    const handleAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (isRegistering && !validatePassword(password)) {
            setError('Password must have 1 upper, 1 lower, 1 number, 1 special char and min 8 chars.');
            setLoading(false);
            return;
        }

        const endpoint = isRegistering ? 'register' : 'login';
        const body = { email, password, ...(mfaRequired && { mfaCode }) };

        try {
            const response = await fetch(`${API_BASE_URL}/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.mfaRequired) {
                    setMfaRequired(true);
                    setError('Multi-Factor Authentication Required');
                } else {
                    localStorage.setItem('token', data.token);
                    navigate('/dashboard');
                }
            } else {
                setError(data.message || 'Action failed');
            }
        } catch (err) {
            setError('Failed to connect to server');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 w-full max-w-md shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <img
                            src="/logo.png"
                            alt="Reconity"
                            className="h-24 w-24 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        />
                    </div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
                        RECONITY
                    </h1>
                    <p className="text-slate-400 text-sm mt-2 tracking-widest uppercase">
                        {mfaRequired ? 'MFA Verification' : (isRegistering ? 'Agent Onboarding' : 'Secure Access Terminal')}
                    </p>
                </div>

                <form onSubmit={handleAction} className="space-y-6">
                    {!mfaRequired && (
                        <>
                            <div>
                                <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">Agent ID</label>
                                <input
                                    type="email"
                                    placeholder="admin@reconity.tech"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">Passcode</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                                {isRegistering && (
                                    <p className="text-[10px] text-slate-500 mt-1 ml-1">
                                        Must include: 1 Upper, 1 Lower, 1 Number, 1 Special Char
                                    </p>
                                )}
                            </div>
                        </>
                    )}

                    {mfaRequired && (
                        <div>
                            <label className="block text-slate-400 text-xs uppercase font-bold mb-2 ml-1">MFA Security Code</label>
                            <input
                                type="text"
                                placeholder="000000"
                                value={mfaCode}
                                onChange={(e) => setMfaCode(e.target.value)}
                                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-center text-xl tracking-[0.5em]"
                                maxLength={6}
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gradient-to-r ${mfaRequired ? 'from-purple-600 to-purple-500' : 'from-blue-600 to-blue-500'} hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition-all hover:-translate-y-0.5 disabled:opacity-50`}
                    >
                        {loading ? 'Processing...' : (mfaRequired ? 'Verify Code' : (isRegistering ? 'Initialize Agent' : 'Authenticate'))}
                    </button>

                    {!mfaRequired && (
                        <div className="flex justify-between items-center text-xs">
                            <button
                                type="button"
                                onClick={() => setIsRegistering(!isRegistering)}
                                className="text-slate-400 hover:text-blue-400 transition-colors"
                            >
                                {isRegistering ? 'Already have access?' : 'New Agent?'}
                            </button>
                            <button
                                type="button"
                                className="text-slate-400 hover:text-blue-400 transition-colors"
                            >
                                Forgot Access Key?
                            </button>
                        </div>
                    )}

                    {mfaRequired && (
                        <button
                            type="button"
                            onClick={() => { setMfaRequired(false); setMfaCode(''); }}
                            className="w-full text-xs text-slate-400 hover:text-blue-400 transition-colors text-center"
                        >
                            Back to Primary Credentials
                        </button>
                    )}
                </form>

                {error && (
                    <div className={`mt-6 p-3 rounded-lg text-center text-sm border ${error.includes('Required') ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
