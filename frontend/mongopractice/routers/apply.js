const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user'); //상대경로..  ㅅㅂ
var user = new User();

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    console.log('it is /');
    res.render('apply');
});

router.post('/user/create', (req, res) => {
    console.log('it is /user/create');
    //model instance = document
    var user = new User();

    user.name = req.body.name;
    user.studentId = req.body.studentId;

    //document instance method
    user.save((err, result) => {
        if (err) res.send(err);
        else {
            console.log('save');
        }
    });

    res.redirect('/');
});

router.get('/user/read', (req, res) => {
    console.log('this is /user/read');
    async function readAll(){
        var value = await User.find({});
        console.log(value);
    }

    readAll();

    res.redirect('/');
});
router.delete('/user/delete', (req, res) => {

});

module.exports = router;
