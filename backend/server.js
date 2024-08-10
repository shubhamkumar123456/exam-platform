const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');

const connectToDB = require('./db');
connectToDB()

app.use(cors())
app.use(express.json())
// routes
const userRoutes = require('./routes/user')
const questionRouter = require('./routes/question')
const examRouter = require('./routes/exam')
const attemptedRouter = require('./routes/attemptedExam')
app.get('/',(req,res)=>{
    res.send("welcome home")
})


app.use('/user',userRoutes)
app.use('/question',questionRouter)
app.use('/exam',examRouter)
app.use('/attempted',attemptedRouter)

app.listen(port,()=>{
    console.log("listening on port " + port)
})