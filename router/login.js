const express = require('express');
const router = express.Router();
const bodyParser  = require('body-parser');
const config = require('./module/config');
const mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.static('public'));

//Set User Schema
const UserSchema = mongoose.Schema({
                ID : {type: String, unique: true},
                password : String,
            });

//Set User Colletion
const User = mongoose.model("User",UserSchema);

router.use('/',(req,res,next)=>{
		  next();
		  });

router.get('/', (req, res) => {
		  res.render('login',{
					 title : 'SIGN IN'
					 });
		  });

router.get('/signup', (req, res) => {
		  res.render('signup',{
					 title : 'SIGN UP'
					 });
		  });

//request user info
router.post('/signup/create',(req,res)=>{
				const info = {"ID":req.body.ID,"password":req.body.PW};
				console.log(info);
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
						  res.redirect('/');
				})
								
});

//request login
router.post('/signin',(req,res)=>{
		  mongoose.connect(config.dbUrl());
		  const db = mongoose.connection;
		  db.on('error',console.error.bind(console,'connection error:'));
		  db.once('open',()=>{
					 console.log("connect success!!");
					 });

		  User.find({"ID":req.body.ID,"password":req.body.PW},(err,doc)=>{
					 console.log(doc);
					 if(doc.length==0) res.redirect('/login'); 
					 else	res.redirect('/'); 
		  });
		  				
});

module.exports = router;
