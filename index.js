const express = require('express');
const app = express();
const router_login = require('./router/login');

app.set('views',__dirname +"/views");
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);

app.use('/login',router_login);
	 
	 
app.listen(8000,()=>{
		  console.log("server start on port 8000")
		  });


