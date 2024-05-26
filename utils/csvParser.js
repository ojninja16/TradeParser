const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const Trade = require('../models/trade');
const parser = async filePath => {
  const trades = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', row => {
      try {
        if (
          !row.UTC_Time ||
          !row.Operation ||
          !row.Market ||
          !row['Buy/Sell Amount'] ||
          !row.Price
        ) {
          throw new Error('Missing required field(s) in CSV row');
        }
        const utcTime = new Date(row.UTC_Time);
        if (isNaN(utcTime.getTime())) {
          throw new Error('Invalid date format in UTC_Time field');
        }
        const operation = row.Operation.toUpperCase();
        if (operation !== 'BUY' && operation !== 'SELL') {
          throw new Error('Invalid operation in Operation field');
        }
        const marketParts = row.Market.split('/');
        if (marketParts.length !== 2) {
          throw new Error('Invalid market format in Market field');
        }
        const amount = parseFloat(row['Buy/Sell Amount']);
        const price = parseFloat(row.Price);
        if (isNaN(amount) || isNaN(price)) {
          throw new Error('Invalid amount or price format');
        }

        const trade = new Trade({
          utcTime: new Date(row.UTC_Time), // Convert to Date object
          operation: row.Operation.toUpperCase(),
          market: row.Market,
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
        console.log(
          'CSV file successfully processed and data saved to MongoDB',
        );
      } catch (error) {
        console.error('Error saving data to MongoDB:', error);
      }
    });
};

module.exports = parser;
