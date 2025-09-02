import { useState } from 'react';
import { bmiAPI } from '../services/api';

const BMIForm = ({ onBMICalculated }) => {
    const [formData, setFormData] = useState({
        weight: '',
        height: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await bmiAPI.calculate({
                weight: parseFloat(formData.weight),
                height: parseFloat(formData.height)
            });

            onBMICalculated(response.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to calculate BMI');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">VITALI</div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Calculate Your BMI
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter your measurements to get started
                        </p>
                    </div>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                                Weight (kg)
                            </label>
                            <input
                                id="weight"
                                name="weight"
                                type="number"
                                step="0.1"
                                min="20"
                                max="300"
                                required
                                value={formData.weight}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="e.g., 70.5"
                            />
                        </div>

                        <div>
                            <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                                Height (cm)
                            </label>
                            <input
                                id="height"
                                name="height"
                                type="number"
                                step="0.1"
                                min="100"
                                max="250"
                                required
                                value={formData.height}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                                placeholder="e.g., 175.0"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Calculating...' : 'Calculate BMI'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BMIForm;
