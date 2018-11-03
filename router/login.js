const express = require('express');
const router = express.Router();
const bodyParser  = require('body-parser');
const config = require('./module/config');
const mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.static('public'));

<<<<<<< HEAD
//Set User Schema
const UserSchema = mongoose.Schema({
                ID : {type: String, unique: true},
                password : String,
            });

//Set User Colletion
const User = mongoose.model("User",UserSchema);

router.use('/',(req,res,next)=>{
=======
router.use('/', (req, res, next) => {
>>>>>>> 5954517d6d95c02d4d5fc390e0bd7eb3e8889cac
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

router.post('/signup/create',(req,res)=>{
				//requset user info
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

router.get('/search_address',(req,res)=>{
		  res.render('search_address');
		  });

module.exports = router;
