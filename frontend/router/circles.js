const express = require('express');
const router = express.Router();
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(express.static('public'));

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