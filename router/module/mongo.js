const mongoose = require('mongoose');
const config = require('./config');

//Set User Schema
const UserSchema = mongoose.Schema({
                ID : {type: String, unique: true},
                password : String,
            });

//Set User Colletion
const User = mongoose.model("User",UserSchema);

exports.std_save = function(info){
            
				mongoose.connect(config.dbUrl());
            const db =mongoose.connection;
            db.on('error',console.error.bind(console,'connection error:'));
            db.once('open',()=>{
                    console.log("connect success!!");
                    });

            //creat student Object
            const student = new User(info);

            student.save((err)=>{
                    if(err) console.log(err);
                    mongoose.disconnect();
                    return 1;
            })

}

exports.std_find = function(info){
	 mongoose.connect(config.dbUrl());
	 const db = mongoose.connection;
	 db.on('error', console.error.bind(console,'connection error:'));
	 db.once('open',()=>{
				console.log("connect success!!");
				});
	 User.find(info, (err,doc)=>{
					 console.log(doc);
					 if(doc.length==0) return -1;

					 else return doc;
	 });
					 
}
