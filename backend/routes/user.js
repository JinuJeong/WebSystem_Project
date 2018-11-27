const express = require('express');
const router = express.Router();
const userModel = require('../db/models/user')
const circleModel = require('../db/models/circle')
const nodemailer = require('nodemailer');

router.use('/',(req,res,next)=>{
    console.log("user start")
    next()
})
router.get('/send', (req, res) => {
    userModel.find().then((user) => {
        res.send(user)
    })
});

router.post('/create', (req, res) => {

});

router.get('/find/:name', (req, res) => {
   var name = req.params.name
   
   userModel.findOne({name}).then((user) => {
       res.send(user)
   })
});

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

        res.send(data)
    }).catch((err)=>{
        console.log(err)
        res.send(err)
    })
});
router.get('/auth/:email',(req,res)=>{
    let email = req.params.email
    console.log(email)
    userModel.update({"ID":email},{"auth":true}).then((data)=>{
        res.send("인증 완료")
    })
})
module.exports = router;