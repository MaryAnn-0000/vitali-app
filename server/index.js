const express = require('express');
const cors = require('cors');

// Only load dotenv in development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Add debugging to confirm which file is being loaded
//console.log('Loading .env from:', path.join(__dirname, '.env'));
//console.log('DB_PASSWORD from env:', process.env.DB_PASSWORD);


const { testConnection } = require('./config/database');
const authRoutes = require('./routes/auth');
const bmiRoutes = require('./routes/bmi');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
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
