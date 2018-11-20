const express = require('express');
const router = express.Router();
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const User = require('../mongoose/user')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static('public'));
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.get('/send', (req, res) => {
    User.usersendAll().then((user) => {
        mongoose.disconnect()
        .then(res.send(user))
    })
});

router.post('/create', (req, res) => {
    console.log("this it user create")
    User.usercreate(req.body, res)
    .then(mongoose.disconnect())
    .catch(err => res.send(err));
});

router.get('/find/:name', (req, res) => {
    console.log("this it user /:name")
    User.userfind(req.params.name)
        .then((user) => {
            mongoose.disconnect()
            .then(res.send(user))
        });
});


module.exports = router;