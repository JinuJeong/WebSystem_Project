const { mongoose, autoIncrement } = require('../mongo')

//Set User Schema
const userSchema = mongoose.Schema({
    ID : {type: String, unique: true},
    password : {type :String, require: true},
    call : {type :String},
    nickname : {type : String},
    name : {type: String, require: true},
    department: {type: String, require: true},
    auth: {type: Boolean, default: false},
    interest: {type: String},
    birth: {type: Number}
});

//module exports to Routers ★★★★★★★★★★★★
module.exports = mongoose.model("user", userSchema);

