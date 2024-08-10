// models/option.js


// models/question.js
const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    
    question: {
        type: String,
        required: true
    },
    options: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Option',
      
    }],
    correctOption: {
        type: mongoose.Schema.ObjectId,
        ref: 'Option',
    }
    ,
    category:{
        type: String,
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
