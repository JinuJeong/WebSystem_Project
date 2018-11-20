const mongoose = require('mongoose');
const config = require('./config');

//Set User Schema
const userSchema = mongoose.Schema({
                id : {type: String, unique: true},
                password : {String},
});

//Set mongoose connect
function connect () {
    mongoose.connect(config.dbUrl());
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', () => {
        console.log("mongoose is connected successfully.");
    })
};

//Create Student
userSchema.statics.usercreate = async function(payload, res) {
    const user = await new this(payload);
    await connect();

    return user.save();
};

//Find Student
userSchema.statics.userfind = async function(name) {
    await connect();
    if(name.length==0) return -1;
    else return await this.findOne({name});
};

//Send all students
userSchema.statics.usersendAll = async function () {
    await connect();
    return await this.find();
};

//Delete Student
exports.std_delete = function(info){
	 connect();
	 User.remove(info,(err,doc)=>{
					 console.log(doc);
					 mongoose.disconnect();
					 return 1;
	 });
}

//Update student
exports.std_update = function(info,set){
	 connect();
	 User.update(info,set,(err,doc)=>{
					 console.log(doc);
					 mongoose.disconnect();
					 return 1;
	 });
}

//module exports to Routers ★★★★★★★★★★★★
module.exports = mongoose.model("user", userSchema);

