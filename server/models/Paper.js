const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    topic: {
        type: String
    },
    subject: {
        type: String,
    },
    difficulty:{
        type: String,
    },
    options:{
        type:[String],
    },
    type:{
        type: String,
    },
});

const PaperSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    slot: {
        type: String,
    },
    set: {
        type: String,
    },
    month:{
        type: String,
        required: true
    },
    questions:{
        type: [QuestionSchema],
    },
});


const Paper = mongoose.model('Paper', PaperSchema);

module.exports = Paper;
