const express = require('express');
const app = express();
const applyRouter = require('./routers/apply');
const mongoose = require('mongoose');

//app.set('views', __dirname + '/views'); 알아서 view 폴더로 간다.
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//CONNECT TO MONGODB SERVER
mongoose.connect('mongodb://localhost:27017/mongooseTest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("mongoose is connected successfully");
});

app.use('/', applyRouter);
app.use('/user/create', applyRouter);
app.use('/user/read', applyRouter);
app.use('/user/delete', applyRouter);

app.listen(8000, (err) => {
    console.log("Sever is on 8000 port.");
})