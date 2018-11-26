const express = require('express');
const router = express.Router();
const userModel = require('../db/models/user')
const circleModel = require('../db/models/circle')
const noticeModel = require('../db/models/notice')

router.post("/:name/notice/create",(req,res,next)=>{
    console.log(req.body)
    noticeModel.create(req.body).then((data)=>{
        res.send("ok")
    })
});

router.get("/:name/notice",(req,res,next)=>{
    noticeModel.find().then((data)=>{
        res.send(data)
    })
});

router.get("/:name/notice/:title/:date",(req,res,next)=>{
    let parm={"title":req.params.title,"date":req.params.date}
    noticeModel.findOne(parm).then((data)=>{
        console.log(parm)
        res.send(data)
    })
})

router.post("/:name/notice/delete",(req,res,next)=>{
    noticeModel.deleteOne(req.body).then((data)=>{
        res.send("ok")
    })
})

router.post("/:name/notice/update",(req,res,next)=>{
    let notice = {"title":req.body.title,"date":req.body.date};
    noticeModel.updateOne(notice,{"contents":req.body.contents}).then((data)=>{
        res.send("ok");
    })
})

module.exports = router;