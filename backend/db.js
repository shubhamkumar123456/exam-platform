const mongoose = require('mongoose');
const connectToDb= ()=>{
    mongoose.connect('mongodb://localhost:27017/exam1')
    .then(()=>console.log('Connected to database successfully'))
    .catch((error)=>console.log("failed to connect to database",error))
}

module.exports = connectToDb