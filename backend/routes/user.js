const express = require('express');
const router = express.Router();
const userModel = require('../db/models/user')
const circleModel = require('../db/models/circle')
const nodemailer = require('nodemailer');

router.use('/',(req, res, next)=>{
    console.log("user start")
    next()
})
router.get('/send', (req, res) => {
    userModel.find().then((user) => {
        res.send(user)
    })
});

router.get('/find/:name', (req, res) => {
   var name = req.params.name

   userModel.findOne({name}).populate('circles').exec().then((user) => {
       res.send(user)
   })
});

router.get('/find/user/:userId',(req,res)=>{
    console.log(req.params.userId)
    userModel.findOne({"ID":req.params.userId}).populate({
        path: 'circles',populate : {path: 'president'}
    }).exec().then((user)=>{
        console.log(user.circles[0])
        res.send(user)
    })
})

router.get('/dup/:userId',(req,res)=>{
    userModel.findOne({"ID":req.params.userId}).then((data)=>{
        res.send(data)
    })
})

router.post('/signin',(req,res)=>{
    var session
    
    userModel.findOne(req.body).then((user)=>{
        res.send(user)
    })
});

router.post('/signup',(req,res)=>{
    console.log(req.body)
    userModel.create(req.body).then((data)=>{
        let email = req.body.ID;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ajoudong@gmail.com',  // gmail 계정 아이디를 입력
                pass: 'adong123'          // gmail 계정의 비밀번호를 입력
            }
        });
    
        let mailOptions = {
            from: 'ajoudong@gmail.com',    // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
            to: email ,                     // 수신 메일 주소
            subject: '안녕하세요, A-Dong입니다. 이메일 인증을 해주세요.',   // 제목
            html: '<p>아래의 링크를 클릭해주세요 !</p>' +
          "<a href='http://localhost:8000/user/auth/"+email+"'>인증하기</a>"
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            }
            else {
                console.log('Email sent: ' + info.response);
                
            }
        });
        res.send("ok")
    }).catch((err)=>{
        res.send(err);
    })
});

router.get('/auth/:email',(req,res)=>{
    let email = req.params.email;
    console.log(email);
    userModel.update({"ID":email},{"auth":true}).then((data)=>{
        res.send("인증 완료")
    })
})

router.post("/:name/update/profile",(req, res)=>{
    var name = req.params.name
    var _id
    console.log(name)
userModel.findOne({name}).then((user) => {
        _id = user._id
    }).then(() => {
        userModel.findByIdAndUpdate({_id}, {"name": req.body.name, "nickname": req.body.nickname, "department": req.body.department})
        .then((user) => {
            console.log(user)//바뀌기 전의 유저
            userModel.findById({_id}).then((user) => {
                console.log(user) //바뀐 유저
                res.send(user)
            })
        })
    })
})

router.post("/:name/update/call",(req, res)=>{
    var name = req.params.name
    var _id

userModel.findOne({name}).then((user) => {
        _id = user._id
    }).then(() => {
        userModel.findByIdAndUpdate({_id}, {"call": req.body.call, "ID": req.body.ID})
        .then((user) => {
            console.log(user)//바뀌기 전의 유저
            userModel.findById({_id}).then((user) => {
                console.log(user) //바뀐 유저
                res.send(user)
            })
        })
    })
})


router.post("/:name/update/password",(req, res)=>{
    var name = req.params.name
    var _id
    console.log(req.body)
userModel.findOne({name}).then((user) => {
        _id = user._id
    }).then(() => {
        userModel.findByIdAndUpdate({_id}, {"password": req.body.password})
        .then((user) => {
            console.log(user)//바뀌기 전의 유저
            userModel.findById({_id}).then((user) => {
                console.log(user) //바뀐 유저
                res.send(user)
            })
        })
    })
})

router.delete("/:name/delete", (req, res) => {
    var name = req.params.name
    var _id

    userModel.deleteOne({name}).then(() => {
        res.end()
    })
})

router.post("/:name/signupCircle", (req, res) => {
    var name = req.params.name
    
    userModel.findOne({name}).populate('circles').exec().then((user) => {

        for(var i = 0; i < user.circles.length; i++){
            if(user.circles[i].name === req.body.name)
                throw new Error();
        }
        
        return user
    }).then((user) => {
        user.circles.push(req.body)
        user.save()

        res.send(user)
    }).catch((err) => {
        res.send("err")
        console.log("이미 동아리에 가입하셨습니다.")
    })
})

router.post("/:name/reject", (req, res) => {
    var name = req.params.name //거절 유저 이름
    
    userModel.findOne({name}).populate('circles').exec().then((user) => {
        user.circles.pull({_id: req.body._id})
        user.save()
        console.log("User DB에서 삭제 완료")
    }).then(() => {
        res.end()
    })
})
module.exports = router;
