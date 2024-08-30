const Booking = require('../models/Booking');
const Room = require('../models/Room');

// Create a new booking
exports.createBooking = async (req, res) => {
    const { user, room, checkInDate, checkOutDate } = req.body;

    try {
        const bookedRoom = await Room.findById(room);
        if (!bookedRoom || !bookedRoom.available) {
            return res.status(400).json({ message: 'Room not available' });
        }

        const totalDays = (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 3600 * 24);
        const totalPrice = bookedRoom.price * totalDays;

        const newBooking = new Booking({ user, room, checkInDate, checkOutDate, totalPrice });
        const savedBooking = await newBooking.save();

        await Room.findByIdAndUpdate(room, { available: false });

        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user room');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single booking
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user room');
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        await Room.findByIdAndUpdate(booking.room, { available: true });

        res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
