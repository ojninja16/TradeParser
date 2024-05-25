const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const uploadRoutes = require('./routes/upload');
const balanceRoutes = require('./routes/balance');
const app = express();
// Connect to MongoDB
connectDB();
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// Routes
app.use('/api', uploadRoutes);
app.use('/api', balanceRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
