const express = require('express');
const router = express.Router();

router.use(express.static('public'));

router.use('/',(req,res,next)=>{
		  next();
		  });

router.get('/',(req,res)=>{
		res.sendFile(path.join(__dirname,"../public","index.html"))
});


module.exports = router
