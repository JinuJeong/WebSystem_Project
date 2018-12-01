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

router.post('/:name/signupCircle', (req, res) => {
    var name =  req.params.name // 동아리이름 
                                // req.body user 정보
    circleModel.findOne({name}).populate('members').exec().then((circle) => {
        
        for(var i = 0; i < circle.members.length; i++){
            if(circle.members[i].name === req.body.name)
                throw new Error();
        }

        return circle
    }).then((circle) => {
        circle.members.push(req.body)
        circle.save().then(() => {
            console.log(circle)
            console.log(req.body.name)
        })
        res.send(circle)
    }).catch((err) => {
        res.send("err")
        console.log("err")
    })
})

module.exports = router;