
const Exam = require('../models/Exam')
const User = require('../models/User')
const Attempt = require('../models/AttemptedExam')



const attempted = async (req, res) => {


    // const {question,selectedOption,textAnswer} = req.body
    const exam = req.params._examId
    const user = req.params._userId
    console.log(exam)
    console.log(user)

    let findUser = await User.findById(user)
    let findExam = await Exam.findById(exam)
    if (!findUser) {
        return res.json({ msg: "user not found ", success: false })
    }
    if (!findExam) {
        return res.json({ msg: "exam not found ", success: false })
    }
    if (findUser && findExam) {
      if(!findUser.Exam.includes(exam)){
        let attempt = await Attempt.create({
            user,
            exam,

        })
      }
        if(!findUser.Exam.includes(exam)){
            let updatedExam = await User.updateOne({ _id: user }, { $push: { Exam: exam } }, { new: true });
            res.json({ msg: "user exam created successfully", updatedExam,success:true })
        }
        else{
            res.json({msg:"you have already attempted the exam",success:false})
        }
      
    }
    // if(findUser && findExam){
    //     let attempt =await Attempt.create({
    //         user,
    //         exam,
    //         question,
    //         selectedOption,
    //         textAnswer
    //     })

    //     try {
    //        let checkExamExistinUser = findUser.Exam.find((ele)=>ele===exam)
    //        if(!checkExamExistinUser){
    //         let updatedExam= await User.updateOne({_id:user}, { $push: {Exam:exam} },{new:true});
    //        }
    //         return res.json({msg:"question attempted successfully",attempt,success:true})
    //     } catch (error) {
    //         return res.json({msg:"error in attempting question",error,success:false})
    //     }
    // }
}



const getSignleAllAttemptedExam = async(req,res) => {
    const UserId = req.params._userId;
    console.log(UserId)
    let user = await Attempt.find({user:UserId}).populate({path:"exam"})
    res.json(user)
}
const addQuestions = async (req, res) => {
    let attempted = req.body.attempted
    // console.log(attempted);
    res.json(req.body);

    const user = req.params._userId
    const exam = req.params._examId
    let attemptExam =await Attempt.findOne({exam:exam,user:user}) 
    console.log(attemptExam)
    attemptExam.attemptedQuestion = [];
  
    attempted.forEach((ele)=>{
        attemptExam.attemptedQuestion.push(ele);
    })
    await attemptExam.save();
  
    
   
    
    
    // let obj = {};
    // if(question){
    //     obj.question = question;
    // }
    // if(selectedOption){
    //     obj.selectedOption = selectedOption;
    // }
    // if(isCorrect){
    //     obj.isCorrect = isCorrect;
    // }
    // if(textAnswer){
    //     obj.textAnswer = textAnswer;
    // }
    // console.log(obj);
    // const exam = req.params._examId
    // const user = req.params._userId
    // console.log(exam)
    // console.log(user)

    // let findUser = await User.findById(user)
    // let findExam = await Exam.findById(exam)
    // if (!findUser) {
    //     return res.json({ msg: "user not found ", success: false })
    // }
    // if (!findExam) {
    //     return res.json({ msg: "exam not found ", success: false })
    // }
    // if (findUser && findExam) {
    //     let runningExam = await Attempt.updateOne({ exam }, { $push: { attemptedQuestion: obj } }, { new: true });
    //     // let runningExam= await findUser.attemptedQuestion.push(req.body);
    //     // await runningExam.save()
    //     return res.json({ msg: "success in adding question answer", success: true, runningExam })
    // }
}

const getAllAttemptedExam = async(req,res)=>{
    const UserId = req.params._userId;
    console.log(UserId)
    let user = await User.findById(UserId).populate({path:"Exam"});
    res.json(user)

}


module.exports = {
    attempted,
    getSignleAllAttemptedExam,
    addQuestions,
    getAllAttemptedExam
}