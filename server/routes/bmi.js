const express = require('express');
const { body, validationResult } = require('express-validator');
const { pool } = require('../config/database');
const auth = require('../middleware/auth');
const { calculateBMI, getBMICategory } = require('../utils/bmiUtils');

const router = express.Router();

// All BMI routes require authentication
router.use(auth);

// Calculate and store BMI
router.post('/', [
    body('weight').isFloat({ min: 20, max: 300 }).withMessage('Weight must be between 20-300 kg'),
    body('height').isFloat({ min: 100, max: 250 }).withMessage('Height must be between 100-250 cm')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { weight, height } = req.body;
        const userId = req.user.id;

        // Calculate BMI
        const bmi = calculateBMI(weight, height);
        const bmiCategory = getBMICategory(bmi);

        // Store BMI record
        const [result] = await pool.execute(
            'INSERT INTO bmi_records (user_id, height, weight, bmi) VALUES (?, ?, ?, ?)',
            [userId, height, weight, bmi]
        );

        res.status(201).json({
            message: 'BMI calculated and stored successfully',
            bmi: parseFloat(bmi),
            category: bmiCategory.category,
            color: bmiCategory.color,
            textColor: bmiCategory.textColor,
            tips: bmiCategory.tips,
            record: {
                id: result.insertId,
                height,
                weight,
                bmi: parseFloat(bmi),
                createdAt: new Date()
            }
        });
    } catch (error) {
        console.error('BMI calculation error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get latest BMI
router.get('/latest', async (req, res) => {
    try {
        const userId = req.user.id;

        const [records] = await pool.execute(
            'SELECT * FROM bmi_records WHERE user_id = ? ORDER BY created_at DESC LIMIT 1',
            [userId]
        );

        if (records.length === 0) {
            return res.status(404).json({ message: 'No BMI records found' });
        }

        const record = records[0];
        const bmiCategory = getBMICategory(record.bmi);

        res.json({
            bmi: record.bmi,
            category: bmiCategory.category,
            color: bmiCategory.color,
            textColor: bmiCategory.textColor,
            tips: bmiCategory.tips,
            record: {
                id: record.id,
                height: record.height,
                weight: record.weight,
                bmi: record.bmi,
                createdAt: record.created_at
            }
        });
    } catch (error) {
        console.error('Get latest BMI error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get BMI history
router.get('/history', async (req, res) => {
    try {
        const userId = req.user.id;

        const [records] = await pool.execute(
            'SELECT * FROM bmi_records WHERE user_id = ? ORDER BY created_at ASC',
            [userId]
        );

        const history = records.map(record => ({
            id: record.id,
            height: record.height,
            weight: record.weight,
            bmi: record.bmi,
            category: getBMICategory(record.bmi).category,
            createdAt: record.created_at
        }));

        res.json({ history });
    } catch (error) {
        console.error('Get BMI history error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
