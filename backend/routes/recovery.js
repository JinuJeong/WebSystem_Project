const express = require('express');
const router = express.Router();
const recoveryModel = require('../db/models/recovery')

router.post("/",(req,res,next)=>{
    recoveryModel.create(req.body).then((data)=>{
        console.log("recovery start")
        console.log(req.body)
        res.send(data);

    })
});

module.exports = router;