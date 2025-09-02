const mysql = require('mysql2/promise');

const pool = process.env.DATABASE_URL 
    ? mysql.createPool({
        uri: process.env.DATABASE_URL,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
    : mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'vitali',
        port: process.env.DB_PORT || 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

// Test database connection
const testConnection = async () => {
    try {
        console.log('Attempting to connect with config:', process.env.DATABASE_URL ? 'Using URL connection' : 'Using individual params');
        const connection = await pool.getConnection();
        console.log('✅ Database connected successfully');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed. Full error:', error);
        console.error('Connection details:', process.env.DATABASE_URL ? 'Using DATABASE_URL' : {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });
        process.exit(1);
    }
};

module.exports = { pool, testConnection };
