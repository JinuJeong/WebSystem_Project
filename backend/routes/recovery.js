const express = require('express');
const router = express.Router();
const recoveryModel = require('../db/models/recovery')
const scheduleModel = require('../db/models/schedule')
const boardModel = require('../db/models/board')
const groupModel = require('../db/models/group')
const activeModel = require('../db/models/active')

router.post("/",(req,res,next)=>{
    recoveryModel.create(req.body).then((data)=>{
        
        res.send(data);

    })
});

router.get("/get",(req,res,next)=>{
    recoveryModel.find().then((data)=>{
        res.send(data)
    })
})

router.post('/restore',(req,res,next)=>{
    let model
    if(req.body.kind=="schedule")   model = scheduleModel
    else if (req.body.kind=="board") model = boardModel
    else if (req.body.kind=="group") model = groupModel
    else if (req.body.kind=="active") model = activeModel
    let value = req.body
    delete value['kind']
    delete value['removeTime']
    delete value['recoveryId']
    model.create(value).then(()=>{
        recoveryModel.deleteOne(value).then(()=>{
            res.send("ok")
        })
    })
})

module.exports = router;