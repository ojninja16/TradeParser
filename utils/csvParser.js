const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const Trade = require('../models/trade'); 
const parser=async(filePath)=> {
    const trades = [];
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            try {
                const trade = new Trade({
                    utcTime: new Date(row.UTC_Time),  // Convert to Date object
                    operation: row.Operation.toUpperCase(),
                    market:row.Market,  // Convert operation to uppercase
                    baseCoin: row.Market.split('/')[0],
                    quoteCoin: row.Market.split('/')[1],
                    amount: parseFloat(row['Buy/Sell Amount']),
                    price: parseFloat(row.Price),
                });
                trades.push(trade);
            } catch (error) {
                console.error('Error processing row:', row, 'Error:', error.message);
            }
        })
        .on('end', async () => {
            try {
                await Trade.insertMany(trades);
                console.log('CSV file successfully processed and data saved to MongoDB');
            } catch (error) {
                console.error('Error saving data to MongoDB:', error);
            }
        });
}

module.exports=parser;
