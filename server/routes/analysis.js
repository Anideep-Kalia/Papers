const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');

// Route 1: Fetch all places
router.get('/fetchallanalysis', async (req, res) => {
    try {
        const analysis = await Analysis.find();
        res.json(analysis);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Route 2: Add a new place
router.post("/addanal", async (req, res) => {
    try {
        const { userid, paperid, rightanswer, toatalanswer, attempt} = req.body;

        const analysis = new Analysis({
          userid, paperid, rightanswer, toatalanswer, attempt
        });
        const savedAnal = await analysis.save();
        res.json(savedAnal);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});


// Route 3: Update an existing place
router.put('/updateanal/:id', async (req, res) => {
    try {

      const { userid, paperid, rightanswer, toatalanswer, attempt} = req.body;
      const newAnal = {};
        if (userid) newAnal.userid = userid;
        if (paperid) newAnal.paperid = paperid;
        if (rightanswer) newAnal.rightanswer = rightanswer;
        if (toatalanswer) newAnal.toatalanswer = toatalanswer;
        if (attempt) newAnal.attempt = attempt;

        const analysis = await Analysis.findByIdAndUpdate(req.params.id, { $set: newAnal }, { new: true });
        if (!analysis) {
            return res.status(404).json({ msg: 'analysis not found' });
        }
        res.json(analysis);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

// Route 4: Delete an existing place
router.delete('/deleteanalysis/:id', async (req, res) => {
    try {
        const analysis = await Analysis.findByIdAndDelete(req.params.id);
        if (!analysis) {
            return res.status(404).json({ msg: 'analysis not found' });
        }
        res.json({ msg: 'analysis deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

module.exports = router;
