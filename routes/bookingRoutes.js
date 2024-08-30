const express = require('express');
const {
    createBooking,
    getAllBookings,
    getBookingById,
    deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

// Create a booking
router.post('/', createBooking);

// Get all bookings
router.get('/', getAllBookings);

// Get a booking by ID
router.get('/:id', getBookingById);

// Delete a booking
router.delete('/:id', deleteBooking);

module.exports = router;


// {
//     "userId": "YOUR_USER_ID",
//     "roomId": "YOUR_ROOM_ID",
//     "checkInDate": "2024-09-01",
//     "checkOutDate": "2024-09-05"
// }
  