import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../contexts/AuthContext';
import { bmiAPI } from '../services/api';

const Dashboard = () => {
    const [latestBMI, setLatestBMI] = useState(null);
    const [bmiHistory, setBmiHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [latestResponse, historyResponse] = await Promise.all([
                bmiAPI.getLatest(),
                bmiAPI.getHistory()
            ]);

            setLatestBMI(latestResponse.data);
            setBmiHistory(historyResponse.data.history);
        } catch (error) {
            if (error.response?.status === 404) {
                // No BMI records found, redirect to BMI form
                navigate('/bmi-form');
                return;
            }
            setError('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateBMI = () => {
        navigate('/bmi-form');
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const formatChartData = (history) => {
        return history.map(record => ({
            date: new Date(record.createdAt).toLocaleDateString(),
            bmi: parseFloat(record.bmi),
            weight: record.weight,
            height: record.height
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 mb-4">VITALI</div>
                    <div className="text-gray-600">Loading your health data...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="text-red-600 mb-4">{error}</div>
                    <button
                        onClick={loadDashboardData}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold text-red-600">VITALI</div>
                            <div className="text-gray-600">Welcome back, {user?.name}</div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleUpdateBMI}
                                className="px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
                            >
                                Update BMI
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Latest BMI Card */}
                    <div className="lg:col-span-1">
                        <div
                            className="bg-white rounded-lg shadow-lg p-6 border-l-4"
                            style={{ borderLeftColor: latestBMI.textColor }}
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest BMI</h2>
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2" style={{ color: latestBMI.textColor }}>
                                    {latestBMI.bmi}
                                </div>
                                <div className="text-lg font-semibold mb-4" style={{ color: latestBMI.textColor }}>
                                    {latestBMI.category}
                                </div>
                                <div className="text-sm text-gray-600">
                                    Weight: {latestBMI.record.weight} kg | Height: {latestBMI.record.height} cm
                                </div>
                                <div className="text-xs text-gray-500 mt-2">
                                    {new Date(latestBMI.record.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BMI History Chart */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">BMI History</h2>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={formatChartData(bmiHistory)}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                                        <Tooltip />
                                        <Line
                                            type="monotone"
                                            dataKey="bmi"
                                            stroke="#E63946"
                                            strokeWidth={2}
                                            dot={{ fill: '#E63946', strokeWidth: 2, r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Health Tips */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Tips</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {latestBMI.tips.map((tip, index) => (
                                    <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex-shrink-0 w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                                        <p className="text-sm text-gray-700">{tip}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
