const express = require('express');
const router = express.Router();
const userModel = require('../db/models/user')
const circleModel = require('../db/models/circle')

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