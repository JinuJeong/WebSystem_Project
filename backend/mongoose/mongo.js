const mongoose = require('mongoose');
const config = require('./config');

//Set User Schema
const userSchema = mongoose.Schema({
                id : {type: String, unique: true},
                password : {String},
});

const circleSchema = mongoose.Schema({
    name: {type: String, unique: true},
    party: {type: String},
    roomExistence: {type: Boolean},
    roomLocation: {type: Number},
    president: {type: mongoose.Schema.Types.ObjectId},
    vicePresident: {type: mongoose.Schema.Types.ObjectId},
    memberNumber: {type: Number},
    subject: {type: String},
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
    console.log("userSchema create " + payload)
    
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

//Create circle
circleSchema.statics.circlecreate = async function(payload, res) {
    const circle = await new this(payload);
    await connect();

    return circle.save();
};

//Find a circle by name
circleSchema.statics.circlefind = async function(name) {
    await connect();
    return await this.findOne({name});
};

//Send all circles
circleSchema.statics.circlesendAll = async function () {
    await connect();
    return await this.find();
};

//module exports to Routers ★★★★★★★★★★★★
var Circle = mongoose.model("circle", circleSchema);
var User = mongoose.model("user", userSchema);

