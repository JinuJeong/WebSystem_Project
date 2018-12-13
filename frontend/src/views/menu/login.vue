<template>
    <div class="signup">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <!--바탕이 되는 container-->
        <div class="centered-container">
            <!--그 위에 올려지는 Login form box (elevation : 10)-->

            <md-content class="md-elevation-10" >
                <!--Title 이미지 + 설명 -->
                <div class="title">
                    <router-link to="/">
                    <img src="../../assets/A-dong.png">
                    </router-link>
                </div>

                <div class="login-form">
                    <!--ID 입력-->
                    <md-field>
                        <label>ID</label>
                        <md-input v-model="login.ID" autofocus></md-input>
                    </md-field>
                    <!--password 입력-->
                    <md-field md-has-password>
                        <label>Password</label>
                        <md-input v-model="login.password" type="password" ></md-input>
                    </md-field>
                </div>

                <div class="actions md-layout md-alignment-center-space-around">
                    <a to="/">아이디 찾기</a>
                    <a to="/">비밀번호 찾기</a>
                </div>

                <div class="form-actions md-layout md-alignment-center-space-around">
                    <v-btn class="md-raised md-primary jg" color="blue-grey lighten-1" v-on:click="auth">로그인</v-btn>
                </div>

                <div class="form-actions md-layout md-alignment-center-space-around">
                    <v-btn class="md-raised md-primary jg" color="blue-grey lighten-1" to="/signup">계정 생성</v-btn>

                </div>
            </md-content>
            
        </div>
        <!--alert operation -->
        <md-dialog-alert
            :md-active.sync="active"
            md-content="아이디나 비밀번호가 맞지 않습니다."
            md-confirm-text="확인" />

        <md-divider></md-divider>
    </div>
</template>

<script>
    import headerBar from '../../components/header'

    export default {
        name: 'login',
        data: function(){
            return {
                loading : false,
                login: {
                    ID: '',
                    password: ''
                },
                active  : false
            };
        },
        components: {
            headerBar
        },
        methods: {
            auth: function() {
                this.$http.post("http://localhost:8000/user/signin",{"ID":this.login.ID,"password":this.login.password}).then((res)=>{
                    if(res.data.ID==null){
                        this.active=true
                        return;
                    }
                    else if(res.data.auth===false){
                        this.active=true
                        return;
                    }
                    this.$session.start()
                    if (res.data.admin==true)
                        this.$session.set('admin',true)
                    else 
                        this.$session.set('admin',false)
                    this.$session.set('username', res.data.name)
                    this.$session.set('userDepartment', res.data.department)
                    let circles=new Array();
                    this.$http.get("http://localhost:8000/user/find/user/"+this.login.ID).then((data)=>{
                        let user = data.data
                        console.log(user)
                        for(let i =0; i<user.circles.length;i++){
                            if(user.circles[i].president.ID==this.login.ID) this.$session.set('president',user.circles[i].name);
                            circles.push(user.circles[i].name)
                        }
                        this.$session.set('circles',circles);
                        this.$router.push('/');
                    })
                    
                })
                
            }
        }
    };
</script>

<style lang="scss">
    .centered-container { // 밑바탕 Container
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 100vh;


        .md-content { //하얀 Box
            z-index: 1;
            padding: 40px;
            width: 100%;
            height : 200%;
            max-width: 500px;
            max-height : 600px;
            position: relative;

            .title { // A-Dong + img
                text-align: center;
                margin-bottom: 30px;
                img {
                    resize: both;
                    max-width :300px;
                    height : 150px;
                    margin-left : 10%
                }
                .md-title{ // A-Dong
                    font-size : 50px;
                }
            }

            .login-form { // id와 비밀번호 입력칸
                margin-bottom: 15%;
            }

            .form-actions { // 아이디/비밀번호 찾기
                margin-bottom : 3%;

                .md-button { // 로그인 , 계정생성
                    width : 500px;
                }
                .v-btn { // 로그인 , 계정생성
                    width : 400px;
                    color : white;
                }
            }
        }

    }
</style>
