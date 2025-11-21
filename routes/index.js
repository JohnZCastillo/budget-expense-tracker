const authMiddleware = require('./../middleware/auth');
const budgetRoutes = require('./../routes/budget');
const userRoutes = require('./../routes/user');
const authRoutes = require('./../routes/auth');
const categoryRoutes = require('./../routes/category');
const moneyRoutes = require('./../routes/money');

const express = require('express');
const router = express.Router();

router.use('/budgets', authMiddleware, budgetRoutes);
router.use('/users', authMiddleware, userRoutes);
router.use('/categories', authMiddleware, categoryRoutes);
router.use('/money', authMiddleware, moneyRoutes);
router.use('/auth', authRoutes);

module.exports = router;