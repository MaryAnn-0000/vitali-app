import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SplashScreen from './components/SplashScreen';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import BMIForm from './components/BMIForm';
import BMIResult from './components/BMIResult';
import Dashboard from './components/Dashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-4xl font-bold text-red-600 mb-4">VITALI</div>
          <div className="text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

// Main App Component
const AppContent = () => {
  const { user } = useAuth();
  const [showSplash, setShowSplash] = useState(false);
  const [bmiResult, setBmiResult] = useState(null);

  useEffect(() => {
    // Show splash screen on first load if user is logged in
    if (user && !localStorage.getItem('splash_shown')) {
      setShowSplash(true);
      localStorage.setItem('splash_shown', 'true');
    }
  }, [user]);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleBMICalculated = (data) => {
    setBmiResult(data);
    // Store the result in localStorage in case of page refresh
    localStorage.setItem('bmi_result', JSON.stringify(data));
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/bmi-form"
          element={
            <ProtectedRoute>
              <BMIForm onBMICalculated={handleBMICalculated} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bmi-result"
          element={
            <ProtectedRoute>
              {bmiResult ? <BMIResult bmiData={bmiResult} /> : <Navigate to="/dashboard" />}
            </ProtectedRoute>
          }
        />
        <Route 
          path="/"
          element={
            showSplash ? (
              <SplashScreen onComplete={handleSplashComplete} />
            ) : (
              <Navigate to={user ? "/dashboard" : "/login"} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

// Root App Component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
