const express = require('express');
const router = express.Router();
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const Circle = require('./module/circles')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static('public'));
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.get('/send', (req, res) => {
    Circle.sendAll().then((circle) => {
        mongoose.disconnect()
        .then(res.send(circle))
    })
});

router.post('/create', (req, res) => {
    Circle.create(req.body, res)
    .then(mongoose.disconnect())
    .catch(err => res.send(err));
});

router.get('/:name', (req, res) => {
    Circle.findOneByName(req.params.name)
        .then((circle) => { //무조건 user를 input으로 받아야 한다.
            mongoose.disconnect()
            .then(res.send(circle))
        });
});

module.exports = router;