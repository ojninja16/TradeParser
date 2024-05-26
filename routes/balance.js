const express = require('express');
const Trade = require('../models/trade');
const router = express.Router();
const validateTimestamp = (req, res, next) => {
  const {timestamp} = req.body;
  const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
  if (!timestamp) {
    return res.status(400).json({error: 'Timestamp is required'});
  }
  if (!timestampRegex.test(timestamp)) {
    return res.status(400).json({error: 'Invalid timestamp format'});
  }
  next();
};
router.post('/balance', validateTimestamp, async (req, res) => {
  const {timestamp} = req.body;
  const date = new Date(timestamp);
  try {
    const trades = await Trade.find({utcTime: {$lte: date}});
    if (!trades || trades.length === 0) {
      return res.status(404).json({error: 'No trades found'});
    }
    const balances = {};
    trades.forEach(trade => {
      const {baseCoin, operation, amount} = trade;
      if (!balances[baseCoin]) balances[baseCoin] = 0;
      if (operation === 'BUY') {
        balances[baseCoin] += amount;
      } else if (operation === 'SELL') {
        balances[baseCoin] -= amount;
      }
    });

    res.json(balances);
  } catch (error) {
    res.status(500).json({error: 'Error fetching balance'});
  }
});
module.exports = router;
