const express = require('express')
const app = express()
const router_user = require('./routers/user')
const router_circle = require('./routers/circle')

app.use('/user',router_user);
app.use('/circle', router_circle);

app.listen(8000,()=>{
		  console.log('server start on port 8000')
});
