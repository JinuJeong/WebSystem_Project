// mongo module test

const express = require('express');
const mongo = require('./mongo');
const app = express();

app.get('/',(req,res)=>{
		  var info = {"ID": "1234", "password" : "1111"}
		  var data=mongo.std_save(info);
		  //mongo.std_delete(info);
		  console.log(data);
		  res.send(data);
		  });


app.listen(8000,(err)=>{
	 console.log("start");
	 });

