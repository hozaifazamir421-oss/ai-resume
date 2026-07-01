const mongoose = require("mongoose");


const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention:{
        type:String,
        required: [true, "Intention is required"]
    },
    answer:{
        type: String,
        required:[true, "Answer is required"]
    }
},{
    _id: false
})
const behavioralQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention:{
        type:String,
        required: [true, "Intention is required"]
    },
    answer:{
        type: String,
        required:[true, "Answer is required"]
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:[true, "Skill is required"]
    },
    severity: {
        type: String,
        enum:["low","medium","high"],
        required:[true, "Severity is required"]
    }
},{
    _id:false
})

const preparationSchema = new mongoose.Schema({
    day:{
        type: String,
        required: [true, "Day is required"]
    },
    focus:{
        type: String,
        required: [true, "Focus is required"]
    },
    tasks:[{
        type: String,
        required:[true,"Task is required"]
    }]
},{
    _id: false
})

const reportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: true
    },
    resume:{
        type: String
    },
    selfDescription:{
        type: String
    },
    matchScore:{
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    title:{
        type: String,
        required: [true, "Job title is required"],
    }
    
},{
    timestamps: true
})

const reportModel = mongoose.model("report", reportSchema)

module.exports = reportModel