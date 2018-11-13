const express = require('express')
const app = express()
const router_login = require('./router/login')
const router_home = require('./router/home')
const router_circle = require('./router/circles');

app.set('views', __dirname + '/views');
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

app.use('/login',router_login);

app.use('/',router_home);

app.use('/circle', router_circle);
app.use('/circle/create', router_circle);
app.use('/circle/findOne', router_circle);
app.listen(8000,()=>{
		  console.log('server start on port 8000')
});
