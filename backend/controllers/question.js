
const Option = require('../models/Option');

const Question = require('../models/Question');

const createQuestion = async (req, res) => {
    try {
        const { question, options, correctOption, batch, examno,category } = req.body;

        // Create options
        let optionDocs=""
        if(options && correctOption){
            console.log("yes")
            optionDocs = await Option.insertMany(options.map(opt => ({ text: opt })));
            const task = new Question({
                question,
                options:optionDocs? optionDocs.map(option => option._id):[],
                correctOption:correctOption? optionDocs[correctOption - 1]._id:"",
                batch,
                examno,
                category
            });
            console.log(task)
            await task.save();
            return res.status(201).json({ message: 'Question created successfully', task,success: true });
        }
        else{
            const task = new Question({
                question,
                batch,
                examno,
                category
            });
            console.log(task)
            await task.save();
           return res.status(201).json({ message: 'Question created successfully', task,success:true });
        }
        // console.log(optionDocs)
        // await optionDocs.save()
        // Create question
        console.log(optionDocs)
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error,success:false });
    }
};

const getExamNo = async (req, res) => {
    const examno = req.params.no
    console.log(examno);
    const questions = await Question.find({ examno: examno }).populate([{ path: 'options' }, { path: 'correctOption' }])
    try {
        res.status(200).json({ msg: "fetched successfully", questions })
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error });
    }
}
const getbatchExam = async (req, res) => {
    const batch = req.params.batchno;
    console.log(batch);
    const questions = await Question.find({ batch }).populate([{ path: 'options' }, { path: 'correctOption' }])
    try {
        res.status(200).json({ msg: "fetched successfully", questions })
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error });
    }
}

const getallQuestion = async (req, res) => {
    let questions = await Question.find().populate([{path:'correctOption'},{path:'options'}]);
    try {
        res.status(200).json({ msg: "fetched successfully", questions });
    } catch (error) {
        res.status(500).json({ msg: "Internal server error", error })
    }
}

const findQuestionUsingbatchAndexamNo = async(req,res)=>{
    const examno =req.params.examno;
    const batchno =req.params.batch;
    const question = await Question.find({examno: examno, batch: batchno}).populate([{path:'correctOption'},{path:'options'}]);
    try {
        return res.json({msg:"fetched successfully",question})
    } catch (error) {
        res.status(500).json({ msg: "error in finding questions exam ", error })
    }
}

const getAllQuestions =async(req,res)=>{
    const questions = await Question.find({}).populate([{path:'correctOption'},{path:'options'}]);
    res.json({msg:"fetched successfully",questions})
}



module.exports = {
    createQuestion,
    getAllQuestions,

    getbatchExam,
    getExamNo,
    findQuestionUsingbatchAndexamNo,
    getallQuestion
}