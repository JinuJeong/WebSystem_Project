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

router.use('/', (req, res, next) => {
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
router.get('/search_address', (req, res) => {
		  res.render('search_address');
		  });

module.exports = router;
