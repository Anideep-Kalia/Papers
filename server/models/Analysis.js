const mongoose = require('mongoose');

const TimeSchema = new mongoose.Schema({
    time: {
        type: Date,
        required: true
    },
    question: {
        type: String,
        required: true
    }
});

const AnalysisSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // assuming you have a User model
        required: true
    },
    paperid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Paper',  // assuming you have a Paper model
        required: true
    },
    rightanswer: {
        type: [String],
        required: true
    },
    totalanswer: {
        type: [String],
        required: true
    },
    attempt: {
        type: [TimeSchema],
        required: true
    }
});

const Analysis = mongoose.model('Analysis', AnalysisSchema);

module.exports = Analysis;
