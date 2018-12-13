<template>
    <div class="mypage">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <div id='all_notice'> </div>
        <!--바탕이 되는 container-->
        <div class="centered-container">
            <h1 class="hn ajou_title"> MY PAGE </h1><br/>
            <!--그 위에 올려지는 Login form box (elevation : 10)-->
            <md-content class="md-elevation-15">
            <form class="vue-form" @submit.prevent="submit">
                <v-layout row wrap>
                <md-card>
                    <md-card-header>
                        <div class="md-title">A-DONG 프로필</div>
                    </md-card-header>

                    <md-card-content>
                        <p>사용자 이름 : {{user.name}}</p>
                        <p>별명 : {{user.nickname}}</p>
                        <p>소속 : {{user.department}}</p>


                    <div id="c1" v-if="change1==true">
                    <md-field>
                        <label>Name</label>
                        <md-input v-model="name" placeholder="변경할 이름"></md-input>
                    </md-field>
                    <md-field>
                        <label>Nickname</label>
                        <md-input v-model="nickname" placeholder="변경할 별명"></md-input>
                    </md-field>
                    <md-field>
                        <label>변경할 학과</label>
                        <md-select v-model="department" name="department" id="department">
                            <md-optgroup label="정보통신대학">
                                <md-option value="소프트웨어학과">소프트웨어학과</md-option>
                                <md-option value="security">사이버보안학과</md-option>
                                <md-option value="electric">전자공학과</md-option>
                                <md-option value="media">미디어학과</md-option>
                                <md-option value="Defense_digital">국방디지털융합학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="공과대학">
                                <md-option value="mechanical">기계공학과</md-option>
                                <md-option value="Chemical">화학공학과</md-option>
                                <md-option value="environmental">환경공학과</md-option>
                                <md-option value="Advanced_Materials">신소재공학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="자연과학대학">
                                <md-option value="mathematical">수학과</md-option>
                                <md-option value="Physics">물리학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="경영대학">
                                <md-option value="business">경영학과</md-option>
                                <md-option value="e-business">e-business 학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="인문대학">
                                <md-option value="korean">국어국문학과</md-option>
                                <md-option value="english">영어영문학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="사회과학대학">
                                <md-option value="Psychology">심리학과</md-option>
                                <md-option value="Economics">경제학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="의과대학">
                                <md-option value="medicine">의예과</md-option>
                            </md-optgroup>
                            <md-optgroup label="간호대학">
                                <md-option value="nursing">간호학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="약학대학">
                                <md-option value="Pharmacy">약학과</md-option>
                            </md-optgroup>
                        </md-select>
                    </md-field>
                    </div>
                    </md-card-content>
                    <v-card-actions class="btn">
                        <v-btn round color="blue" large v-on:click="change1=true" v-if="change1==false">
                            <p class="circle_button">프로필 수정</p>
                        </v-btn>                               
                    </v-card-actions>             
                    <v-card-actions class="c1">
                        <v-btn round color="blue" large v-on:click="change1=false" v-if="change1==true">
                            <p class="circle_button">수정 취소</p>
                        </v-btn>                               
                        <v-btn round color="blue" large v-on:click="changeProfile()" v-if="change1==true">
                            <p class="circle_button">수정 완료</p>
                        </v-btn>                  
                    </v-card-actions>
                </md-card>

                <md-card>
                    <md-card-header>
                        <div class="md-title">연락처</div>
                    </md-card-header>

                    <md-card-content>
                        <p>Email : {{user.ID}}</p>
                        <p>휴대전화 : {{user.call}}</p>
                    </md-card-content>
                    <div v-if="change2==true">
                    <md-field>
                        <label>Email</label>
                        <md-input v-model="id" placeholder="변경할 Email"></md-input>
                    </md-field>                    
                    <md-field>
                        <label>Call</label>
                        <md-input v-model="call" placeholder="변경할 휴대전화"></md-input>
                    </md-field>
                    </div>
                    <v-card-actions class="btn">
                        <v-btn round color="blue" large v-on:click="change2=true" v-if="change2==false">
                            <p class="circle_button">연락처 수정</p>
                        </v-btn>                               
                    </v-card-actions>             
                    <v-card-actions class="c1">
                        <v-btn round color="blue" large v-on:click="change2=false" v-if="change2==true">
                            <p class="circle_button">수정 취소</p>
                        </v-btn>                               
                        <v-btn round color="blue" large v-on:click="changeCall()" v-if="change2==true">
                            <p class="circle_button">수정 완료</p>
                        </v-btn>                  
                    </v-card-actions>
                </md-card>
                </v-layout>


                <v-layout row wrap>                    
                <md-card>
                    <md-card-header>
                        <div class="md-title">가입 동아리</div>
                    </md-card-header>

                    <md-card-content>
                        <div v-for="circle in user.circles" :key="circle.id" >
                        <p>
                            동아리 이름 : {{circle.name}}
                            <v-btn round color="blue" large v-on:click="change3=false;circleout=circle;giveupCircle()" v-if="change3==true">
                                <p class="circle_button">탈퇴</p>
                            </v-btn>                            
                        </p>
                        </div>                     
                    </md-card-content>
                    <v-card-actions class="btn">
                        <v-btn round color="blue" large v-on:click="change3=true" v-if="change3==false">
                            <p class="circle_button">동아리 수정</p>
                        </v-btn>                               
                    </v-card-actions>             
                    <v-card-actions class="c1">
                        <v-btn round color="blue" large v-on:click="change3=false" v-if="change3==true">
                            <p class="circle_button">수정 취소</p>
                        </v-btn>                               
                        <v-btn round color="blue" large v-on:click="change3=false" v-if="change3==true">
                            <p class="circle_button">수정 완료</p>
                        </v-btn>                  
                    </v-card-actions>
                </md-card>
                <md-card>
                    <md-card-header>
                        <div class="md-title">회원 관리</div>
                    </md-card-header>
                    <md-field v-if="change4==true">
                        <label>Password </label>
                        <md-input v-model="password" type="password" placeholder="현재 비밀번호"></md-input>
                        <v-btn round color="blue" large v-on:click="passwordCheck()" v-if="change4==true">
                            <p class="circle_button">비밀번호 체크</p>
                        </v-btn>
                    </md-field>
                    <md-field v-if="change4==true">
                        <label>Change Password </label>
                        <md-input v-model="passwordin" type="password" placeholder="변경할 비밀번호"></md-input>
                    </md-field>

                    <md-field v-if="change5==true">
                        <label>Password </label>
                        <md-input v-model="password" type="password" placeholder="비밀번호를 입력해주세요."></md-input>
                        <v-btn round color="blue" large v-on:click="passwordCheck()" v-if="change5==true">
                            <p class="circle_button">비밀번호 체크</p>
                        </v-btn>
                    </md-field>
                    <p v-if="change4==true || change5 == true">{{passwordValue}}</p>

                    <v-card-actions class="btn">
                        <v-btn round color="blue" large v-on:click="change4=true" v-if="change4==false && change5==false">
                            <p class="circle_button">비밀번호 수정</p>
                        </v-btn>
                        <v-btn round color="blue" large v-on:click="change4=false" v-if="change4==true">
                            <p class="circle_button">수정 취소</p>
                        </v-btn>                               
                        <v-btn round color="blue" large v-on:click="changePassword()" v-if="change4==true">
                            <p class="circle_button">수정 완료</p>
                        </v-btn> 
                        <v-btn round color="blue" large v-on:click="change5=false" v-if="change5==true">
                            <p class="circle_button">탈퇴 취소</p>
                        </v-btn>                                         
                        <v-btn round color="red" large v-on:click="change5=true" v-if="change4==false&&change5==false">
                            <p class="circle_button">회원 탈퇴</p>
                        </v-btn>
                        <v-btn round color="red" large v-on:click="deleteUser()" v-if="change5==true">
                            <p class="circle_button">회원 탈퇴</p>
                        </v-btn>
                    </v-card-actions>
                </md-card>
                </v-layout>
            </form>
            </md-content>
        </div>
    </div>
