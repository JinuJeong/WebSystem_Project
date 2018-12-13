const express = require('express');
const router = express.Router();
const boardModel = require('../db/models/board')

module.exports = router;

router.post("/:boardName/create",(req,res,next)=>{
    //console.log(req.body)

    boardModel.create(req.body).then((data)=>{
        res.send("ok")
    })
});

router.get("/:boardName/",(req,res,next)=>{

    boardModel.find({"postType" : req.params.boardName,"circleName":"Home"}).sort( { "postNum": -1 }).then((data)=>{
        res.send(data)
    })
});

router.get("/home/:boardName/",(req,res,next)=>{

    //console.log(req.params.boardName)

    boardModel.find({"postType" : req.params.boardName,"circleName":"Home"}).sort({ "postNum" : -1}).limit(5).then((data)=>{
        res.send(data)
    })
});

router.get("/:boardName/:postNum",(req,res,next)=>{
    boardModel.findOne({"postNum":req.params.postNum}).then((data)=>{
        res.send(data)
    })
})

router.post("/:boardName/delete",(req,res,next)=>{
    boardModel.deleteOne(req.body).then((data)=>{
        res.send("ok")
    })
})

router.post("/:boardName/:postNum/update",(req,res,next)=>{
    boardModel.updateOne({"postNum":req.params.postNum},{"title":req.body.title, "contents":req.body.contents}).then((data)=>{
        res.send("ok");
    })
})

router.post("/:boardName/:postNum/cmtCreate", (req, res, next) => {
    console.log(req.body)
    boardModel.updateOne({ "postNum": req.params.postNum },{$push: { comment : req.body }}).then((data) => {
        res.send("ok");
    })
})

router.get("/:boardName/:postNum/cmtLoad", (req, res, next) => {
    boardModel.findOne({"postType" : req.params.boardName,"circleName":"Home","postNum":req.params.postNum}).then((data)=>{
        res.send(data.comment)
    })
})

router.post("/:boardName/:postNum/cmtDelete/:_id", (req, res, next) => {
    boardModel.findOne({ "postNum": req.params.postNum }).then((data) => {
        console.log(data.comment)
        console.log(req.params._id)
        data.comment.pull({_id:req.params._id})
        data.save()
    }).then(() => {
        res.send("ok");
    })
})

router.post("/:boardName/:postNum/cmtChange/:_id", (req, res, next) => {
    console.log(req.body.cmtContent)
    boardModel.updateOne({ "postNum": req.params.postNum, "comment._id": req.params._id },
    {"comment.$.cmtContent": req.body.cmtContent}).then((data) => {
        res.send("ok");
    })
})