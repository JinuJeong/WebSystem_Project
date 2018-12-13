const { mongoose, autoIncrement } = require('../mongo')
const circleModel = require('./circle')

//Set User Schema
const userSchema = mongoose.Schema({
    ID : {type: String, unique: true, required: true},
    admin : {type: Boolean, default: false},
    password : {type :String, required: true},
    call : {type :String},
    nickname : {type : String},
    name : {type: String, required: true},
    department: {type: String, required: true},
    auth: {type: Boolean, default: false},
    interest: {type: String},
    studentId: {type: String, required: true},
    birth: {type: Number},
    circles: [{type: mongoose.Schema.Types.ObjectId, ref: 'circle'}],
    value: {type: Boolean, default: false},
    userType: {type: Number, default : 1}
});

//module exports to Routers ★★★★★★★★★★★★
module.exports = mongoose.model("user", userSchema);

