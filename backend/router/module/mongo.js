const mongoose = require('mongoose');
const config = require('./config');

//Set User Schema
const UserSchema = mongoose.Schema({
                ID : {type: String, unique: true},
                password : String,
            });

//Set User Colletion
const User = mongoose.model("User",UserSchema);


//Set mongoose connect
function con(){
	             mongoose.connect(config.dbUrl());
            const db =mongoose.connection;
            db.on('error',console.error.bind(console,'connection error:'));
            db.once('open',()=>{
                    console.log("connect success!!");
                    });
}

//Create Student
exports.std_save = function(info){
	 
	 con();
	 //creat student Object
	 const student = new User(info);

	 student.save((err)=>{
				if(err) console.log(err);
				mongoose.disconnect();
				return 1;
	 })

}

//Find Student
exports.std_find = function(info){
	 con();
	 User.find(info, (err,doc)=>{
					 console.log(doc);
					 mongoose.disconnect();
					 if(doc.length==0) return -1;

					 else return doc;
	 });
					 
}

//Delete Student
exports.std_delete = function(info){
	 con();
	 User.remove(info,(err,doc)=>{
					 console.log(doc);
					 mongoose.disconnect();
					 return 1;
	 });

}

//Update student
exports.std_update = function(info,set){
	 con();
	 User.update(info,set,(err,doc)=>{
					 console.log(doc);
					 mongoose.disconnect();
					 return 1;
	 });
}

