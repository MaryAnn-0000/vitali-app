import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = ({ onComplete }) => {
    const [fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Start fade out after 2 seconds
        const timer = setTimeout(() => {
            setFadeOut(true);
        }, 2000);

        // Complete splash after fade animation
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 2500);

        return () => {
            clearTimeout(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
            }`}>
            <div className="text-center">
                {/* Vitali Logo */}
                <div className="mb-8">
                    <div className="text-6xl font-bold text-red-600 mb-4">VITALI</div>
                    <div className="w-24 h-24 mx-auto bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">V</span>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="text-white text-xl font-medium">
                    Welcome to Vitali — Your Health Companion
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
