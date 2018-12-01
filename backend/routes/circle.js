const express = require('express');
const router = express.Router();
const userModel = require('../db/models/user')
const circleModel = require('../db/models/circle')
const noticeModel = require('../db/models/notice')
const scheduleModel = require('../db/models/schedule')
const boardModel = require('../db/models/board')

let circleName
let kind
let model

router.use("/:name/board/:kind",(req,res,next)=>{
    name = req.params.name
    kind = req.params.kind
    if(kind=="notice") model=noticeModel
    else if(kind=="board") model=boardModel
    next();
});

router.get("/:name/board/:kind",(req,res,next)=>{
    model.find().then((data)=>{
        res.send(data)
    })
});

router.post("/:name/board/:kind/create",(req,res,next)=>{
    model.create(req.body).then((data)=>{
        res.send("ok")
    })
});

router.get("/:name/board/schedule",(req,res,next)=>{
    model.find().then((data)=>{
        res.send(data)
    })
});

router.get("/:name/board/:kind/:title/:date",(req,res,next)=>{
    let parm={"title":req.params.title,"date":req.params.date}
    model.findOne(parm).then((data)=>{
        console.log(parm)
        res.send(data)
    })
})

router.post("/:name/board/:kind/delete",(req,res,next)=>{
    model.deleteOne(req.body).then((data)=>{
        res.send("ok")
    })
})

router.post("/:name/board/:kind/update",(req,res,next)=>{
    let notice = {"date":req.body.date};
    model.updateOne(notice,{"title":req.body.title,"contents":req.body.contents}).then((data)=>{
        res.send("ok");
    })
})

router.get('/send', (req, res) => {
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
router.get('/:name/schedule',(req,res)=>{
    scheduleModel.find().then((data)=>{
        res.send(data)
    })
})

router.post('/:name/schedule/create',(req,res)=>{
    scheduleModel.create(req.body).then((data)=>{
        res.send("ok")
    })
})

router.post('/:name/schedule/delete',(req,res)=>{
    scheduleModel.deleteOne(req.body).then((data)=>{
        res.send("ok")
    })
})

router.post('/:name/schedule/update',(req,res)=>{
    scheduleModel.update({"scheduleId":req.body.scheduleId},req.body).then((data)=>{
        res.send("ok")
    })
})


module.exports = router;