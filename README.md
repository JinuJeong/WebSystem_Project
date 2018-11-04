# **A-Dong 아주대학교 동아리 관리 웹시스템**
<br>

### TEST
<pre><code>npm test</code></pre>

### Mongoose Connect

#### 1. Set
<pre><code>
const mongoose = require('mongoose');
const config = require('./module/config');

//Set User Schema
const UserSchema = mongoose.Schema({
                ID : {type: String, unique: true},
                password : String,
            });

//Set User Colletion
const User = mongoose.model("User",UserSchema);
</code></pre>

#### 2. config.js
<pre><code>
exports.dbUrl = ()=>{
    return "mongodb://localhost:27017/user";
};
</code></pre>

#### 3. Save
<pre><code>
router.post('/signup/create',(req,res)=>{
            //requset user info
            const info = {"ID":req.body.ID,"password":req.body.PW};
            console.log(info);
            mongoose.connect(config.dbUrl());
            const db =mongoose.connection;
            db.on('error',console.error.bind(console,'connection error:'));
            db.once('open',()=>{
                    console.log("connect success!!");
                    });

            //creat student Object
            const student = new User(info);

            student.save((err)=>{
                    if(err) console.log(err);
                    mongoose.disconnect();
                    res.redirect('/');
            })

});
</code></pre>

#### 4. Find
<pre><code>
//request login
router.post('/signin',(req,res)=>{
        mongoose.connect(config.dbUrl());
        const db = mongoose.connection;
        db.on('error',console.error.bind(console,'connection error:'));
        db.once('open',()=>{
                console.log("connect success!!");
                });

        User.find({"ID":req.body.ID,"password":req.body.PW},(err,doc)=>{
                console.log(doc);
                if(doc.length==0) res.redirect('/login');
                else res.redirect('/');
        });

});
</code></pre>

### Developers
* 안우일 - 201420907
* 황범철 - 201420870
* 정진우 - 201620913
* 소현섭 - 201720762
<hr/>

#### 2018.11.03
* 로그인과 회원가입을 위한 view engine(login.js & signup.js) 및 Router 생성

#### 2018.11.04
* 동아리 등록을 위한 view engine(register.ejs) 및 Router 생성
