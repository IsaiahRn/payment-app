import mongoose from "mongoose";

const paymentsSchema = new mongoose.Schema({
    CardNumber:{
        type: String,
        required: true
    },
    ExpDate:{
        type: String,
        required: true
    },
    Cvv: {
        type: String,
        require: true
    },
    Amount: {
        type: Number,
        require: true
    },
    paid_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('payments', paymentsSchema)
