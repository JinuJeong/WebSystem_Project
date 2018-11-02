const express = require('express');
const router = express.Router();
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
		  id : String,
		  pw : String
	 });

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static('public'));

router.use('/',(req,res,next)=>{
		  next();
		  });

router.get('/',(req,res)=>{
		  res.render('login',{
					 title : "SIGNIN"
					 });
		  });

router.get('/signup',(req,res)=>{
		  res.render('signup',{
					 title : "SIGNUP"
					 });
		  });

module.exports = router;
