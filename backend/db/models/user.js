const { mongoose, autoIncrement } = require('../mongo')

//Set User Schema
const userSchema = mongoose.Schema({
                ID : {type: String, unique: true},
                password : {type :String, require: true},
                name : {type: String, require: true}
});

//module exports to Routers ★★★★★★★★★★★★
module.exports = mongoose.model("user", userSchema);

