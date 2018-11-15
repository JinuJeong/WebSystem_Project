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

router.get('/', (req, res) => {
    res.render('main');
});

router.get('/send', (req, res) => {
    var ary = new Array();
    const hi = async () => {
        ary = await Circle.sendAll();
        await res.send(ary)
    }
    
    hi();
})

router.post('/create', (req, res) => {
    Circle.create(req.body)
    .then(mongoose.disconnect())
    .then(res.redirect('/'))
    .catch(err => res.send(err));
});

router.get('/:name', (req, res) => {
    console.log('this is /circle/:name');
    console.log('name is ' + req.params.name);
    Circle.findOneByName(req.params.name)
        .then((circle) => { //무조건 user를 input으로 받아야 한다.
            mongoose.disconnect()
            .then(res.render('onecircle', {title: circle})); // ejs에서 사용될 object 전달
        });
});

router.use('/', (req, res, next) => {
          next();
          });

router.get('/', (req, res, next) => {
            res.send('In this page, Circle List show');
          });

router.get('/register', (req, res) => {
    res.render('register', {
        title : 'REGISTER'
              });
          });

module.exports = router;