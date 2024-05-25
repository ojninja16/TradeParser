const express = require('express');
const Trade = require('../models/trade');
const router = express.Router();
router.post('/balance', async (req, res) => {
    const { timestamp } = req.body;
    const date = new Date(timestamp);
    try {
        const trades = await Trade.find({ utcTime: { $lte: date } });
        const balances = {};
        trades.forEach((trade) => {
            const { baseCoin, operation, amount } = trade;
            if (!balances[baseCoin]) balances[baseCoin] = 0;
            if (operation === 'BUY') {
                balances[baseCoin] += amount;
            } else if (operation === 'SELL') {
                balances[baseCoin] -= amount;
            }
        });
        res.json(balances);
    } catch (error) {
        res.status(500).send('Error fetching balance:', error.message);
    }
});
module.exports = router;
