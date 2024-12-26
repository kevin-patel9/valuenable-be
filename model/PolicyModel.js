// models/Policy.js
const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    dob: { type: Date, required: true },
    gender: { type: String, enum: ['M', 'F'], required: true },
    sumAssured: { type: Number, required: true },
    modalPremium: { type: Number, required: true },
    premiumFrequency: { type: String, enum: ['Yearly', 'Half-Yearly', 'Monthly'], required: true },
    pt: { type: Number, required: true },
    ppt: { type: Number, required: true },
},{ timestamps: true });

module.exports = mongoose.model('Policy', PolicySchema);
