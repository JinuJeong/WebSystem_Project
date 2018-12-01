const express = require('express');
const router = express.Router();
const userModel = require('../db/models/user')
const circleModel = require('../db/models/circle')
const scheduleModel = require('../db/models/schedule')
const boardModel = require('../db/models/board')
const groupModel = require('../db/models/group')

let circleName
let postType
let model

router.use("/:circleName/board/:postType",(req,res,next)=>{
    circleName=req.params.circleName
    name = req.params.name
    postType = req.params.postType
    next();
});

router.get("/:circleName/board/:postType",(req,res,next)=>{
    boardModel.find({"circleName":circleName,"postType":postType}).then((data)=>{
        console.log(data)
        res.send(data)
    })
});

router.post("/:circleName/board/:postType/create",(req,res,next)=>{
    let value=req.body;
    value["circleName"]=req.params.circleName
    value["postType"]=postType
    boardModel.create(value).then((data)=>{
        res.send("ok")
    })
});

router.get("/:circleName/board/schedule",(req,res,next)=>{
    boardModel.find({"circleName":circleName,"postType":postType}).then((data)=>{
        res.send(data)
    })
});

router.get("/:circleName/board/:postType/:postNum",(req,res,next)=>{
    boardModel.findOne({"postNum":req.params.postNum}).then((data)=>{
        res.send(data)
    })
})

router.post("/:circleName/board/:postType/:postNum/delete",(req,res,next)=>{
    boardModel.deleteOne({"postNum":req.params.postNum}).then((data)=>{
        res.send("ok")
    })
})

router.post("/:circleName/board/:postType/:postNum/update",(req,res,next)=>{
    boardModel.updateOne({"postNum":req.params.postNum},{"title":req.body.title,"contents":req.body.contents}).then((data)=>{
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

// Schedule Part
router.get('/:circleName/schedule',(req,res)=>{
    scheduleModel.find().then((data)=>{
        res.send(data)
    })
})

router.post('/:circleName/schedule/create',(req,res)=>{
    scheduleModel.create(req.body).then((data)=>{
        res.send("ok")
    })
})

router.post('/:circleName/schedule/delete',(req,res)=>{
    scheduleModel.deleteOne(req.body).then((data)=>{
        res.send("ok")
    })
})

router.post('/:circleName/schedule/update',(req,res)=>{
    scheduleModel.update({"scheduleId":req.body.scheduleId},req.body).then((data)=>{
        res.send("ok")
    })
})

//Group part
router.post('/:circleName/group/create',(req,res)=>{
    let group = req.body
    userModel.findOne({"ID":group.teacher}).then((user)=>{
        group["teacher"]={"_id":user._id}
        console.log(group)
        groupModel.create(group).then((data)=>{
            res.send("ok")
        })
    })
})

router.get('/:circleName/group',(req,res)=>{
    groupModel.find().then((data)=>{
        res.send(data)
    })
})

router.get('/:circleName/group/:groupId',(req,res)=>{
    groupModel.findOne({"groupId":req.params.groupId}).then((data)=>{
        res.send(data);
    })
})

module.exports = router;