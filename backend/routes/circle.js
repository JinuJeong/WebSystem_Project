const express = require('express');
const router = express.Router();
const userModel = require('../db/models/user')
const circleModel = require('../db/models/circle')
const scheduleModel = require('../db/models/schedule')
const boardModel = require('../db/models/board')
const groupModel = require('../db/models/group')
const activeModel = require('../db/models/active')
const nodemailer = require('nodemailer');

let circleName
let postType
let model
let name


router.use("/:circleName/board/:postType",(req,res,next)=>{
    circleName=req.params.circleName
    name = req.params.name
    postType = req.params.postType
    next();
});

router.get("/:circleName/board/:postType",(req,res,next)=>{
    boardModel.find({"circleName":circleName,"postType":postType}).sort('-postNum').then((data)=>{
        
        res.send(data)
    })
});

router.post("/:circleName/board/:postType/create",(req,res,next)=>{
    let value=req.body;
    value["circleName"]=req.params.circleName
    value["postType"]=postType
    boardModel.create(value).then(()=>{
        if(value['postType']=='notice'){
            circleModel.findOne({"name":value["circleName"]}).populate("members.user").exec().then((data)=>{
                
                let maillist=new Array()

                for(let i =0; i<data.members.length; i++){
                    maillist.push(data.members[i].user.ID)
                }
                 
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ajoudong@gmail.com',  // gmail 계정 아이디를 입력
                        pass: 'adong123'          // gmail 계정의 비밀번호를 입력
                    }
                });
            
                let mailOptions = {
                    from: 'ajoudong@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
                    to: maillist ,                     // 수신 메일 주소
                    subject: '안녕하세요, '+value['circleName']+'입니다. 공지 : '+req.body.title, // 제목
                    html: '<p>'+ req.body.contents +'</p>',
                };
        
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    }
                    else {
                        //console.log('Email sent: ' + info.response);
                        
                    }
                });
                res.send("ok")
            })
            
    }else{
        res.send("ok")
    }
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
    let value=req.body;
    value["circleName"]=req.params.circleName
    value["postType"]=postType
    boardModel.updateOne({"postNum":req.params.postNum},{"title":req.body.title,"contents":req.body.contents}).then((data)=>{
        if(value['postType']=='notice'){
            circleModel.findOne({"name":value["circleName"]}).populate("members.user").exec().then((data)=>{
                
                let maillist=new Array()

                for(let i =0;i<data.members.length;i++){
                    maillist.push(data.members[i].user.ID)
                }
                 
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ajoudong@gmail.com',  // gmail 계정 아이디를 입력
                        pass: 'adong123'          // gmail 계정의 비밀번호를 입력
                    }
                });
            
                let mailOptions = {
                    from: 'ajoudong@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
                    to: maillist ,                     // 수신 메일 주소
                    subject: '안녕하세요, '+value['circleName']+'입니다. 공지 수정 : '+req.body.title,   // 제목
                    html: '<p>'+ req.body.contents +'</p>',
                  
                };
        
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    }
                    else {
                        //console.log('Email sent: ' + info.response);
                        
                    }
                });
                res.send("ok")
            })
            
    }else{
        res.send("ok")
    }
    })
})

router.get('/send', (req, res) => {
    circleModel.find().populate('president').populate('members.user').exec((err, data) => {
        res.send(data)
})
});

router.get('/send/title', (req, res) => {

    circleModel.find({"auth" : true}).limit(5).then((data)=>{
        res.send(data)
    })
});

router.post('/send/search', (req, res) => {

    if(req.body.search_select === "name") {
        circleModel.find({"name": req.body.search_value}).populate('president').exec((err, data) => {
            res.send(data)
        })
    }
    else if(req.body.search_select === "professor") {
        circleModel.find({"professor": req.body.search_value}).populate('president').exec((err, data) => {
            res.send(data)
        })
    }
    else if(req.body.search_select === "subject") {
        circleModel.find({"party": req.body.search_value}).populate('president').exec((err, data) => {
            res.send(data)
        })
    }
});

router.post('/register', (req, res) => { //admin에게 동아리 가입 신청
   let data = req.body
   //data['members']=[{"user":req.body.president}]
   circleModel.create(data).then((circle) => {
       console.log(circle.name + "동아리 신청 완료")
       res.send(circle)
   }).catch((err) => {
       console.log("err")
       res.send("err")
   })
});

router.get('/find/:name', (req, res) => {
    var name = req.params.name

   circleModel.findOne({name}).populate('president').populate('members.user').exec().then((circle) => {
       res.send(circle)
   })
});

// Schedule Part
router.get('/:circleName/schedule',(req,res)=>{
    scheduleModel.find({'circle':req.params.circleName}).sort('-scheduleId').then((data)=>{
        res.send(data)
    })
})

