const mongoose = require('mongoose');


const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        default:""
    }
});

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;