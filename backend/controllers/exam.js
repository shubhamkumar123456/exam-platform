const Exam = require('../models/Exam')

const createExam = async(req,res)=>{
    const {examName,batch,category} = req.body;
    const exam = await Exam.create(req.body)
    try {
       return res.status(200).json({msg:"exam created successfully",exam,success:true})
    } catch (error) {
        return res.status(500).json({msg:"error in creating exam",error,success:false})
    }
}

const AddQuestion = async(req, res)=>{
    let exam = await Exam.findOne({_id:req.params.examId})
    let question = req.body.question
    // res.json(exam)
  try {
    if(exam){
       let updatedExam= await Exam.updateOne({ _id: exam }, { $push: {question} },{new:true});
        // db.people.update({name: "John"}, {$push: {friends: {firstName: "Harry", lastName: "Potter"}}});
        return res.status(200).json({msg:"question added to exam successfully",updatedExam,success:true})
     }
  } catch (error) {
    return res.status(500).json({msg:"error in adding question exam",error,success:false})
  }
}
const getSingleExam = async(req,res)=>{
    let exam = await Exam.findById(req.params._id).populate([{ 
        path: 'question',
        populate: {
          path: 'options',
          model: 'Option'
        } 
     },
     { 
        path: 'question',
        populate: {
          path: 'correctOption',
          model: 'Option'
        } 
     }
    ])
    try {
       return res.status(200).json({msg:"fetched successfully",exam,success:true})
    } catch (error) {
        return res.status(500).json({msg:"error in adding question exam",error,success:false})
    }
}

const getAllexam = async(req,res)=>{
    const exam = await Exam.find({}).populate([{ 
      path: 'question',
      populate: {
        path: 'options',
        model: 'Option'
      } 
   },
   { 
      path: 'question',
      populate: {
        path: 'correctOption',
        model: 'Option'
      } 
   }
  ]);
    return res.status(200).json({msg:"fetched all exam successfully",exam,success:true})
}


module.exports ={
    createExam,
    AddQuestion,
    getAllexam,
    getSingleExam
}