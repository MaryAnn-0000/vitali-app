const express = require('express');
const cors = require('cors');

// Only load dotenv in development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// CORS Configuration
const corsOptions = {
    origin: [
        'https://vitali-app-six.vercel.app',  // Your deployed frontend
        'http://localhost:3000',              // For local development
        'http://localhost:5173',              // If using Vite locally
    ], // Allow all origins for now
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Add debugging to confirm which file is being loaded
//console.log('Loading .env from:', path.join(__dirname, '.env'));
//console.log('DB_PASSWORD from env:', process.env.DB_PASSWORD);


const { testConnection } = require('./config/database');
const authRoutes = require('./routes/auth');
const bmiRoutes = require('./routes/bmi');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Add CORS headers to all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    next();
});
app.use(express.urlencoded({ extended: true }));

// Test database connection on startup
testConnection();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bmi', bmiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        message: 'Vitali API is running',
        timestamp: new Date().toISOString(),
        cors: 'enabled'
    });
});

// Test auth endpoint
app.get('/api/auth/test', (req, res) => {
    res.json({
        message: 'Auth endpoint is accessible',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Vitali server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
