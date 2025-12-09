// src/controllers/salesController.js
const salesService = require('../services/salesService');

exports.getSales = async (req, res) => {
  try {
    const data = await salesService.getSales(req.query);
    res.json(data);
  } catch (err) {
    console.error('Error fetching sales:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
