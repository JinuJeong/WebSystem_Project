const express = require('express');
const router = express.Router();
const userModel = require('../db/models/user')
const circleModel = require('../db/models/circle')

router.get('/send', (req, res) => {
    Circle.circlesendAll().then((circle) => {
        mongoose.disconnect()
        .then(res.send(circle))
    })
});

router.post('/create', (req, res) => {
    console.log("circle create")
    Circle.circlecreate(req.body, res)
    .then(mongoose.disconnect())
    .catch(err => res.send(err));
});

router.get('/find/:name', (req, res) => {
    Circle.circlefind(req.params.name)
        .then((circle) => {
            mongoose.disconnect()
            .then(res.send(circle))
        });
});

module.exports = router;