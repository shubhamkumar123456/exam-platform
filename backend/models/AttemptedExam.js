const mongoose = require('mongoose');
const givenExamSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    exam: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:"Exam"
    },
    attemptedQuestion:[],
    // attemptedQuestion:[
    //     {  question: {
    //         type: mongoose.Schema.ObjectId,
    //         ref: 'Question',
    //     },
    //     selectedOption: {
    //         type: mongoose.Schema.ObjectId,
    //         ref: 'Option',
            
    
    //     },
    //     isCorrect: {
    //         type: Boolean,
    
    //     },
    //     textAnswer: {
    //         type: String,
    //         default: ""
    //     },}
    // ],

    // attempted:[
    //     { question:{
    //         type: mongoose.Schema.ObjectId,
    //         ref: 'Question',
    // },
    //   selectedOption: {
    //             type:mongoose.Schema.ObjectId,
    //             ref:'Option'

    //         },
    //         isCorrect:{ 
    //             type: Boolean,

    //         },}
    //    ]


    attemptedAt: { type: Date, default: Date.now }

}, { timestamps: true })
module.exports = mongoose.model('attemptedTest', givenExamSchema)