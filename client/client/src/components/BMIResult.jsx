import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BMIResult = ({ bmiData }) => {
    const [showTips, setShowTips] = useState(false);
    const navigate = useNavigate();

    const handleGoToDashboard = () => {
        // Clear the BMI result from both localStorage and parent state
        localStorage.removeItem('bmi_result');
        window.location.href = '/dashboard'; // Force a full page navigation
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 mb-2">VITALI</div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Your BMI Result
                    </h2>
                </div>

                {/* BMI Card */}
                <div
                    className="bg-white rounded-lg shadow-lg p-6 border-l-4"
                    style={{ borderLeftColor: bmiData.textColor }}
                >
                    <div className="text-center">
                        <div className="text-6xl font-bold mb-2" style={{ color: bmiData.textColor }}>
                            {Number(bmiData.bmi).toFixed(1)}
                        </div>
                        <div className="text-xl font-semibold mb-4" style={{ color: bmiData.textColor }}>
                            {bmiData.category}
                        </div>

                        <div className="text-sm text-gray-600 mb-4">
                            Weight: {bmiData.record.weight} kg | Height: {bmiData.record.height} cm
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Tips</h3>
                    <div className="space-y-3">
                        {bmiData.tips.map((tip, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                                <p className="text-sm text-gray-700">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <div>
                    <button
                        onClick={handleGoToDashboard}
                        className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BMIResult;
