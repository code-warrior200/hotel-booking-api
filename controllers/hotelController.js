const Hotel = require('../models/Hotel');

// Create a new hotel
exports.createHotel = async (req, res) => {
    try {
        const newHotel = new Hotel(req.body);
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all hotels
exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single hotel
exports.getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a hotel
exports.updateHotel = async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHotel) return res.status(404).json({ message: 'Hotel not found' });
        res.status(200).json(updatedHotel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!deletedHotel) return res.status(404).json({ message: 'Hotel not found' });
        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
