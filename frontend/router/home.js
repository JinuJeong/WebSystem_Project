const express = require('express');
const router = express.Router();

router.use(express.static('public'));

router.use('/',(req,res,next)=>{
		  next();
		  });

router.get('/',(req,res)=>{
		  res.render('home',{
				title : "HOME"
				});
		  });


module.exports = router
