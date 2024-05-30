const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Paper = require('../models/Paper');

// Route 1: Fetch all places
router.get('/fetchallpapers', async (req, res) => {
    try {
        const paper = await Place.find();
        res.json(paper);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Route 2: Add a new place
router.post("/addpaper", async (req, res) => {
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, year, slot, set, month, questions } = req.body;

        // Check if a place with the same coordinates exists
        const existingPaper = await Paper.findOne({ questions });
        if (existingPaper) {
            return res.status(400).json({ error: 'A Paper with same questions exists' });
        }

        const paper = new Paper({
            name, year, slot, set, month, questions
        });
        const savedPlace = await paper.save();
        res.json(savedPlace);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});


// Route 3: Update an existing place
router.put('/updatepaper/:id', async (req, res) => {
    try {

        const { name, year, slot, set, month, questions } = req.body;
        const newPaper = {};
        if (name) newPaper.name = name;
        if (year) newPaper.year = year;
        if (slot) newPaper.slot = slot;
        if (set) newPaper.set = set;
        if (month) newPaper.month = month;
        if (questions) newPaper.questions = questions;

        const paper = await Paper.findByIdAndUpdate(req.params.id, { $set: newPaper }, { new: true });
        if (!paper) {
            return res.status(404).json({ msg: 'paper not found' });
        }
        res.json(paper);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Route 4: Delete an existing place
router.delete('/deletepaper/:id', async (req, res) => {
    try {
        const paper = await Paper.findByIdAndDelete(req.params.id);
        if (!paper) {
            return res.status(404).json({ msg: 'Paper not found' });
        }
        res.json({ msg: 'Paper deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

module.exports = router;
