# **A-Dong 아주대학교 동아리 관리 웹시스템**

> Front-end 브랜치 입니다.

## Test 방법
``` bash
# 최초 한번만 실행! (install dependencies)
npm install
```

> Test 방법은 두 가지가 있습니다. (둘 중 하나 선택)
``` bash
# 로컬 서버로 페이지 실행 (코드 수정 시 변경된 부분만 hot-reload)
npm run dev

# 코드 번들링 & 축소화 (아래 코드 실행 완료 후 웹에서 index.html 실행)
npm run build
```

## Git 사용법
``` bash
# github에서 front-end 브랜치 clone 받는 방법
git clone -b front-end https://github.com/jjw8967/WebSystem_Project.git

# 내 local의 front-end 브랜치에서 remote(Github)의 front-end 브랜치에 push 하는 방법
git push origin front-end:front-end
```
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

### File Information

* __router/module/mongo.js__ : mongodb operation을 간편하게 사용할 수 있도록 모듈화한 File

### Reference

* __mongoose__ : http://html5around.com/wordpress/tutorials/node-js%EC%97%90%EC%84%9C-mongodb%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0mongoose/

* __compass__ : https://www.mongodb.com/download-center/compass

* __express & vue__ : https://pjunhyuk.github.io/blog/2018/05/07/vue-js-express-%EB%A1%9C-login-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EA%B8%B0/

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

## 추가 자료
> Webpack에 대한 동작 방식이 궁금하면 참고하세요. [docs for vue-loader](https://vue-loader-v14.vuejs.org/kr/).

> Vue Material 홈페이지 [docs for vue-material](https://vuematerial.io/).
