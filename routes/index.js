const authMiddleware = require('./../middleware/auth');
const budgetRoutes = require('./../routes/budget');
const userRoutes = require('./../routes/user');
const authRoutes = require('./../routes/auth');
const categoryRoutes = require('./../routes/category');

const express = require('express');
const router = express.Router();

router.use('/api/budgets', authMiddleware, budgetRoutes);
router.use('/api/users', authMiddleware, userRoutes);
router.use('/api/categories', authMiddleware, categoryRoutes);
router.use('/api/auth', authRoutes);

module.exports = router;