const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
        })
        console.log("Connected to MongoDB atlas")
        
    } catch (error) {
        console.log("Error connecting to MongoDB atlas: " + error);
        process.exit(1);
    }
}
module.exports = connectDB;