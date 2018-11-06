const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('../models/user'); //상대경로..  ㅅㅂ

router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json());

router.get('/', (req, res) => {
    console.log('it is /');
    res.render('apply', {name : name});
});

router.post('/user/create', (req, res) => {
    console.log('it is /user/create');
    User.create(req.body)
        .then(res.redirect('/'))
        .catch(err => res.send(err));
    //.then(user => res.send(user)); schema 함수에서 만든 document가 then handler로!
      
    /* User model을 통해 document를 생성할 필요가 없다!
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
    
    res.redirect('/');.*/
});

router.get('/user/read/:name', (req, res) => {
    console.log('this is /user/read/:name');
    User.findOneByName(req.params.name)
        .then((user) => { //무조건 user를 input으로 받아야 한다.
            res.render('oneuser', {title: user}); // ejs에서 사용될 object 전달
        });
});

router.get('/user/readall', (req, res) => {
    /*
    async function readAll(){
        var value = await User.find({});
        console.log(value);
    }
    readAll();
    */
})

router.delete('/user/delete', (req, res) => {

});

module.exports = router;
