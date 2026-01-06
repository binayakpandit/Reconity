import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API_BASE_URL from '../config';

const ReportViewer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReport();
    }, [id]);

    const fetchReport = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${API_BASE_URL}/targets/${id}/quick-scan`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setReport(data);
            } else {
                alert('Failed to load report');
                navigate('/targets');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-white">Loading Report...</div>;
    if (!report) return null;

    const details = JSON.parse(report.details);
    const summary = JSON.parse(report.summary);

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans print:bg-white print:text-black">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8 border-b border-slate-700 pb-6 print:border-black">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-blue-400 print:text-blue-600">RECONITY</h1>
                        <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest print:text-gray-600">CONFIDENTIAL SECURITY REPORT</p>
                    </div>
                    <div className="text-right">
                        <p className="text-lg font-semibold">{new Date(report.createdAt).toLocaleDateString()}</p>
                        <p className="text-sm text-slate-500 print:text-gray-500">Report ID: {report.id.split('-')[0]}</p>
                        <button
                            onClick={() => window.print()}
                            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium print:hidden"
                        >
                            Export PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Executive Summary */}
            <div className="max-w-4xl mx-auto mb-12">
                <h2 className="text-xl font-bold mb-4 border-l-4 border-blue-500 pl-3 uppercase">Executive Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 print:bg-gray-100 print:border-gray-300">
                        <p className="text-slate-400 text-sm uppercase">Target Asset</p>
                        <p className="text-xl font-semibold mt-1">{report.target.domain}</p>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 print:bg-gray-100 print:border-gray-300">
                        <p className="text-slate-400 text-sm uppercase">Risk Score</p>
                        <div className="flex items-center mt-1">
                            <span className={`text-2xl font-bold ${report.vulnScore > 50 ? 'text-red-500' : 'text-green-500'}`}>
                                {report.vulnScore}/100
                            </span>
                            <span className="ml-2 text-xs px-2 py-0.5 rounded bg-slate-700 print:bg-gray-200">
                                {report.vulnScore > 50 ? 'HIGH RISK' : 'LOW RISK'}
                            </span>
                        </div>
                    </div>
                    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 print:bg-gray-100 print:border-gray-300">
                        <p className="text-slate-400 text-sm uppercase">Total Assets Found</p>
                        <p className="text-2xl font-bold mt-1 text-blue-400 print:text-blue-600">{summary.count}</p>
                    </div>
                </div>
                <p className="text-slate-300 leading-relaxed print:text-gray-800">
                    This automated security assessment was conducted by the Reconity Platform.
                    The scan identified <strong>{summary.count}</strong> subdomains associated with <strong>{report.target.domain}</strong>.
                    {report.vulnScore > 50
                        ? "The high number of exposed assets indicates a significant attack surface that requires immediate review and potential remediation."
                        : "The attack surface appears to be within manageable limits, though continuous monitoring is recommended."}
                </p>
            </div>

            {/* Technical Details */}
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl font-bold mb-4 border-l-4 border-purple-500 pl-3 uppercase">Technical Details</h2>
                <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 print:bg-white print:border-gray-300">
                    <div className="px-6 py-4 bg-slate-700/50 border-b border-slate-700 print:bg-gray-100 print:border-gray-300">
                        <h3 className="font-semibold">Discovered Subdomains</h3>
                    </div>
                    <div className="divide-y divide-slate-700 print:divide-gray-200">
                        {details.subdomains.map((sub: string, i: number) => (
                            <div key={i} className="px-6 py-3 flex justify-between items-center hover:bg-slate-700/30 print:hover:bg-transparent">
                                <span className="font-mono text-sm text-slate-300 print:text-black">{sub}</span>
                                <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded print:hidden">DNS: A Record</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm print:border-gray-300">
                <p>&copy; {new Date().getFullYear()} Reconity Platform. All Rights Reserved.</p>
                <p className="mt-1">Generated automatically by Reconity Scan Engine v1.0</p>
            </div>
        </div>
    );
};

export default ReportViewer;
