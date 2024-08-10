const Exam = require('../models/GivenExam')

const attempted = async(req,res)=>{
    
    const {user,question,selectedOption,correctOption,examno,options} = req.body
    let isCorrect
    if(correctOption===selectedOption){
        isCorrect = true
    }else{
        isCorrect = false
    }
  try {
    let options = question
    let exam = await Exam.create({
        user,
        question,selectedOption,correctOption,isCorrect,
        examno,
        options
    })
    res.json({msg:"answer saved successfully",exam})
  } catch (error) {
    res.status(500).json({msg:"error saving answer",error})
  }
    

}


const getattemptedbyExam = async(req,res)=>{
    let user = req.params._userId
    let exam = await Exam.find({user}).populate([{path:'correctOption'},{path:'option'},{path:'question'},{path:'selectedOption'}])
    try {
        res.json({msg:"answer fetched successfully",exam})
    } catch (error) {
        res.status(500).json({msg:"error saving answer",error})
    }
}

module.exports ={
    attempted,
    getattemptedbyExam
}