router.get('/:circleName/schedule/:scheduleId',(req,res)=>{
    scheduleModel.findOne({'scheduleId':req.params.scheduleId}).then((data)=>{
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
    groupModel.find({'circleName':req.params.circleName}).populate("teacher").sort('-groupId').then((data)=>{
        res.send(data)
    })
})

router.get('/:circleName/group/:groupId',(req,res)=>{
    groupModel.findOne({"groupId":req.params.groupId}).populate("teacher").then((data)=>{
        res.send(data);
    })
})

router.post('/:circleName/group/update/:groupId',(req,res)=>{
    let group = req.body
    userModel.findOne({"ID":group.teacher}).then((user)=>{
        group["teacher"]={"_id":user._id}
        groupModel.updateOne({"groupId":req.params.groupId},group).then((data)=>{
            res.send(data)
        })
    })
})

router.post('/:circleName/group/delete/:groupId',(req,res)=>{
    groupModel.deleteOne({"groupId":req.params.groupId}).then((data)=>{
        res.send(data)
    })
})

//Active

router.post('/:circleName/active/create',(req,res)=>{
    console.log(req.body)
    activeModel.create(req.body).then(()=>{
        res.send("ok")
    })
})

router.get('/:circleName/active',(req,res)=>{
    if(req.params.circleName=="Home"){
        activeModel.find().populate('members').sort('-activeId').then((data)=>{
            res.send(data)
      })
    }else{
        activeModel.find({"circleName":req.params.circleName}).populate('members').sort('-activeId').then((data)=>{
            res.send(data)
        })
    }
})

router.get('/:circleName/active/:activeId',(req,res)=>{
    activeModel.findOne({"activeId":req.params.activeId}).populate('members').then((data)=>{
        res.send(data)
    })
})

router.post('/:circleName/active/delete/:activeId',(req,res)=>{
    activeModel.deleteOne({"activeId":req.params.activeId}).then((data)=>{
        res.send("ok")
    })
})

router.post('/:circleName/active/update/:activeId',(req,res)=>{
    activeModel.update({"activeId":req.body.activeId},req.body).then((data)=>{
        console.log(req.body.contents)
        res.send("ok")
    })
})

router.get('/active/get',(req,res)=>{
    activeModel.find().populate('members').exec().then((data)=>{
        res.send(data);
    })
})

router.post('/:name/signupCircle', (req, res) => {
    var name =  req.params.name // 동아리이름 
                                // req.body user 정보
    circleModel.findOne({name}).populate('members.user').exec().then((circle) => {
        for(var i = 0; i < circle.members.length; i++){
            if(circle.members[i].user.studentId === req.body.studentId)
                throw new Error();
        }
        
        return circle
    }).then((circle) => {
        circle.members.push({user: req.body})
        circle.save()
        console.log(circle.name + "동아리 가입 신청")
        res.send(circle)
    }).catch((err) => {
        res.send("err")
        console.log("err")
    })
})

router.post('/:name/accept', (req, res) => { //회장이 한 유저 동아리 가입 승인
    var name = req.params.name // 동아리 이름

    circleModel.findOne({name}).populate('members.user').exec().then((circle) => {
        for(var i = 0; i < circle.members.length; i++){

            if(circle.members[i].user.name === req.body.name)
                circle.members[i].circleAuth = true
        }
          
        return circle
    }).then((circle) => {
        circle.save()

    }).then(() => {
        console.log(circle.name + "동아리 가입 승인 완료")
        res.end()
    })
});

router.post('/:name/reject', (req, res) => { // circle Schema에 있는 해당하는 member 삭제
    var name = req.params.name // 동아리 이름
    var user                 // req.body user 정보
    var id
    circleModel.findOne({name}).populate('members.user').exec().then((circle) => {
        for(var i = 0; i < circle.members.length; i++){
            if(circle.members[i].user.name === req.body.name)
                id = circle.members[i]._id
        }

        return circle
    }).then((circle) => {
        circle.members.pull({_id: id})
        circle.save()
        console.log(circle.name + "동아리DB에서 삭제 완료")
    }).then(() => {
        res.end()
    })
})

router.post('/:circleName/acceptCircle', (req, res) => { //동아리 신청을 admin이 승인한다.
    var circleName = req.params.circleName

    circleModel.findOne({"name": circleName}).then((circle) => {
        circle.auth = true
        circle.save()
        console.log("동아리 신청 승인 완료")
    }).then(() => {
        res.end()
    })
});

router.post('/:circleName/rejectCircle', (req, res) => { //동아리 신청을 admin이 거절한다.
    var circleName = req.params.circleName
    
    circleModel.deleteOne({"name": circleName}).then(() => {
        console.log("동아리 DB에서 동아리 삭제완료")
    }).then(() => {
        res.end()
    })
});

router.post("/:circleName/board/:postType/:postNum/cmtCreate", (req, res, next) => {
    console.log(req.body)
    boardModel.updateOne({ "postNum": req.params.postNum },{$push: { comment : req.body }}).then((data) => {
        res.send("ok");
    })
})

router.get("/:circleName/board/:postType/:postNum/cmtLoad", (req, res, next) => {
    console.log(req.params.circleName)
    console.log(req.params.postType)
    console.log(req.params.postNum)
    boardModel.findOne({"postType" : req.params.postType,"circleName":req.params.circleName,"postNum":req.params.postNum}).then((data)=>{
        res.send(data.comment)
    })
})

router.post("/:circleName/board/:postType/:postNum/cmtDelete/:_id", (req, res, next) => {
    boardModel.findOne({ "postNum": req.params.postNum }).then((data) => {
        console.log(data.comment)
        console.log(req.params._id)
        data.comment.pull({_id:req.params._id})
        data.save()
    }).then(() => {
        res.send("ok");
    })
})

router.post("/:circleName/board/:postType/:postNum/cmtChange/:_id", (req, res, next) => {
    console.log(req.body.cmtContent)
    boardModel.updateOne({ "postNum": req.params.postNum, "comment._id": req.params._id },
    {"comment.$.cmtContent": req.body.cmtContent}).then((data) => {
        res.send("ok");
    })
})


module.exports = router;
