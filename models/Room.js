const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    type: { type: String, required: true }, // e.g., single, double, suite
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
