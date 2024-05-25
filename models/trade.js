const mongoose= require('mongoose');
const tradeSchema=new mongoose.Schema({
    utcTime:{
        type:Date,
        required:true,
        index:true,//Indexing the field for faster search
    },
    operation:{
        type:String,
        required:true,
        enum:['BUY','SELL'],
    },
    market: {
        type: String,
        required: true,
    },
    baseCoin: {
        type: String,
        required: true,
    },
    quoteCoin: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true,
    minimize: false,
})
tradeSchema.index({ utcTime: -1 });//index creation
tradeSchema.pre('save', function (next) {
    this.market = `${this.baseCoin}/${this.quoteCoin}`;// to avoid collisions with other currencies
    this.operation=this.operation.toUpperCase();//to handle case where user enters lowercase
    next();
});
const Trade = mongoose.model('Trade', tradeSchema);
module.exports = Trade;