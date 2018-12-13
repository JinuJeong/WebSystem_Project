const express = require('express')
const bodyParser = require('body-parser')

require('./db/mongo') //connect db
const circle = require('./routes/circle')
const user = require('./routes/user')
const board = require('./routes/board')
const recovery = require('./routes/recovery')

const app = express()
app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    next()
})

//app.use(bodyParser.urlencoded({extended: true}))
//app.use(bodyParser.json())
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use('/circle', circle)
app.use('/user', user)
app.use('/boards', board)
app.use('/recovery',recovery)

module.exports = app