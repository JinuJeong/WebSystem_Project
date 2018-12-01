const express = require('express');
const router = express.Router();
const userModel = require('../db/models/user')
const circleModel = require('../db/models/circle')
const noticeModel = require('../db/models/notice')
const scheduleModel = require('../db/models/schedule')

router.post("/:name/schedule/create",(req,res,next)=>{
    console.log(req.body)
    scheduleModel.create(req.body).then((data)=>{
        res.send("ok")
    })
});

router.get("/:name/schedule",(req,res,next)=>{
    scheduleModel.find().then((data)=>{
        res.send(data)
    })
});

router.get("/:name/schedule/:title/:date",(req,res,next)=>{
    let parm={"title":req.params.title,"date":req.params.date}
    scheduleModel.findOne(parm).then((data)=>{
        console.log(parm)
        res.send(data)
    })
})

router.post("/:name/schedule/delete",(req,res,next)=>{
    scheduleModel.deleteOne(req.body).then((data)=>{
        res.send("ok")
    })
})

router.post("/:name/schedule/update",(req,res,next)=>{
    let notice = {"title":req.body.title,"date":req.body.date};
    scheduleeModel.updateOne(notice,{"contents":req.body.contents}).then((data)=>{
        res.send("ok");
    })
})

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

router.use('/', (req, res, next) => {
    console.log("circle start")
    next()
});

router.get('/send', (req, res) => {
    /*
   circleModel.find().then((circles) => {
       res.send(circles)
   })
   */
    circleModel.find().populate('president').exec((err, data) => {
        res.send(data)
})
});

router.post('/register', (req, res) => {
   console.log(req.body)
   circleModel.create(req.body).then((circle) => {
       res.send(circle)
   })
});

router.get('/find/:name', (req, res) => {
   circleModel.find(req.params.name).then((circle) => {
       res.send(circle)
   })
});
/*
router.get('/send/:name', (req, res) => {
    console.log(req.params.name)
    circlename = req.params.name
    circleModel.find().populate('president').exec((err, data) => {
        console.log(data)
    })
    circleModel.findOne({name: circlename}).populate('president').exec((err, data) => {
        console.log("회장이름 갑니다."+ data.president.name)
        res.send(data.president.name)
    })
})
*/

module.exports = router;