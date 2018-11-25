<template>
    <div class="signup">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <!--바탕이 되는 container-->
        <div class="centered-container">
            <!--그 위에 올려지는 Login form box (elevation : 10)-->

            <md-content class="md-elevation-10">
                <!--Title 이미지 + 설명 -->
                <div class="title">
                    <img src="https://vuematerial.io/assets/logo-color.png">
                    <div class="md-title">A-Dong</div>
                    <h2>Login</h2>
                </div>

                <div class="form">
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
                    <a href="/">아이디 찾기</a>
                    <a href="/">비밀번호 찾기</a>
                </div>

                <div class="actions md-layout md-alignment-center-space-around">
                    <md-button class="md-raised md-primary" v-on:click="auth">로그인</md-button>
                </div>

                <div class="actions md-layout md-alignment-center-space-around">
                    <md-button class="md-raised md-primary" href="/signup">계정 생성</md-button>
                </div>
            </md-content>
            
        </div>
        <!--alert operation -->
        <md-dialog-alert
            :md-active.sync="active"
            md-content="Login Failed"
            md-confirm-text="DONE" />

        <md-divider></md-divider>
    </div>
</template>

<script>
    import headerBar from './header.vue'

    export default {
        name: "login",
        data() {
            return {
                loading: false,
                login: {
                    ID: "",
                    password: ""
                },
                active: false

            };
        },
        components: {
            headerBar
        },
        methods: {
            auth() {
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
                    this.$session.set('username', res.data.name)
                    console.log(this.$session.getAll());
                    this.$router.push('/')
                })
            }
        }
    };
</script>

<style lang="scss">
    .centered-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 100vh;

        .title { // A-Dong + img
            text-align: center;
            margin-bottom: 30px;
            img {
                margin-bottom: 16px;
                max-width: 80px;
            }
            .md-title{ // A-Dong
                font-size : 50px;
            }
        }

        .actions {
            margin-bottom : 10px;

            .md-button {
                margin-bottom : 10px;
                width : 500px;
            }
        }
        .form {
            margin-bottom: 60px;
        }

        .md-content {
            z-index: 0;
            padding: 40px;
            width: 100%;
            height : 200%;
            max-width: 400px;
            max-height : 550px;
            position: relative;
        }
    }
</style>