</template>

<script>
import headerBar from '../../components/header.vue'

export default {
    data () {
        return {
            user: {},
            page : 1,
            userName: "",
            change1: false,
            change2: false,
            change3: false,
            change4: false,
            change5: false,
            id          : null,
            password    : null,
            birth       : null,
            name        : null,
            textarea    : null,
            department  : null,
            selectedInterest : [],
            call        : null,
            nickname    : null,
            birth       : null,
            passwordValue: null,
            passwordCorrect: false,
            passwordin: null,
            circleout: {},             
        }
    },
    created () {//혹시 안 되면 서버 껐다 켜봐라
        this.userName = this.$session.getAll().username
        this.$http.get('http://localhost:8000/user/find/' + this.userName).then((res) => {
            this.user = res.data
        })
    },
    name: 'mypage',
    components: {
        headerBar
    },
    methods:{
        passwordCheck: function(){
            this.passwordCorrect = false
            if(this.password == this.user.password){
                this.passwordValue = "비밀번호가 맞았습니다."
                this.passwordCorrect=true
            }
            else
                this.passwordValue = "올바른 비밀번호를 입력해주세요."

        },
        changeProfile: function() {
            this.$http.post('http://localhost:8000/user/' + this.user.name + '/update/profile',
            {"name":this.name, "nickname":this.nickname, "department":this.department})
            .then((res) => {
                this.change1 = false
                this.$session.start()
                this.$session.set('username', res.data.name)
                this.$session.set('userDepartment', res.data.department)
                this.user = res.data
                this.$router.go(0)     
            })
        },
        changeCall: function() {
            this.$http.post('http://localhost:8000/user/' + this.user.name + '/update/call',
            {"call":this.call, "ID":this.id})
            .then((res) => {
                this.change2 = false
                this.$session.start()
                this.$session.set('username', res.data.name)
                this.$session.set('userDepartment', res.data.department)
                this.user = res.data
                this.$router.go(0)     
            })            
        },
        changePassword: function() {
            if(this.passwordCorrect==true){
                this.$http.post('http://localhost:8000/user/' + this.user.name + '/update/password',
                {"password":this.passwordin})
                .then((res) => {
                    this.change4 = false
                    this.$session.start()
                    this.$session.set('username', res.data.name)
                    this.$session.set('userDepartment', res.data.department)
                    this.user = res.data
                    this.$router.go(0)     
                })
            }
        },
        deleteUser: function() {
            if(this.passwordCorrect==true){
                this.$http.delete('http://localhost:8000/user/' + this.user.name + '/delete')
                .then((res) => {
                    this.$session.destroy();
                    this.$router.push('/');
                    window.location.reload();                    
                })
            }
        },
        giveupCircle: function(){
            this.$http.post('http://localhost:8000/circle/'+this.circleout.name+'/reject', this.user).then(() => {
                this.$http.post('http://localhost:8000/user/'+this.user.name+'/reject', this.circleout)
            }).then(() => {
                this.$router.go(0)
            })
        }    
    }
}
</script>

<style lang="scss" scoped>

    .centered-container {
        display: flex;
        align-items: center;
        flex-direction : column;
        justify-content: center;
        position: relative;
        height: 125vh;
        .md-card {
            width : 600px;
            height : 500px;
            margin-left : 50px;
            margin-bottom: 50px;
            vertical-align: top;

            .md-button{
                margin-bottom : 10px;
                width : 500px;
            }
        }

        .md-content {
            padding: 40px;
            width: 100%;
            height : 200%;
            max-width: 1700px;
            max-height : 1200px;
            position: relative;
            display : flex;
            justify-content : center;
            flex-wrap: wrap;
        }
    }

    .circle_button{
        color : white;
        margin-top : 10px;
    }

    .ajou_title{
        margin-bottom : 30px;
        font-size : 40px;
    }

    #first_row {
        color : red;
    }

    #all_notice {
        margin-bottom : 100px;

    }
    .md-title {
        text-align: center;
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 30px;
    }
    .md-card-content {
        font-size: 20px;
    }
    .btn{
        position: absolute;
        bottom: 0%;
        
        width: 25%;
    }
    .c1{
        position: absolute;
        bottom: 0%;
    }
</style>