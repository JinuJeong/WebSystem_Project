const express = require('express');
const router = express.Router();
const boardModel = require('../db/models/board')

module.exports = router;

router.post("/:boardName/create",(req,res,next)=>{
    console.log(req.body)
    boardModel.create(req.body).then((data)=>{
        res.send("ok")
    })
});

router.get("/:boardName/",(req,res,next)=>{
    boardModel.find().then((data)=>{
        res.send(data)
    })
});

router.get("/:boardName/:title/:date",(req,res,next)=>{
    let parm={"postTitle":req.params.title,"postDate":req.params.date}
    boardModel.findOne(parm).then((data)=>{
        console.log(parm)
        res.send(data)
    })
})

router.post("/:boardName/delete",(req,res,next)=>{
    boardModel.deleteOne(req.body).then((data)=>{
        res.send("ok")
    })
})

router.post("/:boardName/update",(req,res,next)=>{
    let notice = {"title":req.body.title,"date":req.body.date};
    boardModel.updateOne(notice,{"contents":req.body.contents}).then((data)=>{
        res.send("ok");
    })
})