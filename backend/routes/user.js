const express = require('express');
const router = express.Router();
const userModel = require('../db/models/user')
const circleModel = require('../db/models/circle')

router.use('/',(req,res,next)=>{
    console.log("user start")
    next()
})
router.get('/send', (req, res) => {
    User.usersendAll().then((user) => {
        mongoose.disconnect()
        .then(res.send(user))
    })
});

router.post('/create', (req, res) => {

});

router.get('/find/:name', (req, res) => {
    console.log("this it user /:name")
    User.userfind(req.params.name)
        .then((user) => {
            mongoose.disconnect()
            .then(res.send(user))
        });
});

router.post('/signin',(req,res)=>{
    console.log("this is /signin")
    console.log(req.body)
    userModel.findOne(req.body).then((user)=>{
        console.log(user)
        res.send(user)
    })
})
module.exports = router;