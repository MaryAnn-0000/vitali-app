// BMI calculation utility functions

const calculateBMI = (weight, height) => {
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    // Calculate BMI and round to 1 decimal place
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(1));
};

const getBMICategory = (bmi) => {
    const bmiValue = parseFloat(bmi);

    if (bmiValue < 18.5) {
        return {
            category: 'Underweight',
            color: '#FEE2E2', // light red
            textColor: '#DC2626',
            tips: [
                'Increase calorie intake with nutrient-rich foods',
                'Try strength training 3x/week',
                'Include healthy fats in your diet'
            ]
        };
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
        return {
            category: 'Healthy',
            color: '#DCFCE7', // light green
            textColor: '#16A34A',
            tips: [
                'Maintain balanced diet and 30 mins of activity daily',
                'Stay hydrated throughout the day',
                'Get adequate sleep (7-9 hours)'
            ]
        };
    } else if (bmiValue >= 25 && bmiValue < 30) {
        return {
            category: 'Overweight',
            color: '#FEF3C7', // light yellow
            textColor: '#D97706',
            tips: [
                'Reduce processed foods and increase cardio',
                'Track portions and maintain food diary',
                'Aim for 150 minutes of moderate exercise weekly'
            ]
        };
    } else {
        return {
            category: 'Obese',
            color: '#FEE2E2', // darker red
            textColor: '#DC2626',
            tips: [
                'Start structured weight-loss plan',
                'Combine diet & exercise under medical supervision',
                'Consult healthcare provider for personalized guidance'
            ]
        };
    }
};

module.exports = {
    calculateBMI,
    getBMICategory
};
