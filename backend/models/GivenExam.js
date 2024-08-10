const mongoose = require('mongoose');
const givenExamSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    
            question: {
                type: mongoose.Schema.ObjectId,
                ref: 'Question',
                required: true
            },
            options: [{
                type: mongoose.Schema.ObjectId,
                ref: 'Option',
              
            }],
            selectedOption: {
                type:mongoose.Schema.ObjectId,
                ref:'Option'
               
            },
            isCorrect:{ 
                type: Boolean,
               
            },
            correctOption:{
                type:mongoose.Schema.ObjectId,
                ref:'Option'
            },
            // correctAnswer:{
            //     type:mongoose.Schema.ObjectId,
            //     ref:
            // }
    examno:{
        type: String,
    },
    attemptedAt: { type: Date, default: Date.now }

},{timestamps:true})
module.exports = mongoose.model('attemptedTest',givenExamSchema)